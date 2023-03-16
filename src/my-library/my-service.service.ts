import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { MY_MODULE_OPTIONS_TOKEN, MyModuleOptions } from './my-library.options';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModuleRef } from '@nestjs/core';

/**
 * Case #1: Using `@Inject()` works
 * Case #2: `ModuleRef.ref()` doesnt work in the constructor
 * Case #3: `ModuleRef.ref()` works in the constructor when having `@Inject()` uncommented (case #1)
 * Case #4: `ModuleRef.ref()` works in the `onModuleInit()` hook
 */
@Injectable()
export class MyService<T extends Document> implements OnModuleInit {
  catModel: Model<T>;

  constructor(
    @Inject(MY_MODULE_OPTIONS_TOKEN) private options: MyModuleOptions,
    // @InjectModel('Cat') private catModel2: Model<T>, // #1 - This works
    private moduleRef: ModuleRef,
  ) {
    // #2 - This doesn't work, returns null
    // #3 - This works when the `@Inject()` (case #1) is uncommented
    this.catModel = this.moduleRef.get(
      getModelToken(this.options.collectionName),
      {
        strict: false,
      },
    );

    console.log(this.catModel);
  }

  onModuleInit() {
    // #4 - This Works
    this.catModel = this.moduleRef.get(
      getModelToken(this.options.collectionName),
      {
        strict: false,
      },
    );

    console.log(this.catModel);
  }
}
