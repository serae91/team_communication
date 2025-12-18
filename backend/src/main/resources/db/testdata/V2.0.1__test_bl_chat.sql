INSERT INTO bl_chat
VALUES (nextval('bl_chat_sequence'), 'Test_Chat_1', 'LOW', NOW(), (SELECT id FROM bl_user WHERE username = 'test3')),
       (nextval('bl_chat_sequence'), 'Test_Chat_2', 'MEDIUM', NOW(), (SELECT id FROM bl_user WHERE username = 'test')),
       (nextval('bl_chat_sequence'), 'Test_Chat_3', 'HIGH', NOW(), (SELECT id FROM bl_user WHERE username = 'test3'));