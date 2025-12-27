CREATE SEQUENCE bl_rel_group_user_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_rel_group_user
(
    id            BIGINT PRIMARY KEY,
    group_id      BIGINT NOT NULL REFERENCES bl_group(id),
    user_id       BIGINT NOT NULL REFERENCES bl_user(id),

    CONSTRAINT unique_group_user UNIQUE (group_id, user_id)
);