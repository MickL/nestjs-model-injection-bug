import { Inject, Injectable } from '@nestjs/common';
import { MY_MODULE_OPTIONS_TOKEN, MyModuleOptions } from './my-library.options';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class MyService<T extends Document> {
  catModel2: Model<T>;

  constructor(
    @Inject(MY_MODULE_OPTIONS_TOKEN) options: MyModuleOptions,
    // @InjectModel('Cat') private catModel1: Model<T>, // This works
    moduleRef: ModuleRef,
  ) {
    // This doesnt work:
    this.catModel2 = moduleRef.get(getModelToken(options.collectionName), {
      strict: false,
    });

    // console.log(this.catModel1);
    console.log(this.catModel2);
  }
}
