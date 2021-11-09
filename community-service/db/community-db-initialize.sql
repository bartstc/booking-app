CREATE DATABASE Community;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA app;

CREATE TABLE app.outbox_notifications (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        type varchar(200) NOT NULL,
        occured_date timestamp NOT NULL,
        processed_date timestamp NULL,
        data text NOT NULL
    );