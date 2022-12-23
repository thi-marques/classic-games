import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/modules/app.module'
import { PrismaService } from 'src/services/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
}

bootstrap()
