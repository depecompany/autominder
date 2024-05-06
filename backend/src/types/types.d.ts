import { UserInterface } from "../interfaces/User.inteface";

type completeUserAuth = Omit<UserInterface, "password", "id">;

type SendEmailType = {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html?: string | object;
};

export { completeUserAuth, SendEmailType };
