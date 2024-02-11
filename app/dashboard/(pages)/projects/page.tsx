import ProjectsTable from "@/components/projects-page/ProjectsTable";
import { db } from "@/services/db";
import Link from "next/link";

const ProjectsPage = async () => {
  const projectsList = await db.project.findMany();

  return (
    <div>
      <h1 className="text-gray-600 font-bold text-2xl">Проекты</h1>
      <hr />
      <div className="mt-4">
        <div className="flex justify-end">
          <Link
            href="/dashboard/projects/create"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Создать проект
          </Link>
        </div>

        <ProjectsTable projects={projectsList} />
      </div>
    </div>
  );
};

export default ProjectsPage;
