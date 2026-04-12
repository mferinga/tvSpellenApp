import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { UpsertSpelDto } from './dto/upsert-spel.dto';
import { UpsertSpellijstDto } from './dto/upsert-spellijst.dto';

@Injectable()
export class GraphSyncService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async ensureIndexes() {
    await this.neo4jService.run(`
      CREATE CONSTRAINT spel_mongoId IF NOT EXISTS
      FOR (s:Spel)
      REQUIRE s.mongoId IS UNIQUE
    `);

    await this.neo4jService.run(`
      CREATE CONSTRAINT spellijst_mongoId IF NOT EXISTS
      FOR (l:Spellijst)
      REQUIRE l.mongoId IS UNIQUE
    `);

    return { ok: true };
  }

  async upsertSpel(dto: UpsertSpelDto) {
    await this.neo4jService.run(
      `
      MERGE (s:Spel {mongoId: $mongoId})
      SET
        s.naam = $naam,
        s.teams = $teams,
        s.teamgrootte = $teamgrootte
      RETURN s
      `,
      {
        mongoId: dto.mongoId,
        naam: dto.naam,
        teams: dto.teams ?? false,
        teamgrootte: dto.teamgrootte ?? null,
      }
    );

    return { ok: true, mongoId: dto.mongoId };
  }

  async upsertSpellijst(dto: UpsertSpellijstDto) {
    await this.neo4jService.run(
      `
      MERGE (l:Spellijst {mongoId: $mongoId})
      SET l.naam = $naam
      WITH l
      OPTIONAL MATCH (l)-[r:CONTAINS]->(:Spel)
      DELETE r
      WITH l
      UNWIND $spelIds AS spelId
      MATCH (s:Spel {mongoId: spelId})
      MERGE (l)-[:CONTAINS]->(s)
      RETURN l
      `,
      {
        mongoId: dto.mongoId,
        naam: dto.naam,
        spelIds: dto.spelIds,
      }
    );

    return { ok: true, mongoId: dto.mongoId };
  }
}