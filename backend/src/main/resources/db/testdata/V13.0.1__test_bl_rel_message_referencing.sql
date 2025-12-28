INSERT INTO bl_rel_message_referencing
VALUES (nextval('bl_rel_message_referencing_sequence'),
        (SELECT id FROM bl_message WHERE text = 'This is the 1st test message'),
        (SELECT id FROM bl_message WHERE text = 'This is the 2nd test message')),

       (nextval('bl_rel_message_referencing_sequence'),
        (SELECT id FROM bl_message WHERE text = 'This is the 4th test message'),
        (SELECT id FROM bl_message WHERE text = 'This is the 5th test message')),

       (nextval('bl_rel_message_referencing_sequence'),
        (SELECT id FROM bl_message WHERE text = 'This is the 1st test message'),
        (SELECT id FROM bl_message WHERE text = 'This is the 5th test message'));
