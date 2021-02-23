import { getSession } from "next-auth/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    try {
      const user = await prisma.images.create({
        data: {
          public_id: JSON.parse(req.body).public_id,
          user_image: JSON.parse(req.body).user_image,
        },
      });

      res.status("201").json({
        status: "created",
      });
    } catch (error) {
      res.status("401").json({
        status: "error",
      });
    }
  } else {
    res.status(401);
  }
  res.end();
};
