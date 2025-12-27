INSERT INTO bl_rel_group_user
VALUES (nextval('bl_rel_group_user_sequence'),
        (SELECT id FROM bl_group WHERE name = '1st user group'),
        (SELECT id FROM bl_user WHERE username = 'test')),

       (nextval('bl_rel_group_user_sequence'),
        (SELECT id FROM bl_group WHERE name = '1st user group'),
        (SELECT id FROM bl_user WHERE username = 'test2')),

       (nextval('bl_rel_group_user_sequence'),
        (SELECT id FROM bl_group WHERE name = '2nd user group'),
        (SELECT id FROM bl_user WHERE username = 'test'));