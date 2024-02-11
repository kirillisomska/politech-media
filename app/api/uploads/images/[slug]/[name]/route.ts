import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { revalidatePath } from "next/cache";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string; name: string } }
) => {
  try {
    const pathToImage = path.join(
      process.cwd(),
      `${process.env.DEFAULT_IMAGE_FOLDER_PATH}/${params.slug}/${params.name}`
    );

    const file = fs.readFileSync(pathToImage);

    const fileType = path.extname(pathToImage).slice(1);

    revalidatePath("/dashboard/photos");

    return new NextResponse(file, {
      status: 200,
      headers: { "Content-type": `image/${fileType}` },
    });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};
