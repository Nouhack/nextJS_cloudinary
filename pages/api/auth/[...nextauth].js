import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const verify = async (credentials) => {
  console.log(credentials);
  const response = await prisma.user.findMany({
    where: {
      email: {
        equals: credentials.email,
      },
      password: {
        equals: credentials.password,
      },
    },
  });
  console.log("========================");
  console.log("HADI HYA RESPONSE", response);
  return response[0];
};

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      //  credentials: {
      //    username: { label: "Username", type: "text", placeholder: "jsmith" },
      //    password: {  label: "Password", type: "password" }
      //   },
      async authorize(credentials) {
        if (await verify(credentials)) {
          // Any user object returned here will be saved in the JSON Web Token

          const user = {
            name: await (await verify(credentials)).id,
            email: await (await verify(credentials)).email,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
