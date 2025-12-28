CREATE SEQUENCE bl_rel_workspace_user_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_rel_workspace_user
(
    id            BIGINT      PRIMARY KEY,
    workspace_id  BIGINT      NOT NULL REFERENCES bl_workspace(id),
    user_id       BIGINT      NOT NULL REFERENCES bl_user(id),
    role          VARCHAR(20) NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT unique_workspace_user UNIQUE (workspace_id, user_id)
);
