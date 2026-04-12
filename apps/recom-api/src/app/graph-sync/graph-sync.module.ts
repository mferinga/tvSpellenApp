import { Module } from '@nestjs/common';
import { GraphSyncController } from './graph-sync.controller';
import { GraphSyncService } from './graph-sync.service';

@Module({
  controllers: [GraphSyncController],
  providers: [GraphSyncService],
})
export class GraphSyncModule {}