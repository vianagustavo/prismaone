import { hash } from "bcryptjs";
import { prismaClient } from "../src/database/prismaClient";

async function main() {
  await prismaClient.user.createMany({
    data: [
      {
        login: process.env.ADMIN_LOGIN as string,
        name: "MASTER",
        password: await hash(process.env.ADMIN_PASSWORD as string, 8)
      }
    ],
    skipDuplicates: true
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
