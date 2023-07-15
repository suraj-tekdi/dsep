import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { requestForwarder } from 'utils/utils';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class UpdateService {
  constructor(private readonly httpService: HttpService) {}
  async handleUpdate(updateDto: UpdateDTO) {
    // TODO: validate request

    const updateResponse = await requestForwarder(
      'PROVIDER_URL',
      updateDto,
      this.httpService,
    );

    // TODO: Add auth headers in the response, check select.service.ts
    // forwarding the response back to BAP /on-update
    return await requestForwarder(
      updateDto.context.bap_uri + '/on_update',
      updateResponse,
      this.httpService,
    );
  }
}
