"use client";

import { createDir } from "@/actions/photos";
import { useRef } from "react";
import UploadButton from "./UploadButton";

const CreateDirForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleForm = async (data: FormData) => {
    formRef.current?.reset();

    await createDir(data);
  };

  return (
    <div className="w-full">
      <h2 className="text-gray-600 font-semibold my-4">Работа с папками</h2>
      <form ref={formRef} action={handleForm}>
        <label
          className="block mb-2 text-sm font-medium text-gray-600"
          htmlFor="dirName"
        >
          Название папки
        </label>
        <input
          className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
          type="text"
          name="dirName"
          id="dirName"
          placeholder="Проект-1"
        />
        <UploadButton defaultText="Создать" pendingText="Создание папки ..." />
      </form>
    </div>
  );
};

export default CreateDirForm;
