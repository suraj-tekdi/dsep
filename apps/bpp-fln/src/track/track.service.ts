import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { requestForwarder } from 'utils/utils';
import { TrackDTO } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly httpService: HttpService) {}
  async handleTrack(trackDto: TrackDTO) {
    // TODO: validate request

    const trackResponse = await requestForwarder(
      'PROVIDER_URL',
      trackDto,
      this.httpService,
    );

    // TODO: Add auth headers in the response, check select.service.ts
    // forwarding the response back to BAP /on-track
    return await requestForwarder(
      trackDto.context.bap_uri + '/on_track',
      trackResponse,
      this.httpService,
    );
  }
}
