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

const getAllProjectsComponents = (
  projects: {
    id: string;
    date: Date;
    imageUrl: string;
    shortDescription: string;
    name: string;
  }[]
) => {
  return projects.map((project) => (
    <li className="mb-10 ms-4" key={project.id}>
      <div className="absolute w-3 h-3 bg-blue-400 rounded-full mt-1.5 -start-1.5 border border-white"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{`${
        monthList[project.date.getMonth()]
      }, ${project.date.getFullYear()}`}</time>
      {project.imageUrl ? (
        <Image
          src={project.imageUrl}
          width={300}
          height={300}
          alt="Картинка проекта"
        />
      ) : null}
      <h2 className="text-lg font-semibold text-gray-900">{project.name}</h2>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {project.shortDescription}
      </p>
      <Link
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-400 border border-gray-200 rounded-lg hover:bg-white hover:text-blue-400"
        href={`/projects/${project.id}`}
      >
        Подробнее
      </Link>
    </li>
  ));
};

const ProjectsList = ({
  projects,
}: {
  projects: {
    id: string;
    date: Date;
    imageUrl: string;
    shortDescription: string;
    name: string;
  }[];
}) => {
  return (
    <ol className="list-style-color-red relative border-s border-blue-400">
      {getAllProjectsComponents(projects)}
    </ol>
  );
};

export default ProjectsList;
