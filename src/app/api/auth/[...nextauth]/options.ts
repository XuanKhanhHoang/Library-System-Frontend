import { userGeneral } from "@/dtos/user";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { NextAuthOptions, Session, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { librarianRole, userRole } from "./roles.enum";

export const options: NextAuthOptions = {
  secret: "kkk",
  providers: [
    CredentialProvider({
      id: "user",
      name: "user",
      type: "credentials",
      credentials: {
        username: {
          label: "UserName",
          type: "text",
          placeholder: "",
        },
        password: {
          label: "Password",
          type: "text",
          placeholder: "",
        },
      },
      async authorize(credentials, req): Promise<any> {
        let res: Response = await fetch(GenerateBackendURL("auth/login"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_name: credentials?.username,
            pass_word: credentials?.password,
          }),
        });
        if (!res.ok) return null;
        let user = (await res.json()) as {
          access_token: {
            token: string;
            iat: string;
            exp: string;
          };
          user_info: userGeneral;
        };
        return {
          ...user,
          role: userRole,
        };
      },
    }),
    CredentialProvider({
      id: "admin",
      name: "admin",
      type: "credentials",
      credentials: {
        username: {
          label: "UserName",
          type: "text",
          placeholder: "",
        },
        password: {
          label: "Password",
          type: "text",
          placeholder: "",
        },
      },
      async authorize(credentials, req): Promise<any> {
        let res: Response = await fetch(
          GenerateBackendURL("auth/manager_login"),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_name: credentials?.username,
              pass_word: credentials?.password,
            }),
          }
        );
        if (!res.ok) return null;
        let user = await res.json();
        return {
          ...user,
          role: librarianRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...user, ...token };
    },
    session: async ({ session, token, user }) => {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
