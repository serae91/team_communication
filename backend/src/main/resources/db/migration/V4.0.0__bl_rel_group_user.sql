CREATE SEQUENCE bl_rel_group_user_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_rel_group_user
(
    id           BIGINT  PRIMARY KEY,
    group_id     BIGINT  NOT NULL,
    user_id      BIGINT  NOT NULL,
    workspace_id BIGINT  NOT NULL,
    role     VARCHAR(20) NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT unique_group_user UNIQUE (group_id, user_id),
    FOREIGN KEY (group_id, workspace_id) REFERENCES bl_group (id, workspace_id),
    FOREIGN KEY (user_id, workspace_id)  REFERENCES bl_user (id, workspace_id)
);
