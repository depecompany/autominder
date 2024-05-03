import { UserInterface } from "../interfaces/User.inteface";

type completeUserAuth = Omit<UserInterface, "password", "id">;

export { completeUserAuth };
