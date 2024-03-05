-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS template_id_seq;

-- Table Definition
CREATE TABLE "public"."template" (
    "id" int4 NOT NULL DEFAULT nextval('template_id_seq'::regclass),
    "command" varchar(255),
    "params" varchar(255),
    "added_by" int4,
    "added_on" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" int4,
    "updated_on" timestamp(0),
    "is_deleted" int2 DEFAULT 0,
    PRIMARY KEY ("id")
);

SELECT setval('template_id_seq', (SELECT COALESCE(MAX(id), 1) FROM template));