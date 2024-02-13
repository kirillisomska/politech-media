import { getAllProjects } from "@/db/db";
import { db } from "@/services/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const getProjectById = async (id: string) => {
  const project = await db.project.findFirst({ where: { id } });

  if (!project) {
    redirect("/404");
  }

  return project;
};

const ProjectPage = async ({ params: {id} }: { params: { id: string } }) => {
  const project = await getProjectById(id);
  const session = await getServerSession();

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4">
      {session?.user?.email && project.hidden ? (
        <h2>Проект скрыт и не виден пользователям с главной страницы!</h2>
      ) : null}
      <h1>{project.name}</h1>
      <Image
        src={project.imageUrl}
        width={500}
        height={300}
        alt="Картинка проекта"
      />
      <p>{project.date.toString()}</p>
      <Markdown rehypePlugins={[rehypeRaw]}>{project.fullDescription}</Markdown>

      {session?.user?.email ? (
        <Link href={`/dashboard/projects/${id}`}>Обновить</Link>
      ) : null}
    </div>
  );
};

export default ProjectPage;

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project) => ({ id: project.id }));
}
