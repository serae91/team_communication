CREATE SEQUENCE rel_message_referencing_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE rel_message_referencing
(
    id                     BIGINT PRIMARY KEY,
    referencing_message_id BIGINT REFERENCES message(id),
    referenced_message_id  BIGINT REFERENCES message(id),

    CONSTRAINT different_messages         CHECK (referencing_message_id <> referenced_message_id),
    CONSTRAINT unique_message_referencing UNIQUE (referencing_message_id, referenced_message_id)
);