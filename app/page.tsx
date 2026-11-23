import { redirect } from "next/navigation";

// The checked-in preview explorer is gone: analyses are stored now, and every
// map lives at /analyses/[id]. The marketing page replaces this in a later phase.
export default function HomePage() {
  redirect("/workspace");
}
