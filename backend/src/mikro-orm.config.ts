import { defineConfig } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export default defineConfig({
  driver: require('@mikro-orm/mysql').MySqlDriver,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || 'LMS',
  debug: process.env.DB_DEBUG === 'true',
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  entities: ['dist/**/*.entity.js'],  // For production
  entitiesTs: ['src/**/*.entity.ts'], // For development
  migrations: {
    path: 'migrations', // Path to migration files
    pathTs: 'migrations', // Path for TS migration files
  },
  // flushMode: "commit",
  extensions: [Migrator, EntityGenerator, SeedManager],
});