#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE management;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname management <<-EOSQL
    CREATE SCHEMA management;

    CREATE TABLE management.employee ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "employee_id" character varying NOT NULL, "status" character varying NOT NULL, "details" jsonb NOT NULL, "facility_id" character varying NOT NULL, CONSTRAINT "PK_ffc7cd0d991d409f849c8c0408a" PRIMARY KEY ("employee_id"));

    CREATE TABLE management.offer ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "offer_id" character varying NOT NULL, "status" character varying NOT NULL, "details" jsonb NOT NULL, "facility_id" character varying NOT NULL, CONSTRAINT "PK_d0be8491418e4db748629531269" PRIMARY KEY ("offer_id"));

    CREATE TABLE management.enterprise ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "enterprise_id" character varying NOT NULL, "details" jsonb NOT NULL, CONSTRAINT "PK_41d7adea01c8f538e69414467cd" PRIMARY KEY ("enterprise_id"));

    CREATE TABLE management.facility ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "facility_id" character varying NOT NULL, "slug" character varying NOT NULL, "details" jsonb NOT NULL, "enterprise_id" character varying NOT NULL, CONSTRAINT "UQ_bd805f2d9e0577b66b928973d87" UNIQUE ("slug"), CONSTRAINT "PK_7af67950bfb9092b0b39bd8f66c" PRIMARY KEY ("facility_id"));

    CREATE TABLE management.customer ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "customer_id" character varying NOT NULL, "is_systemic" boolean NOT NULL, "details" jsonb NOT NULL, "facility_id" character varying NOT NULL, CONSTRAINT "PK_5defaada33692b58b70b33b9fd4" PRIMARY KEY ("customer_id"));

    ALTER TABLE management.employee ADD CONSTRAINT "FK_5cbeaf098b50de7e0397e9ed9f7" FOREIGN KEY ("facility_id") REFERENCES "management"."facility"("facility_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

    ALTER TABLE management.offer ADD CONSTRAINT "FK_9b83d4d64c68b8a3e23d5538b8f" FOREIGN KEY ("facility_id") REFERENCES "management"."facility"("facility_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

    ALTER TABLE management.facility ADD CONSTRAINT "FK_aae7b0f7a5721f311aa18325814" FOREIGN KEY ("enterprise_id") REFERENCES "management"."enterprise"("enterprise_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

    ALTER TABLE management.customer ADD CONSTRAINT "FK_e0b4f031aa3e3c2f6dded8dc827" FOREIGN KEY ("facility_id") REFERENCES "management"."facility"("facility_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
EOSQL
