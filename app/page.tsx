import ProjectsList from "@/components/projects-list/ProjectsList";
import { getAllProjectsWithoutCustomers } from "@/db/db";

import type { Project } from "@prisma/client";

type PropTypes = {
  projects: Project[];
};

export default function Home({ projects }: PropTypes) {
  return (
    <>
      <div className="custom-screen max-w-[1280px] w-[100%] m-auto gap-x-20 items-center md:flex">
        <ProjectsList projects={projects} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const projects = await getAllProjectsWithoutCustomers();

  return {
    props: {
      projects,
    },
  };
}
