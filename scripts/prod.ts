import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Data Structures", imageSrc: "" },
      ])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Introduction to ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Advanced ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Arrays", order: 1 },
            { unitId: unit.id, title: "Linked Lists", order: 2 },
            { unitId: unit.id, title: "Stacks", order: 3 },
            { unitId: unit.id, title: "Queues", order: 4 },
            { unitId: unit.id, title: "Trees", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which data structure is best for Last-In-First-Out (LIFO) operations?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which data structure is best for First-In-First-Out (FIFO) operations?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What is a key characteristic of arrays?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: 'Explain the purpose of a "Stack".',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which data structure uses nodes with pointers?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which data structure allows hierarchical data representation?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which data structure is optimal for balanced searching?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: 'Describe a scenario where you would use a "Queue".',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: true, text: "Stack" },
                { challengeId: challenge.id, correct: false, text: "Queue" },
                { challengeId: challenge.id, correct: false, text: "Array" },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: true, text: "Queue" },
                { challengeId: challenge.id, correct: false, text: "Stack" },
                { challengeId: challenge.id, correct: false, text: "Linked List" },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: true, text: "Fixed size" },
                { challengeId: challenge.id, correct: false, text: "Flexible structure" },
                { challengeId: challenge.id, correct: false, text: "Self-referential nodes" },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: true, text: "Linked List" },
                { challengeId: challenge.id, correct: false, text: "Array" },
                { challengeId: challenge.id, correct: false, text: "Stack" },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: true, text: "Tree" },
                { challengeId: challenge.id, correct: false, text: "Queue" },
                { challengeId: challenge.id, correct: false, text: "Array" },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: true, text: "Binary Search Tree" },
                { challengeId: challenge.id, correct: false, text: "Stack" },
                { challengeId: challenge.id, correct: false, text: "Queue" },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
