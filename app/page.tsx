
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Landing from "../components/landing/Landing";

async function HomeContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const { userId } = await auth();

  if (userId && params.landing === undefined) {
    redirect("/workspace");
  }

  return <Landing />;
}

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<Landing />}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}
