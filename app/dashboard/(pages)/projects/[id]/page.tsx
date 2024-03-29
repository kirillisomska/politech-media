import { getAllDirNames } from "@/actions/photos";
import CreateProjectForm from "@/components/projects-page/CreateProjectForm";
import { getAllCustomers } from "@/db/db";
import { db } from "@/services/db";
import { redirect } from "next/navigation";

const getProjectById = async (id: string) => {
  const project = await db.project.findFirst({
    where: { id },
    include: { customers: true, slider: true, socialMediaPosts: true },
  });

  if (!project) {
    redirect("/404");
  }

  return project;
};

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const project = await getProjectById(params.id);
  const customers = await getAllCustomers();
  const dirNames = await getAllDirNames();

  return (
    <div>
      <h1 className="text-gray-600 font-bold text-2xl">Проекты</h1>
      <hr />
      <div className="mt-4">
        <CreateProjectForm
          customers={customers}
          dirNames={dirNames}
          type="update"
          data={project}
        />
      </div>
    </div>
  );
};

export default ProjectPage;
