module.exports = class Data1709332200141 {
    name = 'Data1709332200141'

    async up(db) {
        await db.query(`CREATE TABLE "collection" ("id" character varying NOT NULL, "collection_id" numeric NOT NULL, "minted_at" numeric NOT NULL, "collection_hash" text NOT NULL, "created_by_id" character varying, "event_id" character varying, CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_f7f39206eb394d7d788699c600" ON "collection" ("collection_id") `)
        await db.query(`CREATE INDEX "IDX_1bf827370432fdd0cbd01cc7c9" ON "collection" ("created_by_id") `)
        await db.query(`CREATE INDEX "IDX_5071dfbea812b4caade2ede213" ON "collection" ("event_id") `)
        await db.query(`CREATE TABLE "activity" ("id" character varying NOT NULL, "event_id" numeric NOT NULL, "created_at" numeric NOT NULL, "mint_date" numeric NOT NULL, "organizer_id" character varying, "collection_id" character varying, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_c2c1e9fdda754a6bf7f664d7e0" ON "activity" ("event_id") `)
        await db.query(`CREATE INDEX "IDX_7d8d381ad778df302090f32271" ON "activity" ("organizer_id") `)
        await db.query(`CREATE INDEX "IDX_6ebb0a7da419746160dbc0d1e0" ON "activity" ("collection_id") `)
        await db.query(`CREATE TABLE "organizer" ("id" character varying NOT NULL, "username" text NOT NULL, "account" text NOT NULL, CONSTRAINT "PK_b59551a131f312443b992f90434" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_c8a27667f675300337fad9fb31" ON "organizer" ("account") `)
        await db.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_1bf827370432fdd0cbd01cc7c9d" FOREIGN KEY ("created_by_id") REFERENCES "organizer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_5071dfbea812b4caade2ede2139" FOREIGN KEY ("event_id") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_7d8d381ad778df302090f322713" FOREIGN KEY ("organizer_id") REFERENCES "organizer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_6ebb0a7da419746160dbc0d1e03" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "collection"`)
        await db.query(`DROP INDEX "public"."IDX_f7f39206eb394d7d788699c600"`)
        await db.query(`DROP INDEX "public"."IDX_1bf827370432fdd0cbd01cc7c9"`)
        await db.query(`DROP INDEX "public"."IDX_5071dfbea812b4caade2ede213"`)
        await db.query(`DROP TABLE "activity"`)
        await db.query(`DROP INDEX "public"."IDX_c2c1e9fdda754a6bf7f664d7e0"`)
        await db.query(`DROP INDEX "public"."IDX_7d8d381ad778df302090f32271"`)
        await db.query(`DROP INDEX "public"."IDX_6ebb0a7da419746160dbc0d1e0"`)
        await db.query(`DROP TABLE "organizer"`)
        await db.query(`DROP INDEX "public"."IDX_c8a27667f675300337fad9fb31"`)
        await db.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_1bf827370432fdd0cbd01cc7c9d"`)
        await db.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_5071dfbea812b4caade2ede2139"`)
        await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_7d8d381ad778df302090f322713"`)
        await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_6ebb0a7da419746160dbc0d1e03"`)
    }
}
