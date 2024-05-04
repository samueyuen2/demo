CREATE TABLE items (
    id              VARCHAR             PRIMARY KEY,
    date            DATE                NOT NULL,
    retailerid      VARCHAR             NOT NULL,
    ean             VARCHAR             NOT NULL,
    categoryid      VARCHAR             NOT NULL,
    manufacturerid  VARCHAR             NOT NULL,
    brandid         VARCHAR             NOT NULL,
    producttitle    VARCHAR             NOT NULL,
    image           VARCHAR             NOT NULL,
    onpromotion     BOOLEAN             NOT NULL,
    promotiondesc   VARCHAR             NULL,
    baseprice       DOUBLE PRECISION    NOT NULL,
    shelfprice      DOUBLE PRECISION    NOT NULL,
    promotedprice   DOUBLE PRECISION    NOT NULL,
    createdAt       DATE                NOT NULL,
    updatedAt       DATE                NOT NULL
);

CREATE TABLE retailers (
    id              VARCHAR     PRIMARY KEY,
    name            VARCHAR     NOT NULL,
    createdAt       DATE        NOT NULL,
    updatedAt       DATE        NOT NULL
);

CREATE TABLE categories (
    id              VARCHAR     PRIMARY KEY,
    name            VARCHAR     NOT NULL,
    createdAt       DATE        NOT NULL,
    updatedAt       DATE        NOT NULL
);

CREATE TABLE manufacturers (
    id              VARCHAR     PRIMARY KEY,
    name            VARCHAR     NOT NULL,
    createdAt       DATE        NOT NULL,
    updatedAt       DATE        NOT NULL
);

CREATE TABLE brands (
    id              VARCHAR     PRIMARY KEY,
    name            VARCHAR     NOT NULL,
    createdAt       DATE        NOT NULL,
    updatedAt       DATE        NOT NULL
);

CREATE TABLE manufacturer_brand (
    id              VARCHAR     PRIMARY KEY,    
    manufacturerid  VARCHAR     NOT NULL,
    brandid         VARCHAR     NOT NULL,
    createdAt       DATE        NOT NULL,
    updatedAt       DATE        NOT NULL
);