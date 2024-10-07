import { faker } from '@faker-js/faker';
import { ProjectStatus } from '@models';
import { PrismaClient, RiskStatus, UserRole } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

const myEmail = process.env.SEED_EMAIL;

async function main() {
  if (!myEmail) {
    throw new Error(
      'SEED_EMAIL is not set. ' +
        'Please set the SEED_EMAIL environment variable to your email address in .env',
    );
  }

  function getRandomScore() {
    return faker.helpers.arrayElement([1, 2, 3, 4, 5, undefined]);
  }

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
              fullName: i === 0 ? 'John Doe' : faker.person.fullName(),
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
          status: ProjectStatus.OPEN,
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

      // Create phases for the project
      const numPhases = faker.number.int({ min: 3, max: 6 });
      const startDate = project.startDate ? dayjs(project.startDate) : dayjs();
      const endDate = project.dueDate
        ? dayjs(project.dueDate)
        : startDate.add(1, 'month');
      const phaseDuration = endDate.diff(startDate) / numPhases;

      let currentDate = startDate;

      for (let p = 0; p < numPhases; p++) {
        const phaseStartDate = currentDate.toDate();
        const phaseEndDate = currentDate
          .add(phaseDuration, 'millisecond')
          .toDate();

        await prisma.phase.create({
          data: {
            name: `Phase ${p + 1}`,
            startDate: phaseStartDate,
            endDate: phaseEndDate,
            projectId: project.id,
          },
        });

        currentDate = dayjs(phaseEndDate);
      }

      const phases = await prisma.phase.findMany({
        where: { projectId: project.id },
      });

      for (let l = 0; l < 10; l++) {
        await prisma.risk.create({
          data: {
            projectId: project.id,
            customId: l + 1,
            description: faker.lorem.sentence(),
            status: faker.helpers.arrayElement([
              RiskStatus.OPEN,
              RiskStatus.CLOSED,
            ]),
            activity: faker.lorem.sentence(),
            probability: getRandomScore(),
            consequence: getRandomScore(),
            timeProbability: getRandomScore(),
            timeConsequence: getRandomScore(),
            economicProbability: getRandomScore(),
            economicConsequence: getRandomScore(),
            riskOwnerUserId: faker.helpers.arrayElement(users).id,
            projectPhaseId: faker.helpers.arrayElement(phases).id,
            mitigationPhaseId:
              faker.helpers.arrayElement([...phases, null])?.id ?? null,
          },
        });
      }
    }
  }

  console.info('Database seeded successfully! 🎉🎉🎉');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
