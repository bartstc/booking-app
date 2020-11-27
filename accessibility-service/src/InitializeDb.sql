CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA accessibility;
CREATE SCHEMA app;

CREATE TABLE accessibility.bookings (
    booking_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id uuid NOT NULL,
    facility_id uuid NOT NULL,
    status smallint NOT NULL,
    creation_date timestamp
);

CREATE TABLE accessibility.booked_records (
    booked_record_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id uuid,
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
        REFERENCES accessibility.bookings(booking_id)
);

CREATE TABLE app.outbox_notifications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type varchar(200) NOT NULL,
    occured_date timestamp NOT NULL,
    processed_date timestamp NULL,
    data text NOT NULL
);
