#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE booking;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname booking <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE SCHEMA booking;

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
            REFERENCES booking.bookings(booking_id)
    );
EOSQL