import { Controller, Get } from '@nestjs/common';
import { join } from 'path';
import { readFile } from 'fs/promises';

@Controller('version')
export class GetVersionController {
  @Get()
  async getVersion() {
    const versionInfoRaw = await readFile(
      join(process.cwd(), 'versionInfo.json'),
      { encoding: 'utf-8' },
    );

    const versionInfo = JSON.parse(versionInfoRaw);

    return versionInfo;
  }
}
