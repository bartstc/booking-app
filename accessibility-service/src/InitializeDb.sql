--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA accessibility;
CREATE SCHEMA app;

CREATE TABLE accessibility.bookings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    employeeId uuid NOT NULL,
    customerId uuid NOT NULL,
    offerId uuid NOT NULL,
    price numeric NOT NULL,
    currency varchar(5) NOT NULL,
    status smallint NOT NULL,
    date date NOT NULL,
    creationDate date NOT NULL,
    changeDate date
);

CREATE TABLE app.outbox_notifications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type varchar(200) NOT NULL,
    occured_date timestamp NOT NULL,
    processed_date timestamp NULL,
    data text NOT NULL
)
