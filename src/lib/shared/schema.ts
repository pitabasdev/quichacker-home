import { pgTable, text, serial, integer, boolean, timestamp, pgEnum, json, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User role enum
export const userRoleEnum = pgEnum('user_role', ['admin', 'participant', 'mentor', 'judge']);

// User authentication types
export const authProviderEnum = pgEnum('auth_provider', ['local', 'github']);

// Project submission status
export const submissionStatusEnum = pgEnum('submission_status', ['draft', 'submitted', 'under_review', 'accepted', 'rejected']);

// Team status enum
export const teamStatusEnum = pgEnum('team_status', ['pending', 'approved', 'rejected']);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password"),
  role: userRoleEnum("role").default('participant').notNull(),
  authProvider: authProviderEnum("auth_provider").default('local').notNull(),
  authProviderId: text("auth_provider_id"),
  profilePicture: text("profile_picture"),
  name: text("name"),
  bio: text("bio"),
  githubUsername: text("github_username"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Teams table
export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  repositoryUrl: text("repository_url"),
  teamSize: integer("team_size").default(1),
  lookingForMembers: boolean("looking_for_members").default(false),
  problemId: integer("problem_id"),
  status: teamStatusEnum("status").default('pending').notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Gender enum
export const genderEnum = pgEnum('gender', ['male', 'female', 'other']);

// Team members junction table
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").notNull().references(() => teams.id, { onDelete: 'cascade' }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  isLeader: boolean("is_leader").default(false),
  gender: genderEnum("gender").default('other'),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

// Problems table
export const problems = pgTable("problems", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  difficulty: integer("difficulty").notNull(),
  prize: text("prize").notNull(),
  color: text("color").notNull(),
  requirements: json("requirements"),
  resources: json("resources"),
  timeline: json("timeline"),
  evaluation: json("evaluation"),
  faqs: json("faqs"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Project submissions table
export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").notNull().references(() => teams.id, { onDelete: 'cascade' }),
  problemId: integer("problem_id").notNull().references(() => problems.id, { onDelete: 'cascade' }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  repositoryUrl: text("repository_url").notNull(),
  demoUrl: text("demo_url"),
  technologies: json("technologies"),
  screenshots: json("screenshots"),
  status: submissionStatusEnum("status").default('draft').notNull(),
  feedback: text("feedback"),
  score: decimal("score", { precision: 5, scale: 2 }),
  submittedAt: timestamp("submitted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Reviews table for judging submissions
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").notNull().references(() => submissions.id, { onDelete: 'cascade' }),
  reviewerId: integer("reviewer_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  technicalScore: decimal("technical_score", { precision: 5, scale: 2 }),
  creativityScore: decimal("creativity_score", { precision: 5, scale: 2 }),
  usabilityScore: decimal("usability_score", { precision: 5, scale: 2 }),
  completenessScore: decimal("completeness_score", { precision: 5, scale: 2 }),
  overallScore: decimal("overall_score", { precision: 5, scale: 2 }),
  comments: text("comments"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Create insert schemas for each table
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  role: true,
  authProvider: true,
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  joinedAt: true,
});

export const insertProblemSchema = createInsertSchema(problems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  submittedAt: true,
  status: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Define types for our models
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Problem = typeof problems.$inferSelect;

export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof submissions.$inferSelect;

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
