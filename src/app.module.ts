import { Module } from '@nestjs/common';
import { MyLibraryModule } from './my-library/my-library.module';
import { Cat, CatSchema } from './entities/cat.schema';

@Module({
  imports: [
    MyLibraryModule.register({
      databaseUrl: 'mongodb://127.0.0.1:54321',
      collectionName: Cat.name,
      schema: CatSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
