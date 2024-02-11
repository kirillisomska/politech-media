import PhotosList from "@/components/photos-page/PhotosList";
import { createDir, getAllDirNames } from "@/actions/photos";
import UploadImageForm from "@/components/photos-page/UploadImageForm";
import CreateDirForm from "@/components/photos-page/CreateDirForm";

const PhotosPage = async () => {
  const dirNames = await getAllDirNames();

  return (
    <div>
      <h1 className="text-gray-600 font-bold text-2xl">Фотогалерея</h1>
      <hr />
      <div className="flex gap-8 w-full mb-4">
        <UploadImageForm dirNames={dirNames} />
        <CreateDirForm />
      </div>
      <PhotosList dirNames={dirNames} />
    </div>
  );
};

export default PhotosPage;
