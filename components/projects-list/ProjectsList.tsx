import { Project } from "@prisma/client";
import Image from "next/image";

import Link from "next/link";

const monthList = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const getAllProjectsComponents = (projects: Project[]) => {
  return projects.map((project) => {
    const date = new Date(project.date);

    return (
      <li className="mb-10 ms-4" key={project.id}>
        <div className="absolute w-3 h-3 bg-[#39AAE1] rounded-full mt-1.5 -start-1.5 border border-white"></div>
        <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{`${
          monthList[date.getMonth()]
        }, ${date.getFullYear()}`}</time>
        <div className="flex md:justify-between md:flex-row flex-col-reverse">
          <div className="md:max-w-[60%]">
            <h2 className="text-lg font-semibold text-gray-900">
              {project.name}
            </h2>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {project.shortDescription}
            </p>
            <Link
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#39AAE1] border border-gray-200 hover:bg-white hover:text-[#39AAE1]"
              href={`/projects/${project.id}`}
            >
              Подробнее
            </Link>
          </div>
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              width={300}
              height={300}
              alt="Картинка проекта"
              className="max-h-[200px] h-full object-cover md:max-w-[35%]"
            />
          ) : null}
        </div>
      </li>
    );
  });
};

const ProjectsList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="w-full">
      <h2 className="mt-10 mb-10 text-gray-900 font-bold text-3xl text-center">Наши проекты</h2>
      <ol className="list-style-color-red relative border-s border-[#39AAE1] max-w-[1000px] w-full mx-auto xl:max-h-[800px] max-h-[400px] overflow-y-scroll">
        {getAllProjectsComponents(projects)}
      </ol>
    </div>
  );
};

export default ProjectsList;
