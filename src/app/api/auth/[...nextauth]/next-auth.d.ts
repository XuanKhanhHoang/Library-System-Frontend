import { userGeneral } from "@/dtos/user";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user?: {
      access_token: {
        token: string;
        iat: string;
        exp: string;
      };
      user_info: userGeneral;
      role: string;
    };
  }
  interface User {
    access_token: string;
    user_info: userGeneral;
    role: string;
  }
}
