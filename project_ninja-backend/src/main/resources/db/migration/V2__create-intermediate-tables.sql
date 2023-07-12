CREATE TABLE "users_workspace"
(
    workspace_id BIGINT REFERENCES "workspace" (id),
    user_id      BIGINT REFERENCES "users" (id),
    PRIMARY KEY (workspace_id, user_id)
);

CREATE TABLE "user_task"
(
    task_id BIGINT REFERENCES task (id),
    user_id BIGINT REFERENCES users (id),
    PRIMARY KEY (task_id, user_id)
);
