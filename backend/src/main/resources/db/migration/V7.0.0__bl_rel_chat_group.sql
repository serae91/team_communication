CREATE SEQUENCE bl_rel_chat_group_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_rel_chat_group
(
    id              BIGINT PRIMARY KEY,
    chat_id         BIGINT NOT NULL REFERENCES bl_chat(id),
    group_id        BIGINT NOT NULL REFERENCES bl_group(id),

    CONSTRAINT unique_chat_group UNIQUE (chat_id, group_id)
);
