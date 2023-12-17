import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as dotenv from 'dotenv'; 


@Injectable()
export class AppService {
  private readonly envConfig: Record<string, string>;

  constructor(){
    const envFilePath = '.env';
    const existsPath = fs.existsSync(envFilePath);
    
    if (!existsPath) {
      throw new Error(`File ${envFilePath} not found!`);
    }

    this.envConfig = dotenv.parse(fs.readFileSync(envFilePath));
  }
}
