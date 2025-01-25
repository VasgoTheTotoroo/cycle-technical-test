import { Todo } from "models/todo.js";

export const getTodo = async (todoId: number, option = {}): Promise<Todo> => {
  const todo = await Todo.findByPk(todoId, option);
  if (!todo) {
    throw new Error(`The user with id ${todoId} doesn't exist!`);
  }
  return todo;
};
