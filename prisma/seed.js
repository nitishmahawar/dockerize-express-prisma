const { faker } = require("@faker-js/faker");
const prisma = require("../src/lib/prisma");

const users = Array.from({ length: 50 }).map((_, i) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password: faker.internet.password(),
    image: faker.image.avatar(),
  };
});

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: users });
  console.log("Database successfully seeded!");
}

main();
