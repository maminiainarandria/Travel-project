import { env } from './config/env.js';
import { app } from './app.js';
import { prisma } from './lib/prisma.js';

const server = app.listen(env.PORT, () => {
  console.log(`Arotiana API running on http://localhost:${env.PORT}`);
  console.log(`Swagger docs available on http://localhost:${env.PORT}/api/docs`);
});

function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
