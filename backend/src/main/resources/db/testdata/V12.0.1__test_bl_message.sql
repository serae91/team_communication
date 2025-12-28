INSERT INTO bl_message
VALUES (nextval('bl_message_sequence'),
        'This is the 1st test message' ,
        (SELECT id FROM bl_chat WHERE title = 'chat'),
        (SELECT id FROM bl_user WHERE username = 'user'),
        NOW()),

       (nextval('bl_message_sequence'),
        'This is the 2nd test message',
        (SELECT id FROM bl_chat WHERE title = 'chat'),
        (SELECT id FROM bl_user WHERE username = 'user2'),
        NOW() + INTERVAL '1 second'),

       (nextval('bl_message_sequence'),
        'This is the 3rd test message',
        (SELECT id FROM bl_chat WHERE title = 'chat'),
        (SELECT id FROM bl_user WHERE username = 'user'),
        NOW() + INTERVAL '2 seconds'),

       (nextval('bl_message_sequence'),
        'This is the 4th test message',
        (SELECT id FROM bl_chat WHERE title = 'chat'),
        (SELECT id FROM bl_user WHERE username = 'user'),
        NOW() + INTERVAL '3 seconds'),

       (nextval('bl_message_sequence'),
       'This is the 5th test message',
        (SELECT id FROM bl_chat WHERE title = 'chat3'),
        (SELECT id FROM bl_user WHERE username = 'user'),
        NOW() + INTERVAL '4 seconds'),

       (nextval('bl_message_sequence'),
       'This is the 6th test message',
        (SELECT id FROM bl_chat WHERE title = 'chat3'),
        (SELECT id FROM bl_user WHERE username = 'user3'),
        NOW() + INTERVAL '5 seconds'),

       (nextval('bl_message_sequence'),
       'This is the 7th test message',
        (SELECT id FROM bl_chat WHERE title = 'chat'),
        (SELECT id FROM bl_user WHERE username = 'user3'),
        NOW() + INTERVAL '6 seconds');
