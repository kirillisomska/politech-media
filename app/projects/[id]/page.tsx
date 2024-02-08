import { db } from "@/services/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";

export async function generateStaticParams() {
  const res = await db.project.findMany();

  return res.map((project) => ({
    slug: project.id,
  }));
}

const getProjectById = async (id: string) => {
  const project = await db.project.findFirst({ where: { id } });

  if (!project) {
    redirect("/404");
  }

  return project;
};

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const project = await getProjectById(params.id);
  return (
    <div>
      <h1>{project.name}</h1>
      <Image
        src={project.imageUrl}
        width={500}
        height={300}
        alt="Картинка проекта"
      />
      <p>{project.date.toString()}</p>
      <Markdown>{project.fullDescription}</Markdown>
    </div>
  );
};

export default ProjectPage;
