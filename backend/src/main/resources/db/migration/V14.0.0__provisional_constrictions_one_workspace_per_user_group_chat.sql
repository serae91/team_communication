ALTER TABLE bl_rel_workspace_user ADD CONSTRAINT one_workspace_per_user UNIQUE (user_id);



-----------------



CREATE OR REPLACE FUNCTION enforce_single_workspace_per_chat()
RETURNS trigger AS $$
DECLARE
  new_workspace BIGINT;
  chat_workspace BIGINT;
  workspace_count INTEGER;
BEGIN
  -- Determine workspace of the element being added
  IF TG_TABLE_NAME = 'bl_rel_chat_user' THEN
    -- New user
SELECT workspace_id
INTO new_workspace
FROM bl_rel_workspace_user
WHERE user_id = NEW.user_id;

IF new_workspace IS NULL THEN
      RAISE EXCEPTION 'User % is not assigned to any workspace', NEW.user_id;
END IF;

  ELSIF TG_TABLE_NAME = 'bl_rel_chat_group' THEN
    -- New group
SELECT wu.workspace_id
INTO new_workspace
FROM bl_rel_group_user gu
         JOIN bl_rel_workspace_user wu ON wu.user_id = gu.user_id
WHERE gu.group_id = NEW.group_id
GROUP BY wu.workspace_id
HAVING COUNT(DISTINCT wu.workspace_id) = 1; -- ensure all members same workspace

IF new_workspace IS NULL THEN
      RAISE EXCEPTION 'Group % contains users from multiple workspaces or is empty', NEW.group_id;
END IF;
END IF;

  -- Determine workspace(s) already in chat
SELECT COUNT(DISTINCT workspace_id)
INTO workspace_count
FROM (
         -- direct chat users
         SELECT wu.workspace_id
         FROM bl_rel_chat_user cu
                  JOIN bl_rel_workspace_user wu ON wu.user_id = cu.user_id
         WHERE cu.chat_id = NEW.chat_id

         UNION

         -- group-based chat users
         SELECT wu.workspace_id
         FROM bl_rel_chat_group cg
                  JOIN bl_rel_group_user gu ON gu.group_id = cg.group_id
                  JOIN bl_rel_workspace_user wu ON wu.user_id = gu.user_id
         WHERE cg.chat_id = NEW.chat_id
     ) workspaces;

-- If the chat already contains multiple workspaces, error
IF workspace_count > 1 THEN
    RAISE EXCEPTION 'Chat % already contains users from multiple workspaces', NEW.chat_id;
END IF;

  -- Get single workspace of chat (if exists)
SELECT workspace_id
INTO chat_workspace
FROM (
         SELECT wu.workspace_id
         FROM bl_rel_chat_user cu
                  JOIN bl_rel_workspace_user wu ON wu.user_id = cu.user_id
         WHERE cu.chat_id = NEW.chat_id

         UNION

         SELECT wu.workspace_id
         FROM bl_rel_chat_group cg
                  JOIN bl_rel_group_user gu ON gu.group_id = cg.group_id
                  JOIN bl_rel_workspace_user wu ON wu.user_id = gu.user_id
         WHERE cg.chat_id = NEW.chat_id
     ) workspaces
    LIMIT 1;

-- If chat is empty, allow
IF chat_workspace IS NULL THEN
    RETURN NEW;
END IF;

  -- Enforce same workspace
  IF chat_workspace <> new_workspace THEN
    IF TG_TABLE_NAME = 'bl_rel_chat_user' THEN
      RAISE EXCEPTION 'User % (workspace %) cannot join chat % (workspace %)',
        NEW.user_id, new_workspace, NEW.chat_id, chat_workspace;
ELSE
      RAISE EXCEPTION 'Group % (workspace %) cannot join chat % (workspace %)',
        NEW.group_id, new_workspace, NEW.chat_id, chat_workspace;
END IF;
END IF;

RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER chat_user_workspace_enforce
BEFORE INSERT OR UPDATE ON bl_rel_chat_user
FOR EACH ROW
EXECUTE FUNCTION enforce_single_workspace_per_chat();

CREATE TRIGGER chat_group_workspace_enforce
BEFORE INSERT OR UPDATE ON bl_rel_chat_group
FOR EACH ROW
EXECUTE FUNCTION enforce_single_workspace_per_chat();




-----------------



CREATE OR REPLACE FUNCTION enforce_single_workspace_per_group()
RETURNS trigger AS $$
DECLARE
new_user_workspace BIGINT;
  group_workspace BIGINT;
  workspace_count INTEGER;
BEGIN
  -- Get workspace of the user being added
SELECT workspace_id
INTO new_user_workspace
FROM bl_rel_workspace_user
WHERE user_id = NEW.user_id;

IF new_user_workspace IS NULL THEN
    RAISE EXCEPTION 'User % is not assigned to any workspace', NEW.user_id;
END IF;

  -- Count distinct workspaces already present in the group
SELECT COUNT(DISTINCT wu.workspace_id)
INTO workspace_count
FROM bl_rel_group_user gu
         JOIN bl_rel_workspace_user wu ON wu.user_id = gu.user_id
WHERE gu.group_id = NEW.group_id;

-- If the group already contains users from multiple workspaces,
-- the data is inconsistent and must not be extended further
IF workspace_count > 1 THEN
    RAISE EXCEPTION
      'Group % already contains users from multiple workspaces',
      NEW.group_id;
END IF;

  -- Get the single workspace associated with the group (if any)
SELECT wu.workspace_id
INTO group_workspace
FROM bl_rel_group_user gu
         JOIN bl_rel_workspace_user wu ON wu.user_id = gu.user_id
WHERE gu.group_id = NEW.group_id
    LIMIT 1;

-- If the group is empty, allow the insert
IF group_workspace IS NULL THEN
    RETURN NEW;
END IF;

  -- Enforce that the new user belongs to the same workspace as the group
  IF group_workspace <> new_user_workspace THEN
    RAISE EXCEPTION
      'User % (workspace %) cannot join group % (workspace %)',
      NEW.user_id,
      new_user_workspace,
      NEW.group_id,
      group_workspace;
END IF;

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER group_user_workspace_enforce
BEFORE INSERT OR UPDATE ON bl_rel_group_user
FOR EACH ROW
EXECUTE FUNCTION enforce_single_workspace_per_group();
