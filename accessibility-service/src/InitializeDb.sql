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
        REFERENCES accessibility.bookings(booking_id)
);

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

--Set Returning Functions

CREATE OR REPLACE FUNCTION accessibility.booked_records_of_facility(facility_id uuid, date_from timestamp, date_to timestamp)
    RETURNS TABLE (BookingId uuid, EmployeeId uuid, OfferId uuid, Price numeric, Currency varchar(5), Status smallint, Date timestamp, Duration smallint)
AS
$$
SELECT
    b.booking_id,
    r.employee_id,
    r.offer_id,
    r.price,
    r.currency,
    r.status,
    r.date,
    r.duration
FROM
    accessibility.bookings b INNER JOIN
    accessibility.booked_records r ON b.booking_id = r.booking_id
WHERE
    b.facility_id = $1 AND
    r.date BETWEEN $2::timestamp AND $3::timestamp
$$
LANGUAGE sql;

CREATE TABLE app.outbox_notifications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type varchar(200) NOT NULL,
    occured_date timestamp NOT NULL,
    processed_date timestamp NULL,
    data text NOT NULL
);
