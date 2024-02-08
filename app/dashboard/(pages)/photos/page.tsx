import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";
import PhotosList from "@/components/PhotosList";

const PhotosPage = () => {
  const handleUpload = async (data: FormData) => {
    "use server";

    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      throw new Error("Cant upload file");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join(
      "./",
      "public",
      `${randomUUID()}.${file.type.split("/")[1]}`
    );
    await writeFile(path, buffer);

    revalidatePath('/dashboard/photos');
    revalidatePath('/dashboard');

    return { path };
  };

  return (
    <div>
      <h1>Фотогалерея</h1>
      <hr />
      <h2>Загрузка фото</h2>
      <form action={handleUpload}>
        <input type="file" name="file" />
        <button type="submit">Загрузить</button>
      </form>
      <hr />
      <h2>Фотографии на сервере</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <PhotosList />
      </div>
    </div>
  );
};

export default PhotosPage;
