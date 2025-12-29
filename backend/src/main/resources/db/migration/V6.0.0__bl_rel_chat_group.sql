CREATE SEQUENCE bl_rel_chat_group_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_rel_chat_group
(
    id           BIGINT PRIMARY KEY,
    chat_id      BIGINT NOT NULL,
    group_id     BIGINT NOT NULL,
    workspace_id BIGINT NOT NULL,

    CONSTRAINT unique_chat_group UNIQUE (chat_id, group_id),
    FOREIGN KEY (chat_id, workspace_id)  REFERENCES bl_chat (id, workspace_id),
    FOREIGN KEY (group_id, workspace_id) REFERENCES bl_group (id, workspace_id)
);
