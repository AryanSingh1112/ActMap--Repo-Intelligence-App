
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SignUp />
      </Suspense>
    </main>
  );
}
