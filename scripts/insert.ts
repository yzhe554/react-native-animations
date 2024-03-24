import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const card = await prisma.card.create({
    data: {
      number: '5320 4243 4342 5435',
      name: 'John Snow',
      type: 'Debit MasterCard Platinum',
      expiry: '12/2030',
      cvc: '123',
    },
  });
  console.log(card);
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
