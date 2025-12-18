CREATE SEQUENCE bl_chat_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_chat
(
    id                   BIGINT                   PRIMARY KEY,
    title                CHARACTER VARYING(255)   NOT NULL,
    urgency              CHARACTER VARYING(255)   NOT NULL,
    created_at           TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_message_user_id BIGINT                   NOT NULL REFERENCES bl_user(id)
);