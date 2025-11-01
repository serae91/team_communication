CREATE SEQUENCE message_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE message
(
    id         BIGINT    PRIMARY KEY,
    text       TEXT      NOT NULL,
    chat_id    BIGINT    REFERENCES chat(id),
    sender_id  BIGINT    REFERENCES bl_user(id)
    created_at TIMESTAMP DEFAULT NOW(),
);