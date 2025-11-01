CREATE SEQUENCE chat_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE chat
(
    id         BIGINT                  PRIMARY KEY,
    urgency    CHARACTER VARYING(20)   NOT NULL UNIQUE,
    created_at TIMESTAMP               DEFAULT NOW()
);