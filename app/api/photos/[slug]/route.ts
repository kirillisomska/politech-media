import path from "path";
import fs from "fs";

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const publicFolderPath = path.join(
      process.cwd(),
      `${process.env.DEFAULT_IMAGE_FOLDER_PATH}/${params.slug}`
    );
    const fileNames = fs.readdirSync(publicFolderPath, { withFileTypes: true });

    const res = fileNames
      .filter((d) => !d.isDirectory())
      .map(
        (d) =>
          `${process.env.NEXTAUTH_URL}api/uploads/images/${params.slug}/${d.name}`
      );

    revalidatePath("/dashboard/photos");

    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};
