import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1700842358183 implements MigrationInterface {
    name = 'InitialMigration1700842358183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "nome" character varying(80) NOT NULL, "email" character varying(50) NOT NULL, "senha" text NOT NULL, "data_criacao" date NOT NULL DEFAULT now(), "data_atualizacao" date NOT NULL DEFAULT now(), "ultimo_login" date NOT NULL, "token" text NOT NULL, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "telefone" ("id" SERIAL NOT NULL, "numero" character varying(10) NOT NULL, "ddd" character varying(3) NOT NULL, "userId" integer, CONSTRAINT "PK_6b27db34d6da7b23e8680a55fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "telefone" ADD CONSTRAINT "FK_8bdbdb95090a5274acebe14a25d" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "telefone" DROP CONSTRAINT "FK_8bdbdb95090a5274acebe14a25d"`);
        await queryRunner.query(`DROP TABLE "telefone"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
