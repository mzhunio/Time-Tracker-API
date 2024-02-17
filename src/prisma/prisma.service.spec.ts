import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    app = module.createNestApplication();
    prismaService = module.get(PrismaService);

    await app.init();
  });

  it('should clean database', async () => {
    await prismaService.sample.create({ data: { name: 'Dummy' } });
    await prismaService.cleanDatabase();
    const dummies = await prismaService.sample.findMany();

    expect(dummies).toEqual([]);
  });

  it('should create dummy', async () => {
    const dummy = await prismaService.sample.create({ data: { name: 'Dummy' } });
    expect(dummy).toEqual({ id: expect.any(Number), name: 'Dummy' });
  });
});
