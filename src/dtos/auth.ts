import { userGeneral } from "./user";

export type loginResponse = {
  access_token: string;
  user_info: userGeneral;
};
