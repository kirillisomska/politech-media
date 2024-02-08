import { db } from "@/services/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const {
      name,
      shortDescription,
      imageUrl,
      date,
      fullDescription,
    }: {
      name: string;
      shortDescription: string;
      imageUrl: string;
      date: string;
      fullDescription: string;
    } = await req.json();

    const createdProject = await db.project.create({
      data: {
        name,
        shortDescription,
        imageUrl,
        fullDescription,
        date: new Date(date),
      },
    });

    revalidatePath('/');

    return NextResponse.json(createdProject, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};
