import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('customer'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  invitedBy: integer('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp('invited_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}


// --- JOBS
export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  customerId: integer('customer_id').notNull().references(() => users.id),
  createdBy: integer('created_by').references(() => users.id),
  assignedTo: integer('assigned_to').references(() => users.id),
  teamId: integer('team_id').references(() => teams.id),
  status: varchar('status', { length: 50 }).notNull().default('NEW'),
  address: text('address'),
  scheduledAt: timestamp('scheduled_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});



// --- JOB STATUS LOGS
export const jobStatusLogs = pgTable('job_status_logs', {
  id: serial('id').primaryKey(),
  jobId: integer('job_id').notNull().references(() => jobs.id),
  oldStatus: varchar('old_status', { length: 50 }),
  newStatus: varchar('new_status', { length: 50 }).notNull(),
  changedBy: integer('changed_by').references(() => users.id),
  note: text('note'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// --- JOB ATTACHMENTS
export const jobAttachments = pgTable('job_attachments', {
  id: serial('id').primaryKey(),
  jobId: integer('job_id').notNull().references(() => jobs.id),
  uploadedBy: integer('uploaded_by').references(() => users.id),
  url: text('url').notNull(),
  filename: varchar('filename', { length: 255 }),
  contentType: varchar('content_type', { length: 100 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});


export const jobsRelations = relations(jobs, ({ one, many }) => ({
  customer: one(users, { fields: [jobs.customerId], references: [users.id] }),
  assignedUser: one(users, { fields: [jobs.assignedTo], references: [users.id] }),
  team: one(teams, { fields: [jobs.teamId], references: [teams.id] }),
  statusLogs: many(jobStatusLogs),
  attachments: many(jobAttachments),
}));

export const jobStatusLogsRelations = relations(jobStatusLogs, ({ one }) => ({
  job: one(jobs, { fields: [jobStatusLogs.jobId], references: [jobs.id] }),
  changedByUser: one(users, { fields: [jobStatusLogs.changedBy], references: [users.id] }),
}));

export const jobAttachmentsRelations = relations(jobAttachments, ({ one }) => ({
  job: one(jobs, { fields: [jobAttachments.jobId], references: [jobs.id] }),
  uploader: one(users, { fields: [jobAttachments.uploadedBy], references: [users.id] }),
}));
