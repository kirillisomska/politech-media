"use client";

import { Project } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

type PropsTypes = {
  projects: Project[];
};

const ProjectsTable = ({ projects }: PropsTypes) => {
  const [projectsList, setProjectsList] = useState(projects);
  const [filters, setFilters] = useState({
    hidden: false,
    dateFilter: "desc",
  });

  const handleStatusClick = () => {
    const filteredProjects = projects.filter((project) =>
      filters.hidden ? project.hidden : !project.hidden
    );

    setProjectsList(filteredProjects);

    const updatedFilters = { ...filters, hidden: !filters.hidden };
    setFilters(updatedFilters);
  };

  const handleDataClick = () => {
    const sortedProjects = [...projectsList].sort((a, b) =>
      filters.dateFilter === "desc"
        ? new Date(a.date.toString()).getTime() - new Date(b.date.toString()).getTime() 
        : new Date(b.date.toString()).getTime()  - new Date(a.date.toString()).getTime() 
    );
    setProjectsList(sortedProjects);

    const updatedFilters = {
      ...filters,
      dateFilter: filters.dateFilter === "desc" ? "asc" : "desc",
    };
    setFilters(updatedFilters);
  };

  return (
    <div>
      <h2 className="text-gray-600 font-semibold mt-4 mb-2">Таблица проектов</h2>
      <div className="relative h-max overflow-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 pr-6">Название</th>
              <th
                className="py-3 pr-6 cursor-pointer"
                onClick={handleDataClick}
              >
                Дата
              </th>
              <th className="py-3 pr-6">Короткое описание</th>
              <th
                className="py-3 pr-6 cursor-pointer"
                onClick={handleStatusClick}
              >
                Статус
              </th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {projectsList.map((item) => (
              <tr key={item.id}>
                <td className="pr-6 py-4 whitespace-nowrap">{item.name.substring(0, 20)}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {item.date.toLocaleString().split("T")[0]}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {item.shortDescription.substring(0, 20)}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      !item.hidden
                        ? "text-green-600 bg-green-50"
                        : "text-blue-600 bg-blue-50"
                    }`}
                  >
                    {item.hidden ? "Скрыт" : "Активен"}
                  </span>
                </td>
                <td className="text-right whitespace-nowrap flex gap-1 justify-end items-center py-4">
                  <Link
                    href={`/dashboard/projects/${item.id}`}
                    className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                  >
                    Редактировать
                  </Link>
                  <Link
                    href={`/projects/${item.id}`}
                    className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                  >
                    Страница
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
