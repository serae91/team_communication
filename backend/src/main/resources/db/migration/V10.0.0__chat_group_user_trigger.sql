CREATE OR REPLACE FUNCTION cleanup_chat_user_on_group_add()
RETURNS trigger AS $$
BEGIN
DELETE FROM bl_rel_chat_user cu
WHERE cu.chat_id = NEW.chat_id
  AND cu.user_id IN (
    SELECT gu.user_id
    FROM bl_rel_group_user gu
    WHERE gu.group_id = NEW.group_id
);

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_cleanup_chat_user_on_group_add
    AFTER INSERT ON bl_rel_chat_group
    FOR EACH ROW
    EXECUTE FUNCTION cleanup_chat_user_on_group_add();

CREATE OR REPLACE FUNCTION prevent_duplicate_user_in_chat()
RETURNS trigger AS $$
DECLARE
  v_group_id   INT;
  v_group_name TEXT;
BEGIN
SELECT cg.group_id, g.name
INTO v_group_id, v_group_name
FROM bl_rel_chat_group cg
         JOIN bl_rel_group_user gu ON gu.group_id = cg.group_id
         JOIN bl_group g ON g.id = cg.group_id
WHERE cg.chat_id = NEW.chat_id
  AND gu.user_id = NEW.user_id
    LIMIT 1;

IF FOUND THEN
    RAISE EXCEPTION
      'User % is already in chat % via group % (id=%)',
      NEW.user_id,
      NEW.chat_id,
      v_group_name,
      v_group_id;
END IF;

RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_prevent_duplicate_user_in_chat
    BEFORE INSERT ON bl_rel_chat_user
    FOR EACH ROW
    EXECUTE FUNCTION prevent_duplicate_user_in_chat();

CREATE OR REPLACE FUNCTION ensure_user_is_chat_member()
RETURNS trigger AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM bl_rel_chat_user cu
    WHERE cu.chat_id = NEW.chat_id
      AND cu.user_id = NEW.user_id

    UNION

    SELECT 1
    FROM bl_rel_chat_group cg
    JOIN bl_rel_group_user gu ON gu.group_id = cg.group_id
    WHERE cg.chat_id = NEW.chat_id
      AND gu.user_id = NEW.user_id
  ) THEN
    RAISE EXCEPTION
      'User % is not a member of chat %',
      NEW.user_id, NEW.chat_id;
END IF;

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_ensure_user_is_chat_member
    BEFORE INSERT OR UPDATE ON bl_attr_chat_user
    FOR EACH ROW
    EXECUTE FUNCTION ensure_user_is_chat_member();
