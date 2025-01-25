import { clapResolver } from "./clap.resolver.js";
import { todoResolver } from "./todo.resolver.js";
import { userResolver } from "./user.resolver.js";

export const resolvers = [userResolver, todoResolver, clapResolver];
