#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE management;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname management <<-EOSQL
    CREATE SCHEMA management;

    CREATE TABLE management.employee ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "employee_id" character varying NOT NULL, "status" character varying NOT NULL, "details" jsonb NOT NULL, "scope" jsonb NOT NULL, "enterprise_id" character varying NOT NULL, CONSTRAINT "PK_1d2f9b4274acef0fca192f725be" PRIMARY KEY ("employee_id"));

    CREATE TABLE management.offer ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "offer_id" character varying NOT NULL, "status" character varying NOT NULL, "details" jsonb NOT NULL, "facility_id" character varying NOT NULL, CONSTRAINT "PK_ab750b0447223d1539665686fae" PRIMARY KEY ("offer_id"));

    CREATE TABLE management.enterprise ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "enterprise_id" character varying NOT NULL, "owner_id" character varying NOT NULL, "details" jsonb NOT NULL, CONSTRAINT "PK_46befd90b5c670b4b6fbfe65948" PRIMARY KEY ("enterprise_id"));

    CREATE TABLE management.facility ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "facility_id" character varying NOT NULL, "slug" character varying NOT NULL, "details" jsonb NOT NULL, "enterprise_id" character varying NOT NULL, CONSTRAINT "UQ_261945422d1ed8720db04803bd0" UNIQUE ("slug"), CONSTRAINT "PK_ce2c19c9109f1abfbea939b9751" PRIMARY KEY ("facility_id"));

    CREATE TABLE management.customer ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "customer_id" character varying NOT NULL, "is_systemic" boolean NOT NULL, "details" jsonb NOT NULL, "facility_id" character varying NOT NULL, CONSTRAINT "PK_e646aafed4b46a5bf6b34697c18" PRIMARY KEY ("customer_id"));

    ALTER TABLE "management"."offer" ADD CONSTRAINT "FK_50edbaf699de286e58304ed5b03" FOREIGN KEY ("facility_id") REFERENCES "management"."facility"("facility_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

    ALTER TABLE "management"."employee" ADD CONSTRAINT "FK_5abad1005a32fe82cc322d09b24" FOREIGN KEY ("enterprise_id") REFERENCES "management"."enterprise"("enterprise_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

    ALTER TABLE "management"."facility" ADD CONSTRAINT "FK_0609d6b2d3eb23bb1694d16a5f1" FOREIGN KEY ("enterprise_id") REFERENCES "management"."enterprise"("enterprise_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

    ALTER TABLE "management"."customer" ADD CONSTRAINT "FK_6dc67d2513ac181bc64829541ec" FOREIGN KEY ("facility_id") REFERENCES "management"."facility"("facility_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
EOSQL
