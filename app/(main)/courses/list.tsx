"use client";

import { userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  courses: {
    imageSrc: string;
    title: string;
    id: number;
    name: string;
  }[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
  if (pending) return;
  
  console.log("Clicked on course ID:", id);

  if (id === activeCourseId) {
    console.log("Navigating to /learn");
    return router.push("/learn");
  }

  startTransition(() => {
    upsertUserProgress(id)
      .then(() => console.log("Successfully updated progress for course ID:", id))
      .catch((error) => {
        console.error("Error during upsertUserProgress:", error);
        toast.error("Something went wrong.");
      });
  });
};

  return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={() => onClick(course.id)} // Ensure onClick receives the course.id
          disabled={false}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
