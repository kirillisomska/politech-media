"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type PropTepes = {
  dirNames: string[];
};

const PhotosList = ({ dirNames }: PropTepes) => {
  const [photosPath, setPhotoPath] = useState<string[]>([]);
  const [dir, setDir] = useState<string>("all");

  useEffect(() => {
    fetch(`/api/photos/${dir}`)
      .then((res) => res.json())
      .then((data) => setPhotoPath(data));
  }, [dir]);

  return (
    <div className="w-full mt-8">
      <h2 className="text-gray-600 font-semibold">Фотографии на сервере</h2>
      <hr className="mb-4" />
      <div className="flex max-w-[500px] w-full gap-3">
        <label
          className="block mb-2 text-sm font-medium text-gray-600"
          htmlFor="dir"
        >
          Выбранная директория
        </label>
        <select
          className="mb-3 w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
          name="dir"
          id="dir"
          onChange={(e) => {
            e.preventDefault();

            setDir(e.target.value);
          }}
        >
          <option value="all" defaultChecked>
            /
          </option>
          {dirNames.map((dirName) => (
            <option key={dirName} value={dirName}>
              {dirName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-5 align-baseline">
        {photosPath.map((pathToPhoto) => {
          return (
              <Image
              key={pathToPhoto}
                onClick={() => navigator.clipboard.writeText(pathToPhoto)}
                src={pathToPhoto}
                alt="Картинка с сервера"
                width={300}
                height={200}
                className="object-cover w-[20%] h-40"
              />
          );
        })}
      </div>
    </div>
  );
};

export default PhotosList;
