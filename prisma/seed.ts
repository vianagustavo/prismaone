import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { Enrollment, PrismaClient } from "../node_modules/.prisma/client/index";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      login: process.env.ADMIN_LOGIN as string,
      name: "MASTER",
      password: await hash(process.env.ADMIN_PASSWORD as string, 8),
    },
  });
  await prisma.enrollment.createMany({
    data: generateEnrollmentList(),
  });
}

function generateEnrollmentList() {
  const enrollmentQuantity = 10;
  const enrollmentList: Enrollment[] = [];
  for (let index = 0; index < enrollmentQuantity; index++) {
    const enrollment = (
      Math.floor(Math.random() * (9999999999999 - 1000000000000 + 1)) +
      1000000000000
    ).toString();
    const enrollmentEntity: Enrollment = {
      enrollment,
      status: Math.random() < 0.5,
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    enrollmentList.push(enrollmentEntity);
  }
  return enrollmentList;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
