CREATE SEQUENCE chat_group_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE chat_group
(
    id         bigint                  PRIMARY KEY,
    group_name CHARACTER VARYING(255)  NOT NULL UNIQUE,
    created_at TIMESTAMP               DEFAULT NOW()
);