import { mergeResolvers } from "@graphql-tools/merge";
import User from "./resolvers/User";
import Game from "./resolvers/Game";

export default mergeResolvers([
    User,
    Game,
])