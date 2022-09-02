import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const eventData = Array.from({ length: 15 }).map(() => ({
    title: faker.hacker.phrase(),
    content: faker.lorem.paragraph(),
    published: faker.datatype.boolean(),
    coverPicture: faker.image.imageUrl(),
    startTime:
        String(faker.date.future().getUTCHours()).padStart(2, '0') +
        ':' +
        String(faker.date.future().getUTCMinutes()).padStart(2, '0'),
    endTime:
        String(faker.date.future().getUTCHours()).padStart(2, '0') +
        ':' +
        String(faker.date.future().getUTCMinutes()).padStart(2, '0'),
    startDate: faker.date.future(),
    endDate: faker.date.future(),
    location: faker.address.city(),
    position: {
        lat: faker.address.latitude(),
        long: faker.address.longitude(),
    },
    isInPerson: faker.datatype.boolean(),
    authorId: '3a8c6a94-380e-4b05-97f4-252377afa6f7',
    isPrivate: faker.datatype.boolean(),
}));

/*const arr = ['ADMIN', 'USER'];
const index = Math.floor(Math.random() * arr.length);
const role = arr[index];*/

const userData = Array.from({ length: 5 }).map(() => ({
    name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
}));

const prisma = new PrismaClient();

async function main() {
    await prisma.event.createMany({
        data: eventData,
    });

    await prisma.user.createMany({
        data: userData,
    });
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
