import { faker } from '@faker-js/faker';
import { PrismaClient, RiskStatus, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

const myEmail = 'kvi@naoma.dk';

async function main() {
  for (let i = 0; i < 3; i++) {
    const company = await prisma.company.create({
      data: {
        email: faker.internet.email(),
        cvr: faker.string.uuid(),
        name: faker.company.name(),
        users: {
          connectOrCreate: {
            where: { email: myEmail },
            create: {
              email: myEmail,
              fullName: 'Jarl Pallesen',
              role: UserRole.OWNER,
              jobDescription: faker.person.jobTitle(),
            },
          },
        },
      },
    });

    for (let j = 0; j < 10; j++) {
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          fullName: faker.person.fullName(),
          role: faker.helpers.arrayElement([
            UserRole.USER,
            UserRole.MANAGER,
            UserRole.OWNER,
          ]),
          jobDescription: faker.person.jobTitle(),
          companyId: company.id,
        },
      });
    }

    for (let k = 0; k < 5; k++) {
      const project = await prisma.project.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          dueDate: faker.date.future(),
          budget: faker.finance.amount(),
          companyId: company.id,
        },
      });

      const users = await prisma.user.findMany({
        where: { companyId: company.id },
      });

      for (const user of users) {
        await prisma.projectUser.create({
          data: {
            userId: user.id,
            projectId: project.id,
          },
        });
      }

      for (let l = 0; l < 10; l++) {
        await prisma.risk.create({
          data: {
            customId: l + 1,
            description: faker.lorem.sentence(),
            probability: faker.helpers.arrayElement([1, 2, 3, 4, 5, undefined]),
            consequence: faker.helpers.arrayElement([1, 2, 3, 4, 5, undefined]),
            status: faker.helpers.arrayElement([
              RiskStatus.OPEN,
              RiskStatus.CLOSED,
            ]),
            projectId: project.id,
            riskOwnerUserId: faker.helpers.arrayElement(users).id,
          },
        });
      }
    }
  }

  console.info('Database seeded successfull! 🎉🎉🎉');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    throw e;
  });
