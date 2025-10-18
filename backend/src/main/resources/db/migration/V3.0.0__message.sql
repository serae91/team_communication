CREATE SEQUENCE message_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE message
(
    id                                  BIGINT    PRIMARY KEY,
    text                                TEXT      NOT NULL,
    created_at                          TIMESTAMP DEFAULT NOW(),
    team_communication_user_sender_id   BIGINT    REFERENCES team_communication_user(id),
    team_communication_user_receiver_id BIGINT    REFERENCES team_communication_user(id),
    chat_group_id                       BIGINT    REFERENCES chat_group(id),
    CONSTRAINT check_receiver CHECK (
        (team_communication_user_receiver_id IS NOT NULL AND chat_group_id IS NULL)
            OR
        (team_communication_user_receiver_id IS NULL AND chat_group_id IS NOT NULL)
        )
);