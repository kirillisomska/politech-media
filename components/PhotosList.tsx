"use server"

import path from "path";
import fs from "fs";

const getAllFileNamesInPublicFolder = () => {
  const publicFolderPath = path.join(process.cwd(), "public");
  const fileNames = fs.readdirSync(publicFolderPath);
  return fileNames;
};

const PhotosList = () => {
  return (
    <>
      {getAllFileNamesInPublicFolder().map((pathToPhoto) => {
        const path = `${process.env.NEXTAUTH_URL}${pathToPhoto}`;
        return (
          <div key={pathToPhoto}>
            <img src={path} alt="Картинка с сервера" />
            <p>{path}</p>
          </div>
        );
      })}
    </>
  );
};

export default PhotosList;
