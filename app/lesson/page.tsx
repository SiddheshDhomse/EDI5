import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LessonPage = async () => {

    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [
        lesson,
        userProgress,
    ] = await Promise.all([
        lessonData,
        userProgressData,
    ]);

 if( !userProgress){
        redirect ("/learn");
    };

    const initialPercentage = lesson?.challenges?.length
    ? (lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length) * 100
    : 0;

return (
    <Quiz
        initialLessonId={lesson?.id ?? 0} // Use 0 as a fallback id
        initialLessonChallenges={lesson?.challenges ?? []} // Use an empty array if challenges are missing
        initialHearts={userProgress?.hearts ?? 0} // Use 0 as a fallback for hearts
        initialPercentage={initialPercentage}
    />
);

    
}

export default LessonPage;