--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA accessibility;

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
