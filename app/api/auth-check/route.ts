
import { auth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export async function GET() {
  const { userId, orgId, orgRole } = await auth();

  if (!userId) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!orgId) {
    return Response.json(
      { error: "No active organization selected" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.rpc(
      "actmap_auth_check"
    );

    if (error) {
      console.error("Supabase auth check failed:", error);

      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const result = {
      clerk: {
        userId,
        orgId,
        orgRole,
      },
      supabase: data,
    };

    console.log("ACTMAP AUTH CHECK:", result);

    return Response.json(result);
  } catch (error) {
    console.error("Auth check failed:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}
