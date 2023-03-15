import { DynamicModule, Module } from '@nestjs/common';
import { MyService } from './my-service.service';
import { MY_MODULE_OPTIONS_TOKEN, MyModuleOptions } from './my-library.options';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class MyLibraryModule {
  static register(options: MyModuleOptions): DynamicModule {
    return {
      module: MyLibraryModule,
      imports: [
        MongooseModule.forRoot(options.databaseUrl),
        MongooseModule.forFeature([
          {
            name: options.collectionName,
            schema: options.schema,
          },
        ]),
      ],
      providers: [
        MyService,
        {
          provide: MY_MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
      exports: [MyService],
    };
  }
}
