import ProjectsList from "@/components/projects-list/ProjectsList";
import { getAllProjects } from "@/db/db";

export default async function Home() {
  const projects = (await getAllProjects()).filter((project) => !project.hidden);

  return (
    <>
      <div className="custom-screen max-w-[1280px] w-[100%] m-auto gap-x-20 items-center md:flex">
        <ProjectsList projects={projects} />
      </div>
    </>
  );
}
