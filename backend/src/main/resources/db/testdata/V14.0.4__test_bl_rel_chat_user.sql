INSERT INTO bl_rel_chat_user
VALUES (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat'),
        (SELECT id FROM bl_user WHERE username = 'user')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat'),
        (SELECT id FROM bl_user WHERE username = 'user2')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat2'),
        (SELECT id FROM bl_user WHERE username = 'user')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat2'),
        (SELECT id FROM bl_user WHERE username = 'user2')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat2'),
        (SELECT id FROM bl_user WHERE username = 'user3')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat3'),
        (SELECT id FROM bl_user WHERE username = 'user')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat4'),
        (SELECT id FROM bl_user WHERE username = 'user')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat4'),
        (SELECT id FROM bl_user WHERE username = 'user2')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat5'),
        (SELECT id FROM bl_user WHERE username = 'user5')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat6'),
        (SELECT id FROM bl_user WHERE username = 'user6')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat9'),
        (SELECT id FROM bl_user WHERE username = 'user9')),

       (nextval('bl_rel_chat_user_sequence'),
        (SELECT id FROM bl_chat WHERE title = 'chat10'),
        (SELECT id FROM bl_user WHERE username = 'user10'));
