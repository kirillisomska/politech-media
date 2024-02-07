const { hashSync } = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const createUser = async () => {
  const email = "kirillisomska2@gmail.com";
  const password = hashSync("Test1234!", 3);

  const res = await db.user.create({
    data: {
      email,
      password,
    },
  });

  console.log(res);
};

createUser();
