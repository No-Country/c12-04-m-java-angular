CREATE TABLE "users"
(
    id                BIGSERIAL    NOT NULL PRIMARY KEY,
    name              VARCHAR(100) NOT NULL,
    email             VARCHAR(100) NOT NULL UNIQUE,
    password          VARCHAR(255)  NOT NULL,
    team_rol          VARCHAR(20)  NOT NULL
);

CREATE TABLE "workspace"
(
    id           BIGSERIAL NOT NULL PRIMARY KEY,
    name_workspace VARCHAR(50),
    description  VARCHAR(255)
);

CREATE TABLE "space"
(
    id          BIGSERIAL NOT NULL PRIMARY KEY,
    name_space  VARCHAR(50),
    description VARCHAR(255),
    workspace   BIGINT    NOT NULL
);

CREATE TABLE "task"
(
    id          BIGSERIAL NOT NULL PRIMARY KEY,
    name_task   VARCHAR(50),
    description VARCHAR(100),
    due_date    DATE,
    priority    BIGINT,
    space       BIGINT  NOT NULL,
    status      BOOLEAN
);

CREATE TABLE "priority"
(
    id          BIGSERIAL NOT NULL PRIMARY KEY,
    name_priority   VARCHAR(50) NOT NULL
);