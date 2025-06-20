import { relations } from "drizzle-orm";
import {
  int,
  timestamp,
  mysqlTable,
  varchar,
  boolean,
  text,
} from "drizzle-orm/mysql-core";

export const sessionTable = mysqlTable("session_table", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id),
  valid: boolean().default(true).notNull(),
  userAgent: text("user_agent").notNull(),
  ip: varchar("user_ip", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const usersTable = mysqlTable("users_table", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

const usersTableRelation = relations(usersTable, ({ many }) => ({
  session: many(sessionTable),
}));

const sessionTableRelation = relations(sessionTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionTable.userId],
    references: [usersTable.id],
  }),
}));
