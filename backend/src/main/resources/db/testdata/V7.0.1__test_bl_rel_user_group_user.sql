INSERT INTO bl_rel_user_group_user
VALUES (nextval('bl_rel_user_group_user_sequence'),
        (SELECT id FROM bl_user_group WHERE name = '1st user group'),
        (SELECT id FROM bl_user WHERE username = 'Test_User_1')),

       (nextval('bl_rel_user_group_user_sequence'),
        (SELECT id FROM bl_user_group WHERE name = '1st user group'),
        (SELECT id FROM bl_user WHERE username = 'Test_User_2')),

       (nextval('bl_rel_user_group_user_sequence'),
        (SELECT id FROM bl_user_group WHERE name = '2nd user group'),
        (SELECT id FROM bl_user WHERE username = 'Test_User_1'));