import { Schema } from 'mongoose';

export const MY_MODULE_OPTIONS_TOKEN = 'MY_MODULE_OPTIONS_TOKEN';

export interface MyModuleOptions {
  databaseUrl: string;
  collectionName: string;
  schema: Schema;
}
