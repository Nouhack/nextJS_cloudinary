import { getSession } from "next-auth/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const images = await prisma.images.findMany();

    res.status("200").json(images);
  } else {
    res.status(401);
  }
  res.end();
};
