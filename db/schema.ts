import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  stripeCustomerId: text("stripe_customer_id").unique().notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  stripeSessionId: text("stripe_session_id").unique().notNull(),
  status: text("status").notNull().default("pending"),
  tokenHash: text("token_hash"),
  tokenUsedAt: timestamp("token_used_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const coachProfiles = pgTable("coach_profiles", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .unique()
    .references(() => orders.id),
  name: text("name").notNull(),
  whatsappPhone: text("whatsapp_phone").notNull(),
  coachingTone: text("coaching_tone").notNull().default("professional"),
  manageSecret: text("manage_secret").unique().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  coachProfileId: integer("coach_profile_id")
    .notNull()
    .references(() => coachProfiles.id),
  name: text("name").notNull(),
  whatsappPhone: text("whatsapp_phone").notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
