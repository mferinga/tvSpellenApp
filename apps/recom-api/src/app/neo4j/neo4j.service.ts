import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import neo4j, { Driver, Session, QueryResult } from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  private driver!: Driver;
  private database!: string;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const uri = this.configService.get<string>('NEO4J_URI');
    const username = this.configService.get<string>('NEO4J_USERNAME');
    const password = this.configService.get<string>('NEO4J_PASSWORD');
    const database =
      this.configService.get<string>('NEO4J_DATABASE') || 'neo4j';

    if (!uri || !username || !password) {
      throw new Error('Missing Neo4j environment variables');
    }

    this.database = database;
    this.driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
  }

  async onModuleDestroy() {
    if (this.driver) {
      await this.driver.close();
    }
  }

  getSession(): Session {
    return this.driver.session({
      database: this.database,
      defaultAccessMode: neo4j.session.WRITE,
    });
  }

  async run(query: string, params: Record<string, unknown> = {}): Promise<QueryResult> {
    const session = this.getSession();
    try {
      return await session.run(query, params);
    } finally {
      await session.close();
    }
  }
}