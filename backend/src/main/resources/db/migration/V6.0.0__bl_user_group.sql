CREATE SEQUENCE bl_user_group_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_user_group
(
    id         BIGINT                  PRIMARY KEY,
    name       CHARACTER VARYING(255)  NOT NULL UNIQUE,
    created_at TIMESTAMP               DEFAULT NOW()
);