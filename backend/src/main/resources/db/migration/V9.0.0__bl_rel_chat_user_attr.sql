CREATE SEQUENCE bl_rel_chat_user_attr_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE bl_rel_chat_user_attr
(
    id              BIGINT                   PRIMARY KEY,
    chat_id         BIGINT                   NOT NULL REFERENCES bl_chat(id),
    user_id         BIGINT                   NOT NULL REFERENCES bl_user(id),
    done            BOOLEAN                  NOT NULL DEFAULT FALSE,
    reminder_at     TIMESTAMP WITH TIME ZONE,
    reminder_status VARCHAR(20)              NOT NULL DEFAULT 'NONE',

    CONSTRAINT unique_attr_chat_user UNIQUE (chat_id, user_id),

    CONSTRAINT chat_not_done_and_reminder
        CHECK (
            NOT (done = TRUE AND reminder_status <> 'NONE')
            ),

    CONSTRAINT chat_reminder_consistency
        CHECK (
            (reminder_status <> 'NONE' AND reminder_at IS NOT NULL)
                OR
            (reminder_status = 'NONE' AND reminder_at IS NULL)
            )
);


CREATE INDEX bl_rel_chat_user_attr_reminder_index ON bl_rel_chat_user_attr (reminder_at, reminder_status);