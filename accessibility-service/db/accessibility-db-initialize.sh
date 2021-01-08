#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE accessibility;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname accessibility <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE SCHEMA accessibility;
    CREATE SCHEMA app;

    CREATE TABLE accessibility.schedules (
        schedule_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        facility_id uuid NOT NULL,
        name varchar(100) NOT NULL,
        start_date timestamp NOT NULL,
        end_date timestamp NOT NULL,
        creator_id uuid NOT NULL,
        creation_date timestamp NOT NULL,
        modify_date timestamp,
        version integer NOT NULL
    );

    CREATE TABLE accessibility.availabilities (
        availability_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        schedule_id uuid NOT NULL,
        employee_id uuid NOT NULL,
        start_time timestamp NOT NULL,
        end_time timestamp NOT NULL,
        priority smallint NOT NULL DEFAULT 0,
        creator_id uuid NOT NULL,
        creation_date timestamp NOT NULL,
        CONSTRAINT fk_schedule
            FOREIGN KEY(schedule_id)
            REFERENCES accessibility.schedules(schedule_id)
    );

    CREATE TABLE app.outbox_notifications (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        type varchar(200) NOT NULL,
        occured_date timestamp NOT NULL,
        processed_date timestamp NULL,
        data text NOT NULL
    );
EOSQL