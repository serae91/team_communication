INSERT INTO bl_rel_chat_group
VALUES (nextval('bl_rel_chat_group_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat'),
        (SELECT id FROM bl_group WHERE name = 'group')),

       (nextval('bl_rel_chat_group_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat2'),
        (SELECT id FROM bl_group WHERE name = 'group2')),

       (nextval('bl_rel_chat_group_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat3'),
        (SELECT id FROM bl_group WHERE name = 'group')),

       (nextval('bl_rel_chat_group_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat3'),
        (SELECT id FROM bl_group WHERE name = 'group2')),

       (nextval('bl_rel_chat_group_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat4'),
        (SELECT id FROM bl_group WHERE name = 'group3'));