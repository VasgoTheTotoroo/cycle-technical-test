import { User } from "models/user.js";

export const checkUserExist = async (userId: number): Promise<void> => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error(`The user with id ${userId} doesn't exist!`);
  }
};
