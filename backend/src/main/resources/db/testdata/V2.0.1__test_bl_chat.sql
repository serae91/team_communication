INSERT INTO bl_chat
VALUES (nextval('bl_chat_sequence'), 'Test_Chat_1', 'LOW', NOW()),
       (nextval('bl_chat_sequence'), 'Test_Chat_2', 'MEDIUM', NOW()),
       (nextval('bl_chat_sequence'), 'Test_Chat_3', 'HIGH', NOW());