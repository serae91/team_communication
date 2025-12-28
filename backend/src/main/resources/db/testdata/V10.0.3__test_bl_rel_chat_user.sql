INSERT INTO bl_rel_chat_user
VALUES (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat2'),
        (SELECT id FROM bl_user WHERE username = 'user2')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat2'),
        (SELECT id FROM bl_user WHERE username = 'user3')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat2'),
        (SELECT id FROM bl_user WHERE username = 'user15'));
