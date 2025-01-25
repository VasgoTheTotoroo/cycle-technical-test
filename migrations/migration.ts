import { Clap } from "models/clap.js";
import { Todo } from "models/todo.js";
import { User } from "models/user.js";

await User.sync({ force: true });
await Todo.sync({ force: true });
await Clap.sync({ force: true });
