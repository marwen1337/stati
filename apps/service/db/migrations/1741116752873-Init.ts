import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1741116752873 implements MigrationInterface {
  name = 'Init1741116752873'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "agent" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "hashedAccessKey" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`
    )
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "result" ("id" varchar PRIMARY KEY NOT NULL, "status" varchar CHECK( "status" IN ('UP','DOWN') ) NOT NULL, "metrics" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "monitorId" varchar)`
    )
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_14acc619b27daaba4ed65955d0" ON "result" ("createdAt") `
    )
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "monitor" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "intervalSeconds" integer NOT NULL, "type" varchar CHECK( "type" IN ('HTTP','CPU','PING','TCP') ) NOT NULL, "configuration" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "agentId" varchar)`
    )
    await queryRunner.query(`DROP INDEX "IDX_14acc619b27daaba4ed65955d0"`)
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "temporary_result" ("id" varchar PRIMARY KEY NOT NULL, "status" varchar CHECK( "status" IN ('UP','DOWN') ) NOT NULL, "metrics" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "monitorId" varchar, CONSTRAINT "FK_bdff545f19c78d3668b10cd0d35" FOREIGN KEY ("monitorId") REFERENCES "monitor" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_result"("id", "status", "metrics", "createdAt", "monitorId") SELECT "id", "status", "metrics", "createdAt", "monitorId" FROM "result"`
    )
    await queryRunner.query(`DROP TABLE "result"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_result" RENAME TO "result"`
    )
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_14acc619b27daaba4ed65955d0" ON "result" ("createdAt") `
    )
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "temporary_monitor" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "intervalSeconds" integer NOT NULL, "type" varchar CHECK( "type" IN ('HTTP','CPU','PING','TCP') ) NOT NULL, "configuration" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "agentId" varchar, CONSTRAINT "FK_15b8449af1264cd8c31edb16ff8" FOREIGN KEY ("agentId") REFERENCES "agent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_monitor"("id", "name", "intervalSeconds", "type", "configuration", "createdAt", "updatedAt", "agentId") SELECT "id", "name", "intervalSeconds", "type", "configuration", "createdAt", "updatedAt", "agentId" FROM "monitor"`
    )
    await queryRunner.query(`DROP TABLE "monitor"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_monitor" RENAME TO "monitor"`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monitor" RENAME TO "temporary_monitor"`
    )
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "monitor" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "intervalSeconds" integer NOT NULL, "type" varchar CHECK( "type" IN ('HTTP','CPU','PING','TCP') ) NOT NULL, "configuration" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "agentId" varchar)`
    )
    await queryRunner.query(
      `INSERT INTO "monitor"("id", "name", "intervalSeconds", "type", "configuration", "createdAt", "updatedAt", "agentId") SELECT "id", "name", "intervalSeconds", "type", "configuration", "createdAt", "updatedAt", "agentId" FROM "temporary_monitor"`
    )
    await queryRunner.query(`DROP TABLE "temporary_monitor"`)
    await queryRunner.query(`DROP INDEX "IDX_14acc619b27daaba4ed65955d0"`)
    await queryRunner.query(
      `ALTER TABLE "result" RENAME TO "temporary_result"`
    )
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "result" ("id" varchar PRIMARY KEY NOT NULL, "status" varchar CHECK( "status" IN ('UP','DOWN') ) NOT NULL, "metrics" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "monitorId" varchar)`
    )
    await queryRunner.query(
      `INSERT INTO "result"("id", "status", "metrics", "createdAt", "monitorId") SELECT "id", "status", "metrics", "createdAt", "monitorId" FROM "temporary_result"`
    )
    await queryRunner.query(`DROP TABLE "temporary_result"`)
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_14acc619b27daaba4ed65955d0" ON "result" ("createdAt") `
    )
    await queryRunner.query(`DROP TABLE "monitor"`)
    await queryRunner.query(`DROP INDEX "IDX_14acc619b27daaba4ed65955d0"`)
    await queryRunner.query(`DROP TABLE "result"`)
    await queryRunner.query(`DROP TABLE "agent"`)
  }
}
