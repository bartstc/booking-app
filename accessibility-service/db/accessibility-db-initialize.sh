#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE accessibility;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname accessibility <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE SCHEMA accessibility;
    CREATE SCHEMA booking;
    CREATE SCHEMA facility;
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

    CREATE TABLE facility.offers (
        offer_id uuid PRIMARY KEY,
        facility_id uuid NOT NULL,
        name varchar(100) NOT NULL,
        price numeric NOT NULL,
        currency varchar(5) NOT NULL,
        duration smallint NOT NULL
    );

    CREATE TABLE booking.bookings (
        booking_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        customer_id uuid NOT NULL,
        facility_id uuid NOT NULL,
        status smallint NOT NULL,
        creation_date timestamp
    );

    CREATE TABLE booking.booked_records (
        booked_record_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        booking_id uuid NOT NULL,
        employee_id uuid NOT NULL,
        offer_id uuid NOT NULL,
        price numeric NOT NULL,
        currency varchar(5) NOT NULL,
        status smallint NOT NULL,
        date timestamp NOT NULL,
        duration smallint NOT NULL,
        change_date timestamp,
        CONSTRAINT fk_booking
            FOREIGN KEY(booking_id)
            REFERENCES booking.bookings(booking_id),
        CONSTRAINT fk_offer
            FOREIGN KEY(offer_id)
            REFERENCES facility.offers(offer_id)
    );

    CREATE TABLE app.outbox_notifications (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        type varchar(200) NOT NULL,
        occured_date timestamp NOT NULL,
        processed_date timestamp NULL,
        data text NOT NULL
    );
EOSQL