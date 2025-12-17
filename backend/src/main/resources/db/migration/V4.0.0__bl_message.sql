CREATE SEQUENCE bl_message_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_message
(
    id         BIGINT                   PRIMARY KEY,
    text       TEXT                     NOT NULL,
    chat_id    BIGINT                   NOT NULL REFERENCES bl_chat(id),
    sender_id  BIGINT                   NOT NULL REFERENCES bl_user(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);