"use client";

import { uploadImages } from "@/actions/photos";
import { useRef } from "react";
import UploadButton from "./UploadButton";

type PropTypes = {
  dirNames: string[];
};

const UploadImageForm = ({ dirNames }: PropTypes) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleForm = async (data: FormData) => {
    formRef.current?.reset();

    await uploadImages(data);
  };

  return (
    <div className="w-full">
      <h2 className="text-gray-600 font-semibold my-4">Загрузка фото</h2>
      <form ref={formRef} action={handleForm}>
        <label
          className="block mb-2 text-sm font-medium text-gray-600"
          htmlFor="dir"
        >
          Папка для фото
        </label>
        <select
          name="dir"
          id="dir"
          required
          className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
        >
          {dirNames.map((dirName) => (
            <option key={dirName} value={dirName}>
              {dirName}
            </option>
          ))}
        </select>

        <label
          className="mt-3 block mb-2 text-sm font-medium text-gray-600"
          htmlFor="file"
        >
          Загружаемые файлы
        </label>
        <input
          className="file:text-white file:drop-shadow-md file:bg-blue-600 file:hover:bg-blue-500 file:border-0 hover:file:cursor-pointer w-full file:px-3 file:py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
          type="file"
          name="file"
          id="file"
          required
          multiple
        />
        <UploadButton defaultText="Загрузить" pendingText="Загрузка фотографий ..."/>
      </form>
    </div>
  );
};

export default UploadImageForm;
