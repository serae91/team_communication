CREATE SEQUENCE rel_user_group_user_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE rel_user_group_user
(
    id            BIGINT PRIMARY KEY,
    user_group_id BIGINT REFERENCES user_group(id),
    user_id       BIGINT REFERENCES bl_user(id),

    CONSTRAINT unique_user_group_user UNIQUE (user_group_id, user_id)
);