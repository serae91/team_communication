CREATE OR REPLACE VIEW chat_user_view AS
SELECT
    c.id                   AS chat_id,
    c.title                AS title,
    c.urgency              AS urgency,
    c.created_at           AS created_at,
    c.last_message_user_id AS last_message_user_id,
    c.last_message_at      AS last_message_at,

    u.id                AS user_id,

    COALESCE(cua.done, false)             AS done,
    COALESCE(cua.reminder_at, null)       AS reminder_at,
    COALESCE(cua.reminder_status, 'NONE') AS reminder_status

FROM bl_chat c
         JOIN (
    SELECT chat_id, user_id
    FROM bl_rel_chat_user
    UNION
    SELECT cg.chat_id, gu.user_id
    FROM bl_rel_chat_group cg
             JOIN bl_rel_group_user gu ON gu.group_id = cg.group_id
) cm ON cm.chat_id = c.id
         JOIN bl_user u ON u.id = cm.user_id
         LEFT JOIN bl_rel_chat_user_attr cua
                   ON cua.chat_id = c.id
                       AND cua.user_id = u.id;
