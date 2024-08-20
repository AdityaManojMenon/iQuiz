import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    serial,
    boolean,
    pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters"; 
import { relations } from "drizzle-orm";

// Define the quizzes table
export const quizzes = pgTable("quizzes", {
    id: serial("id").primaryKey(),
    name: text("name"),
    description: text("description"), 
    userId: text("user_id"),
});

// Define the relationships for the quizzes table
export const quizzesRelations = relations(quizzes, ({ many }) => ({
    questions: many(questions),
}));

// Define the questions table
export const questions = pgTable("questions", {
    id: serial("id").primaryKey(), 
    questionText: text("question_text"), 
    quizzId: integer("quizz_id").references(() => quizzes.id), // Ensure the foreign key references the quizzes table
});

// Define the relationships for the questions table
export const questionsRelations = relations(questions, ({ one, many }) => ({
    quizz: one(quizzes, {
        fields: [questions.quizzId], 
        references: [quizzes.id],
    }),
    answers: many(questionAnswers),
}));

// Define the question answers table
export const questionAnswers = pgTable("question_answers", { // Updated table name to avoid confusion
    id: serial("id").primaryKey(),
    questionId: integer("question_id").references(() => questions.id), // Ensure the foreign key references the questions table
    answerText: text("answer_text"), // Removed the extra space
    isCorrect: boolean("is_correct"),
});

// Define the relationships for the question answers table
export const questionAnswersRelations = relations(questionAnswers, ({ one }) => ({
    question: one(questions, {
        fields: [questionAnswers.questionId],
        references: [questions.id],
    }),
}));
