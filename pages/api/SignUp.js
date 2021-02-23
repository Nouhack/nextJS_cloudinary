const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async (req, res) => {
  console.log(JSON.parse(req.body).email);

  try {
    const user = await prisma.user.create({
      data: {
        email: JSON.parse(req.body).email,
        username: JSON.parse(req.body).username,
        password: JSON.parse(req.body).password,
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
};
