import {mergeTypeDefs} from "@graphql-tools/merge"
import User from "./types/User"
import Game from "./types/Game"

export default mergeTypeDefs([
    User,
    Game,
])