import { MigrationInterface, QueryRunner } from 'typeorm'

export class MonitorCronSchedule1741116998078 implements MigrationInterface {
  name = 'MonitorCronSchedule1741116998078'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_monitor" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "cronSchedule" varchar NOT NULL DEFAULT ('0 * * * * *'), "type" varchar CHECK( "type" IN ('HTTP','CPU','PING','TCP') ) NOT NULL, "configuration" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "agentId" varchar, CONSTRAINT "FK_15b8449af1264cd8c31edb16ff8" FOREIGN KEY ("agentId") REFERENCES "agent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_monitor"("id", "name", "type", "configuration", "createdAt", "updatedAt", "agentId") SELECT "id", "name", "type", "configuration", "createdAt", "updatedAt", "agentId" FROM "monitor"`
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
      `CREATE TABLE "monitor" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "intervalSeconds" int NOT NULL DEFAULT 60, "type" varchar CHECK( "type" IN ('HTTP','CPU','PING','TCP') ) NOT NULL, "configuration" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "agentId" varchar, CONSTRAINT "FK_15b8449af1264cd8c31edb16ff8" FOREIGN KEY ("agentId") REFERENCES "agent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "monitor"("id", "name", "intervalSeconds", "type", "configuration", "createdAt", "updatedAt", "agentId") SELECT "id", "name", 60, "type", "configuration", "createdAt", "updatedAt", "agentId" FROM "temporary_monitor"`
    )
    await queryRunner.query(`DROP TABLE "temporary_monitor"`)
  }
}
