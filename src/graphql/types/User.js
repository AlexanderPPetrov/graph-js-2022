export default `

    type User {
        _id: String!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type Query {
        user(_id: String!): User
        users: [User]
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): User
        deleteUser(_id: String!): User
        editUser(_id: String!, firstName: String!, lastName: String!, email: String!, password: String!): User
    }

`
