INSERT INTO message
VALUES (nextval('message_sequence'), 'This is the first test message', NOW(),
        (SELECT id FROM team_communication_user WHERE username = 'Test_User_1'),
        (SELECT id FROM team_communication_user WHERE username = 'Test_User_2'),
        null),
       (nextval('message_sequence'), 'This is the second test message in a group chat', NOW(),
        (SELECT id FROM team_communication_user WHERE username = 'Test_User_1'),
        null,
        (SELECT id FROM chat_group WHERE group_name = 'Test_Chat_Group_1'));