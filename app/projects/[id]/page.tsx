import { getAllProjects } from "@/db/db";
import { db } from "@/services/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import SliderComponent from "@/components/detail-page/SliderComponent";

const getProjectById = async (id: string) => {
  const project = await db.project.findFirst({
    where: { id },
    include: { customers: true, slider: true },
  });

  if (!project) {
    redirect("/404");
  }

  return project;
};

const ProjectPage = async ({ params: { id } }: { params: { id: string } }) => {
  const project = await getProjectById(id);
  const session = await getServerSession();

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4">
      <hr className="mb-12" />
      {session?.user?.email && project.hidden ? (
        <h2 className="text-red-900 font-medium text-4xl my-5 mx-auto">
          Проект скрыт и не виден пользователям с главной страницы!
        </h2>
      ) : null}
      <div className="w-full flex gap-4 mb-4">
        <div className="grow-[2] shrink-[3] w-full">
          <Link
            href="/"
            className="block w-[75px] text-center border px-2 py-1 border-gray-400 rounded-3xl"
          >
            Назад
          </Link>
          {session?.user?.email ? (
            <Link
              className="block w-[110px] mt-2 text-white bg-orange-600 hover:bg-orange-500 ring-offset-2 ring-orange-600 focus:ring shadow rounded-lg px-4 py-2.5 font-medium text-sm text-center duration-150"
              href={`/dashboard/projects/${id}`}
            >
              Обновить
            </Link>
          ) : null}
        </div>
        <div className="w-full grow-[4] shrink-[1] border-r border-gray-400 pr-4">
          <h1 className="text-gray-900 font-medium text-4xl">{project.name}</h1>
          <p className="text-gray-600 pt-2 italic">
            {project.shortDescription}
          </p>
        </div>
        <div className="w-full grow-[2] shrink-[3]">
          {project.customers.length ? (
            <>
              <h2 className="text-gray-900 font-medium text-l mb-2">{`Заказчик${
                project.customers.length !== 1 ? "и" : ""
              }`}</h2>
              <div className="flex flex-col gap-2">
                {project.customers.map((customer) => (
                  <Link
                    key={customer.id}
                    href={customer.contacts}
                    target="_blank"
                  >
                    <Image
                      src={customer.imageUrl}
                      alt={customer.name}
                      title={customer.name}
                      width={100}
                      height={50}
                    />
                  </Link>
                ))}
              </div>
            </>
          ) : null}
          <h2 className="text-gray-900 font-medium text-l my-2">Дата</h2>
          <p className="text-gray-600 my-2 italic">
            {project.date.toLocaleDateString()}
          </p>
        </div>
      </div>
      <Image
        src={project.imageUrl}
        width={1280}
        height={720}
        alt="Картинка проекта"
        className="max-h-[400px] h-full object-cover mx-auto my-4 shadow-lg"
      />

      <div className="w-full flex">
        <div className="grow-[3] shrink-[3] w-full"></div>
        <div className="grow-[1] shrink-[1] w-full border-r border-gray-400 pr-4">
          <Markdown rehypePlugins={[rehypeRaw]}>
            {project.fullDescription}
          </Markdown>
        </div>
        <div className="grow-[3] shrink-[3] w-full"></div>
      </div>
      <div>
        {project.slider.length ? (
          <SliderComponent slider={project.slider} />
        ) : null}
      </div>
    </div>
  );
};

export default ProjectPage;

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project) => ({ id: project.id }));
}
