import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list"; // Adjust path if necessary

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  // Map courses to include the 'name' property, using title as a placeholder
  const coursesWithNames = courses.map(course => ({
    ...course,
    name: course.title // Modify this as needed
  }));

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">SUBJECTS</h1>
      <List 
        courses={coursesWithNames} 
        activeCourseId={userProgress?.activeCourseId} 
      />
    </div>
  );
};

export default CoursesPage;
