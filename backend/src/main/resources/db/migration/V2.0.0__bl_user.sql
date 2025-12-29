CREATE SEQUENCE bl_user_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_user
(
    id             BIGINT                   PRIMARY KEY,
    username       VARCHAR(255)             NOT NULL UNIQUE,
    password_hash  VARCHAR(255)             NOT NULL ,
    created_at     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    workspace_id   BIGINT                   NOT NULL REFERENCES bl_workspace(id),
    workspace_role VARCHAR(20)              NOT NULL DEFAULT 'MEMBER',
);
