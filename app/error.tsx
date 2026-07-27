"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="shell flex min-h-[68vh] flex-col justify-center py-20">
      <p className="eyebrow">Render interrupted</p>
      <h1 className="display-lg mt-8 max-w-5xl">This frame did not resolve.</h1>
      <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
        Try the page again. If the interruption continues, return to the main navigation.
      </p>
      <Button onClick={unstable_retry} className="mt-8 h-11 w-fit rounded-none px-5">
        Try again
      </Button>
    </section>
  );
}
