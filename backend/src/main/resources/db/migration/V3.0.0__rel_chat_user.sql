CREATE SEQUENCE rel_chat_user_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE rel_chat_user
(
    id       BIGINT PRIMARY KEY,
    chat_id  BIGINT REFERENCES chat(id),
    user_id  BIGINT REFERENCES bl_user(id),
    downed   BOOLEAN NOT NULL DEFAULT FALSE,
    reminder TIMESTAMP,
    reminded BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT unique_chat_user UNIQUE (chat_id, user_id)
);