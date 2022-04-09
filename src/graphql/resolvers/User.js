import User from "../../models/User"

export default {
    Query: {
        user: async (root, { _id }) => {
            const user = await User.findById(_id).exec();
            return user;
        },
        users: async () => {
            const users = await User.find({});
            return users;
        }
    },
    Mutation: {
        createUser: async (root, {firstName, lastName, email, password}) => {
            const newUser = new User({
                firstName,
                lastName,
                email,
                password,
            })
            await newUser.save();
            return newUser;
        },
        deleteUser: async(root, {_id}) => {
            const user = await User.findByIdAndRemove(_id);
            return user;
        },
        editUser: async(root, {_id, firstName, lastName, email, password}) => {
            const user = await User.findOneAndUpdate(_id, {
                firstName,
                lastName,
                email, 
                password,
            }, {new: true});
            return user;
        },
    }
}

