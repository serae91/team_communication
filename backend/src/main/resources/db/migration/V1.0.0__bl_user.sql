CREATE SEQUENCE bl_user_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_user
(
    id            BIGINT                  PRIMARY KEY,
    username      CHARACTER VARYING(255)  NOT NULL UNIQUE,
    password_hash CHARACTER VARYING(255)  NOT NULL ,
    created_at    TIMESTAMP DEFAULT NOW()
);
