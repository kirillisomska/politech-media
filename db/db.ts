import { db } from "@/services/db";
import { unstable_cache } from "next/cache";

export const getAllProjects = unstable_cache(
  async () => {
    return await db.project.findMany({
      orderBy: { date: "desc" },
      include: { customers: true },
    });
  },
  ["projects"],
  {
    tags: ["projects"],
  }
);
