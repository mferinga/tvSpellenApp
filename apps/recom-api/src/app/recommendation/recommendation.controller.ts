import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get('spellijsten/:id')
  getForSpellijst(
    @Param('id') id: string,
    @Query('limit') limit?: string
  ) {
    return this.recommendationService.recommendForSpellijst(
      id,
      limit ? Number(limit) : 6
    );
  }

  @Get('spellen/:id/similar')
  getSimilarSpellen(
    @Param('id') id: string,
    @Query('limit') limit?: string
  ) {
    return this.recommendationService.similarToSpel(
      id,
      limit ? Number(limit) : 6
    );
  }
}