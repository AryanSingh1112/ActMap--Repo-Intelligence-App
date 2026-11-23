
import { OrganizationProfile } from "@clerk/nextjs";
import { Suspense } from "react";

export default function OrganizationPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <Suspense fallback={<div>Loading organization...</div>}>
        <OrganizationProfile
          routing="path"
          path="/organization"
        />
      </Suspense>
    </div>
  );
}
