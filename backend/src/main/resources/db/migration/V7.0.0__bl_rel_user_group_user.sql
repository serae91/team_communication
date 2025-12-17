CREATE SEQUENCE bl_rel_user_group_user_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_rel_user_group_user
(
    id            BIGINT PRIMARY KEY,
    user_group_id BIGINT NOT NULL REFERENCES bl_user_group(id),
    user_id       BIGINT NOT NULL REFERENCES bl_user(id),

    CONSTRAINT unique_user_group_user UNIQUE (user_group_id, user_id)
);