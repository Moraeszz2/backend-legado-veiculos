import { Body, Controller, Get, Res } from '@nestjs/common';
import { readFile, readFileSync, readdirSync, statSync } from 'fs';
import { DateTime } from 'luxon';
import * as path from 'path';
import { SummaryMessagesSwaggerUtils } from './utils/summaryMessagesSwagguer.utils';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor() {}

  @Get('/')
  @ApiOkResponse({ description: SummaryMessagesSwaggerUtils.apiOkResponse})
  get() {
    const currentDateTime = DateTime.now();
    return "API ok! " + currentDateTime.toFormat("dd/MM/yyyy HH:mm:ss");
  }

}
