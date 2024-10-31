import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding Database");

        // Clear existing data
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challenges);
        await db.delete(schema.lessons);
        await db.delete(schema.units);
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.challengeProgress);

        // Insert courses
        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Computer Networks",
                imageSrc: "/cn.png",
            },
            {
                id: 2,
                title: "Web Technology",
                imageSrc: "/wt.png",
            },
            {
                id: 3,
                title: "Software Design and Modeling",
                imageSrc: "/sdam.png",
            },
            {
                id: 4,
                title: "Design and Development of Algorithms",
                imageSrc: "/daa.png",
            },
        ]);

        // Insert units
        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Basics of Computer Networks",
                order: 1,
            },
        ]);

        // Insert lessons
        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Fundamentals of CN",
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Fundamentals of CN -2",
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Fundamentals of CN",
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Fundamentals of CN -2",
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Fundamentals of CN -2",
            },
        ]);

        // Insert challenges
        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Which of the following is a common protocol used for email transmission?',
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: 'Which of the following is a common protocol used for email transmission?',
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'Which of the following is a LIFO type of Data Structure?',
            },
        ]);

        // Insert challenge options without specifying the id
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                correct: true,
                text: "SMTP",
            },
            {
                challengeId: 1,
                correct: false,
                text: "HTTP",
            },
            {
                challengeId: 1,
                correct: false,
                text: "FTP",
            },
            {
                challengeId: 2,
                correct: true,
                text: "SMTP",
            },
            {
                challengeId: 2,
                correct: false,
                text: "HTTP",
            },
            {
                challengeId: 2,
                correct: false,
                text: "FTP",
            },
            {
                challengeId: 3,
                correct: false,
                text: "Array",
            },
            {
                challengeId: 3,
                correct: false,
                text: "Queue",
            },
            {
                challengeId: 3,
                correct: true,
                text: "Stack",
            },
        ]);


        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2,
                type: "SELECT",
                order: 1,
                question: 'Which of the following is a common protocol used for email transmission?',
            },
            {
                id: 5,
                lessonId: 2,
                type: "ASSIST",
                order: 2,
                question: 'Which of the following is a common protocol used for email transmission?',
            },
            {
                id: 6,
                lessonId: 2,
                type: "SELECT",
                order: 3,
                question: 'Which of the following is a LIFO type of Data Structure?',
            },
        ]);

        console.log("Seeding Finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed Database");
    }
};

main();
