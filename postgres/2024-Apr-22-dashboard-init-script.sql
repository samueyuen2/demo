CREATE TABLE brands (
    id              UUID        PRIMARY KEY,
    name            VARCHAR     NOT NULL,
    location        VARCHAR     NOT NULL,
    createdAt       DATE        NOT NULL,
    updatedAt       DATE        NOT NULL
);

CREATE TABLE retailers (
    id              UUID        PRIMARY KEY,
    name            VARCHAR     NOT NULL,
    phone           VARCHAR     NOT NULL,
    createdAt       DATE        NOT NULL,
    updatedAt       DATE        NOT NULL
);

CREATE TABLE orders (
    id              UUID                PRIMARY KEY,
    brandid         UUID                NOT NULL,
    retailerid      UUID                NOT NULL,
    date            DATE                NOT NULL,
    price           DOUBLE PRECISION    NOT NULL,
    packages        INTEGER             NOT NULL,
    createdAt       DATE                NOT NULL,
    updatedAt       DATE                NOT NULL
);

DELETE FROM brands;
DELETE FROM retailers;
DELETE FROM orders;