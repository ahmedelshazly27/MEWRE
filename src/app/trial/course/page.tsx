import { CourseView } from "@/views/CourseView";

export const metadata = { title: "Trial crash course (print)" };

/** The whole trial crash course on one page, laid out for printing to an A4 PDF. */
export default function Page() {
  return <CourseView />;
}
