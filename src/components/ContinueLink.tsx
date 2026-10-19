"use client";

import Link from "next/link";
import { useFirstOpenLesson } from "@/components/progress";

export function ContinueLink({ moduleId, lessonIds, className, children }: { moduleId: string; lessonIds: string[]; className?: string; children: React.ReactNode }) {
  const target = useFirstOpenLesson(lessonIds);
  return (
    <Link href={`/learn/${moduleId}/${target}`} className={className}>
      {children}
    </Link>
  );
}
