import Game from "../../models/Game"

export default {
    Query: {
        game: async (root, { _id }) => {
            const game = await Game.findById(_id).exec();
            return game;
        },
        games: async () => {
            const games = await Game.find({});
            return games;
        }
    },
    Mutation: {
        createGame: async (root, {name, description, image}) => {
            const newGame = new Game({
                name,
                description,
                image,
            })
            await newGame.save();
            return newGame;
        },
        deleteGame: async(root, {_id}) => {
            const game = Game.findByIdAndRemove(_id);
            return game;
        },
        editGame: async(root, {_id, name, description, image}) => {
            const game = await Game.findOneAndUpdate(_id, {
                name,
                description,
                image, 
            });
            return game;
        },
    }
}

