import { Injectable } from '@nestjs/common';
import neo4j from 'neo4j-driver';
import { Neo4jService } from '../neo4j/neo4j.service';

@Injectable()
export class RecommendationService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async recommendForSpellijst(spellijstId: string, limit = 6) {
    const safeLimit = Math.max(0, Math.floor(limit));

    const result = await this.neo4jService.run(
      `
      MATCH (target:Spellijst {mongoId: $spellijstId})-[:CONTAINS]->(owned:Spel)
      MATCH (owned)<-[:CONTAINS]-(other:Spellijst)-[:CONTAINS]->(rec:Spel)
      WHERE other.mongoId <> target.mongoId
        AND NOT (target)-[:CONTAINS]->(rec)
      WITH rec, count(DISTINCT owned) AS overlapCount, count(DISTINCT other) AS supportCount
      RETURN
        rec.mongoId AS mongoId,
        rec.naam AS naam,
        rec.teams AS teams,
        rec.teamgrootte AS teamgrootte,
        overlapCount,
        supportCount,
        (overlapCount * 2 + supportCount) AS score
      ORDER BY score DESC, overlapCount DESC, supportCount DESC, rec.naam ASC
      LIMIT $limit
      `,
      {
        spellijstId,
        limit: neo4j.int(safeLimit),
      }
    );

    return result.records.map((record) => ({
      mongoId: record.get('mongoId'),
      naam: record.get('naam'),
      teams: record.get('teams'),
      teamgrootte: record.get('teamgrootte'),
      overlapCount: this.toNumber(record.get('overlapCount')),
      supportCount: this.toNumber(record.get('supportCount')),
      score: this.toNumber(record.get('score')),
    }));
  }

  async similarToSpel(spelId: string, limit = 6) {
    const safeLimit = Math.max(0, Math.floor(limit));

    const result = await this.neo4jService.run(
      `
      MATCH (source:Spel {mongoId: $spelId})<-[:CONTAINS]-(l:Spellijst)-[:CONTAINS]->(rec:Spel)
      WHERE rec.mongoId <> source.mongoId
      WITH rec, count(DISTINCT l) AS supportCount
      RETURN
        rec.mongoId AS mongoId,
        rec.naam AS naam,
        rec.teams AS teams,
        rec.teamgrootte AS teamgrootte,
        supportCount
      ORDER BY supportCount DESC, rec.naam ASC
      LIMIT $limit
      `,
      {
        spelId,
        limit: neo4j.int(safeLimit),
      }
    );

    return result.records.map((record) => ({
      mongoId: record.get('mongoId'),
      naam: record.get('naam'),
      teams: record.get('teams'),
      teamgrootte: record.get('teamgrootte'),
      supportCount: this.toNumber(record.get('supportCount')),
    }));
  }

  private toNumber(value: unknown): number {
    if (
      value &&
      typeof value === 'object' &&
      'toNumber' in value &&
      typeof (value as { toNumber: () => number }).toNumber === 'function'
    ) {
      return (value as { toNumber: () => number }).toNumber();
    }

    return Number(value ?? 0);
  }
}