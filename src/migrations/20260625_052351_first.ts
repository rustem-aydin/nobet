import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_personnel_role" AS ENUM('admin', 'chief', 'member');
  CREATE TYPE "public"."enum_duty_types_year_configs_year" AS ENUM('2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040');
  CREATE TYPE "public"."enum_duty_types_sort_order" AS ENUM('normal', 'reverse');
  CREATE TYPE "public"."enum_duty_schedule_status" AS ENUM('draft', 'scheduled', 'completed');
  CREATE TYPE "public"."enum_duty_exceptions_status" AS ENUM('approved', 'pending', 'rejected');
  CREATE TYPE "public"."enum_duty_exceptions_types_type" AS ENUM('official', 'unofficial');
  CREATE TYPE "public"."enum_duty_swap_requests_type" AS ENUM('mutual', 'unilateral');
  CREATE TYPE "public"."enum_duty_swap_requests_status" AS ENUM('pending', 'approved', 'rejected');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'completeDailyDuties');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'completeDailyDuties');
  CREATE TABLE "personnel_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "personnel" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"rank" numeric,
  	"group_id" integer NOT NULL,
  	"aktif" boolean DEFAULT true,
  	"role" "enum_personnel_role" DEFAULT 'member',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"chief_id" integer,
  	"cooldown_days" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "duty_types_year_configs_cron_schedules" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cron" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "duty_types_year_configs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" "enum_duty_types_year_configs_year" NOT NULL,
  	"is_active" boolean DEFAULT true
  );
  
  CREATE TABLE "duty_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"priority" numeric DEFAULT 10 NOT NULL,
  	"column_order" numeric NOT NULL,
  	"sort_order" "enum_duty_types_sort_order" DEFAULT 'normal' NOT NULL,
  	"color" varchar NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "duty_schedule" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"swap_request_id" integer,
  	"personnel_id" integer NOT NULL,
  	"duty_type_id" integer NOT NULL,
  	"duty_date" timestamp(3) with time zone NOT NULL,
  	"status" "enum_duty_schedule_status" DEFAULT 'scheduled' NOT NULL,
  	"is_offical" boolean,
  	"group_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "duty_exceptions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"personnel_id" integer NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"reason" varchar NOT NULL,
  	"exceptions_type_id" integer NOT NULL,
  	"status" "enum_duty_exceptions_status" DEFAULT 'pending' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "duty_exceptions_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_duty_exceptions_types_type" NOT NULL,
  	"color" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "duty_swap_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"requester_personnel_id" integer NOT NULL,
  	"requester_duty_id" integer NOT NULL,
  	"type" "enum_duty_swap_requests_type" NOT NULL,
  	"target_personnel_id" integer,
  	"target_duty_id" integer,
  	"status" "enum_duty_swap_requests_status" DEFAULT 'pending' NOT NULL,
  	"approved_by_id" integer,
  	"approved_at" timestamp(3) with time zone,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "personnel_duty_counts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"personnel_id" integer NOT NULL,
  	"duty_type_id" integer NOT NULL,
  	"count" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"meta" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"personnel_id" integer,
  	"groups_id" integer,
  	"duty_types_id" integer,
  	"duty_schedule_id" integer,
  	"duty_exceptions_id" integer,
  	"duty_exceptions_types_id" integer,
  	"duty_swap_requests_id" integer,
  	"personnel_duty_counts_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"personnel_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_jobs_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stats" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "personnel_sessions" ADD CONSTRAINT "personnel_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."personnel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "personnel" ADD CONSTRAINT "personnel_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "groups" ADD CONSTRAINT "groups_chief_id_personnel_id_fk" FOREIGN KEY ("chief_id") REFERENCES "public"."personnel"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_types_year_configs_cron_schedules" ADD CONSTRAINT "duty_types_year_configs_cron_schedules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."duty_types_year_configs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "duty_types_year_configs" ADD CONSTRAINT "duty_types_year_configs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."duty_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "duty_schedule" ADD CONSTRAINT "duty_schedule_swap_request_id_duty_swap_requests_id_fk" FOREIGN KEY ("swap_request_id") REFERENCES "public"."duty_swap_requests"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_schedule" ADD CONSTRAINT "duty_schedule_personnel_id_personnel_id_fk" FOREIGN KEY ("personnel_id") REFERENCES "public"."personnel"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_schedule" ADD CONSTRAINT "duty_schedule_duty_type_id_duty_types_id_fk" FOREIGN KEY ("duty_type_id") REFERENCES "public"."duty_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_schedule" ADD CONSTRAINT "duty_schedule_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_exceptions" ADD CONSTRAINT "duty_exceptions_personnel_id_personnel_id_fk" FOREIGN KEY ("personnel_id") REFERENCES "public"."personnel"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_exceptions" ADD CONSTRAINT "duty_exceptions_exceptions_type_id_duty_exceptions_types_id_fk" FOREIGN KEY ("exceptions_type_id") REFERENCES "public"."duty_exceptions_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_swap_requests" ADD CONSTRAINT "duty_swap_requests_requester_personnel_id_personnel_id_fk" FOREIGN KEY ("requester_personnel_id") REFERENCES "public"."personnel"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_swap_requests" ADD CONSTRAINT "duty_swap_requests_requester_duty_id_duty_schedule_id_fk" FOREIGN KEY ("requester_duty_id") REFERENCES "public"."duty_schedule"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_swap_requests" ADD CONSTRAINT "duty_swap_requests_target_personnel_id_personnel_id_fk" FOREIGN KEY ("target_personnel_id") REFERENCES "public"."personnel"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_swap_requests" ADD CONSTRAINT "duty_swap_requests_target_duty_id_duty_schedule_id_fk" FOREIGN KEY ("target_duty_id") REFERENCES "public"."duty_schedule"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duty_swap_requests" ADD CONSTRAINT "duty_swap_requests_approved_by_id_personnel_id_fk" FOREIGN KEY ("approved_by_id") REFERENCES "public"."personnel"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "personnel_duty_counts" ADD CONSTRAINT "personnel_duty_counts_personnel_id_personnel_id_fk" FOREIGN KEY ("personnel_id") REFERENCES "public"."personnel"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "personnel_duty_counts" ADD CONSTRAINT "personnel_duty_counts_duty_type_id_duty_types_id_fk" FOREIGN KEY ("duty_type_id") REFERENCES "public"."duty_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_personnel_fk" FOREIGN KEY ("personnel_id") REFERENCES "public"."personnel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_groups_fk" FOREIGN KEY ("groups_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_duty_types_fk" FOREIGN KEY ("duty_types_id") REFERENCES "public"."duty_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_duty_schedule_fk" FOREIGN KEY ("duty_schedule_id") REFERENCES "public"."duty_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_duty_exceptions_fk" FOREIGN KEY ("duty_exceptions_id") REFERENCES "public"."duty_exceptions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_duty_exceptions_types_fk" FOREIGN KEY ("duty_exceptions_types_id") REFERENCES "public"."duty_exceptions_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_duty_swap_requests_fk" FOREIGN KEY ("duty_swap_requests_id") REFERENCES "public"."duty_swap_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_personnel_duty_counts_fk" FOREIGN KEY ("personnel_duty_counts_id") REFERENCES "public"."personnel_duty_counts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_personnel_fk" FOREIGN KEY ("personnel_id") REFERENCES "public"."personnel"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "personnel_sessions_order_idx" ON "personnel_sessions" USING btree ("_order");
  CREATE INDEX "personnel_sessions_parent_id_idx" ON "personnel_sessions" USING btree ("_parent_id");
  CREATE INDEX "personnel_group_idx" ON "personnel" USING btree ("group_id");
  CREATE INDEX "personnel_updated_at_idx" ON "personnel" USING btree ("updated_at");
  CREATE INDEX "personnel_created_at_idx" ON "personnel" USING btree ("created_at");
  CREATE UNIQUE INDEX "personnel_email_idx" ON "personnel" USING btree ("email");
  CREATE UNIQUE INDEX "groups_name_idx" ON "groups" USING btree ("name");
  CREATE INDEX "groups_chief_idx" ON "groups" USING btree ("chief_id");
  CREATE INDEX "groups_updated_at_idx" ON "groups" USING btree ("updated_at");
  CREATE INDEX "groups_created_at_idx" ON "groups" USING btree ("created_at");
  CREATE INDEX "duty_types_year_configs_cron_schedules_order_idx" ON "duty_types_year_configs_cron_schedules" USING btree ("_order");
  CREATE INDEX "duty_types_year_configs_cron_schedules_parent_id_idx" ON "duty_types_year_configs_cron_schedules" USING btree ("_parent_id");
  CREATE INDEX "duty_types_year_configs_order_idx" ON "duty_types_year_configs" USING btree ("_order");
  CREATE INDEX "duty_types_year_configs_parent_id_idx" ON "duty_types_year_configs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "duty_types_column_order_idx" ON "duty_types" USING btree ("column_order");
  CREATE INDEX "duty_types_updated_at_idx" ON "duty_types" USING btree ("updated_at");
  CREATE INDEX "duty_types_created_at_idx" ON "duty_types" USING btree ("created_at");
  CREATE INDEX "duty_schedule_swap_request_idx" ON "duty_schedule" USING btree ("swap_request_id");
  CREATE INDEX "duty_schedule_personnel_idx" ON "duty_schedule" USING btree ("personnel_id");
  CREATE INDEX "duty_schedule_duty_type_idx" ON "duty_schedule" USING btree ("duty_type_id");
  CREATE INDEX "duty_schedule_group_idx" ON "duty_schedule" USING btree ("group_id");
  CREATE INDEX "duty_schedule_updated_at_idx" ON "duty_schedule" USING btree ("updated_at");
  CREATE INDEX "duty_schedule_created_at_idx" ON "duty_schedule" USING btree ("created_at");
  CREATE UNIQUE INDEX "dutyDate_dutyType_group_isOffical_personnel_idx" ON "duty_schedule" USING btree ("duty_date","duty_type_id","group_id","is_offical","personnel_id");
  CREATE INDEX "personnel_dutyDate_idx" ON "duty_schedule" USING btree ("personnel_id","duty_date");
  CREATE INDEX "group_dutyDate_idx" ON "duty_schedule" USING btree ("group_id","duty_date");
  CREATE INDEX "duty_exceptions_personnel_idx" ON "duty_exceptions" USING btree ("personnel_id");
  CREATE INDEX "duty_exceptions_exceptions_type_idx" ON "duty_exceptions" USING btree ("exceptions_type_id");
  CREATE INDEX "duty_exceptions_updated_at_idx" ON "duty_exceptions" USING btree ("updated_at");
  CREATE INDEX "duty_exceptions_created_at_idx" ON "duty_exceptions" USING btree ("created_at");
  CREATE INDEX "personnel_startDate_idx" ON "duty_exceptions" USING btree ("personnel_id","start_date");
  CREATE UNIQUE INDEX "duty_exceptions_types_name_idx" ON "duty_exceptions_types" USING btree ("name");
  CREATE INDEX "duty_exceptions_types_updated_at_idx" ON "duty_exceptions_types" USING btree ("updated_at");
  CREATE INDEX "duty_exceptions_types_created_at_idx" ON "duty_exceptions_types" USING btree ("created_at");
  CREATE INDEX "duty_swap_requests_requester_personnel_idx" ON "duty_swap_requests" USING btree ("requester_personnel_id");
  CREATE INDEX "duty_swap_requests_requester_duty_idx" ON "duty_swap_requests" USING btree ("requester_duty_id");
  CREATE INDEX "duty_swap_requests_target_personnel_idx" ON "duty_swap_requests" USING btree ("target_personnel_id");
  CREATE INDEX "duty_swap_requests_target_duty_idx" ON "duty_swap_requests" USING btree ("target_duty_id");
  CREATE INDEX "duty_swap_requests_approved_by_idx" ON "duty_swap_requests" USING btree ("approved_by_id");
  CREATE INDEX "duty_swap_requests_updated_at_idx" ON "duty_swap_requests" USING btree ("updated_at");
  CREATE INDEX "duty_swap_requests_created_at_idx" ON "duty_swap_requests" USING btree ("created_at");
  CREATE INDEX "personnel_duty_counts_personnel_idx" ON "personnel_duty_counts" USING btree ("personnel_id");
  CREATE INDEX "personnel_duty_counts_duty_type_idx" ON "personnel_duty_counts" USING btree ("duty_type_id");
  CREATE INDEX "personnel_duty_counts_updated_at_idx" ON "personnel_duty_counts" USING btree ("updated_at");
  CREATE INDEX "personnel_duty_counts_created_at_idx" ON "personnel_duty_counts" USING btree ("created_at");
  CREATE UNIQUE INDEX "personnel_dutyType_idx" ON "personnel_duty_counts" USING btree ("personnel_id","duty_type_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_personnel_id_idx" ON "payload_locked_documents_rels" USING btree ("personnel_id");
  CREATE INDEX "payload_locked_documents_rels_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("groups_id");
  CREATE INDEX "payload_locked_documents_rels_duty_types_id_idx" ON "payload_locked_documents_rels" USING btree ("duty_types_id");
  CREATE INDEX "payload_locked_documents_rels_duty_schedule_id_idx" ON "payload_locked_documents_rels" USING btree ("duty_schedule_id");
  CREATE INDEX "payload_locked_documents_rels_duty_exceptions_id_idx" ON "payload_locked_documents_rels" USING btree ("duty_exceptions_id");
  CREATE INDEX "payload_locked_documents_rels_duty_exceptions_types_id_idx" ON "payload_locked_documents_rels" USING btree ("duty_exceptions_types_id");
  CREATE INDEX "payload_locked_documents_rels_duty_swap_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("duty_swap_requests_id");
  CREATE INDEX "payload_locked_documents_rels_personnel_duty_counts_id_idx" ON "payload_locked_documents_rels" USING btree ("personnel_duty_counts_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_personnel_id_idx" ON "payload_preferences_rels" USING btree ("personnel_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "personnel_sessions" CASCADE;
  DROP TABLE "personnel" CASCADE;
  DROP TABLE "groups" CASCADE;
  DROP TABLE "duty_types_year_configs_cron_schedules" CASCADE;
  DROP TABLE "duty_types_year_configs" CASCADE;
  DROP TABLE "duty_types" CASCADE;
  DROP TABLE "duty_schedule" CASCADE;
  DROP TABLE "duty_exceptions" CASCADE;
  DROP TABLE "duty_exceptions_types" CASCADE;
  DROP TABLE "duty_swap_requests" CASCADE;
  DROP TABLE "personnel_duty_counts" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "payload_jobs_stats" CASCADE;
  DROP TYPE "public"."enum_personnel_role";
  DROP TYPE "public"."enum_duty_types_year_configs_year";
  DROP TYPE "public"."enum_duty_types_sort_order";
  DROP TYPE "public"."enum_duty_schedule_status";
  DROP TYPE "public"."enum_duty_exceptions_status";
  DROP TYPE "public"."enum_duty_exceptions_types_type";
  DROP TYPE "public"."enum_duty_swap_requests_type";
  DROP TYPE "public"."enum_duty_swap_requests_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
