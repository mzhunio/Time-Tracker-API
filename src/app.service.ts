import { Injectable } from '@nestjs/common';
import { APP_VERSION } from './version';

@Injectable()
export class AppService {
  getHello(): string {
    return `Welcome to Budget API v${APP_VERSION}`;
  }
}
