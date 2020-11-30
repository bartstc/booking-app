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
