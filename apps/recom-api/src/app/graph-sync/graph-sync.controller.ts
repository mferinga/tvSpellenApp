import { Body, Controller, Post } from '@nestjs/common';
import { GraphSyncService } from './graph-sync.service';
import { UpsertSpelDto } from './dto/upsert-spel.dto';
import { UpsertSpellijstDto } from './dto/upsert-spellijst.dto';

@Controller('graph')
export class GraphSyncController {
  constructor(private readonly graphSyncService: GraphSyncService) {}

  @Post('setup')
  setup() {
    return this.graphSyncService.ensureIndexes();
  }

  @Post('spellen')
  upsertSpel(@Body() dto: UpsertSpelDto) {
    return this.graphSyncService.upsertSpel(dto);
  }

  @Post('spellijsten')
  upsertSpellijst(@Body() dto: UpsertSpellijstDto) {
    return this.graphSyncService.upsertSpellijst(dto);
  }
}