import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { status: 'bg service is running' };
  }
}
