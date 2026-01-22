INSERT INTO bl_rel_group_user
VALUES (nextval('bl_rel_group_user_sequence'),
        (SELECT id FROM bl_group WHERE name = 'group'),
        (SELECT id FROM bl_user WHERE username = 'user3')),

       (nextval('bl_rel_group_user_sequence'),
        (SELECT id FROM bl_group WHERE name = 'group'),
        (SELECT id FROM bl_user WHERE username = 'user4')),

       (nextval('bl_rel_group_user_sequence'),
        (SELECT id FROM bl_group WHERE name = 'group2'),
        (SELECT id FROM bl_user WHERE username = 'user7')),

       (nextval('bl_rel_group_user_sequence'),
        (SELECT id FROM bl_group WHERE name = 'group2'),
        (SELECT id FROM bl_user WHERE username = 'user8')),

       (nextval('bl_rel_group_user_sequence'),
        (SELECT id FROM bl_group WHERE name = 'group3'),
        (SELECT id FROM bl_user WHERE username = 'user11')),

       (nextval('bl_rel_group_user_sequence'),
        (SELECT id FROM bl_group WHERE name = 'group3'),
        (SELECT id FROM bl_user WHERE username = 'user12'));
