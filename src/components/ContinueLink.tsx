"use client";

import { useT } from "@/lib/useLang";
import Link from "next/link";
import { useFirstOpenLesson } from "@/components/progress";

export function ContinueLink({ moduleId, lessonIds, className, children }: { moduleId: string; lessonIds: string[]; className?: string; children: React.ReactNode }) {
  const target = useFirstOpenLesson(lessonIds);
  const { href } = useT();
  return (
    <Link href={href(`/learn/${moduleId}/${target}`)} className={className}>
      {children}
    </Link>
  );
}
