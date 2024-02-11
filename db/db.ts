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

export const getAllProjectsWithoutCustomers = unstable_cache(
  async () => {
    return await db.project.findMany({
      orderBy: { date: "desc" },
      where: { hidden: false },
    });
  },
  ["projects"],
  {
    tags: ["projects"],
  }
);

export const getAllCustomers = unstable_cache(
  async () => {
    return await db.customer.findMany({
      include: { projects: true },
    });
  },
  ["customers"],
  {
    tags: ["customers"],
  }
);
