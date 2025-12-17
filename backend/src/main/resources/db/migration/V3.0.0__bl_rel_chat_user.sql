CREATE SEQUENCE bl_rel_chat_user_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_rel_chat_user
(
    id              BIGINT PRIMARY KEY,
    chat_id         BIGINT NOT NULL REFERENCES bl_chat(id),
    user_id         BIGINT NOT NULL REFERENCES bl_user(id),
    downed          BOOLEAN NOT NULL DEFAULT FALSE,
    reminder_at     TIMESTAMP WITH TIME ZONE,
    reminder_status VARCHAR(20) NOT NULL DEFAULT 'NONE',

    CONSTRAINT unique_chat_user UNIQUE (chat_id, user_id)
);

CREATE INDEX bl_rel_chat_user_reminder_index ON bl_rel_chat_user (reminder_at, reminder_status);