import { getAllProjects } from "@/db/db";
import { db } from "@/services/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import SliderComponent from "@/components/detail-page/SliderComponent";
import SocialLink from "@/components/detail-page/SocialLink";

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

const ProjectPage = async ({ params: { id } }: { params: { id: string } }) => {
  const project = await getProjectById(id);
  const session = await getServerSession();

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4">
      {session?.user?.email && project.hidden ? (
        <h2 className="text-red-900 font-medium text-4xl my-5 mx-auto">
          Проект скрыт и не виден пользователям с главной страницы!
        </h2>
      ) : null}
      <div className="w-full md:flex md:gap-4 mb-4">
        <div className="grow-[2] shrink-[3] w-full">
          <Link
            href="/"
            className="md:block w-[75px] text-center md:border px-2 py-1 md:border-gray-400 rounded-3xl hidden"
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
        <div className="w-full grow-[4] shrink-[1] md:border-r border-gray-400 pr-4">
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
              <div className="flex items-start justify-start flex-wrap flex-row  md:flex-col gap-2">
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

      <div className="w-full flex flex-col-reverse md:flex-row">
        <div className="md:block hidden grow-[3] shrink-[3] w-full"></div>
        <div className="grow-[1] shrink-[1] w-full md:border-r border-gray-400 pr-4">
          <Markdown rehypePlugins={[rehypeRaw]}>
            {project.fullDescription}
          </Markdown>
        </div>
        <div className="grow-[3] shrink-[3] w-full">
          {project.socialMediaPosts.length ? (
            <div>
              <h2 className="text-gray-900 font-medium text-l my-2 md:ml-3">
                Социальные сети
              </h2>
              <div className="flex gap-2 md:ml-3 flex-wrap md:justify-start mb-4">
                {project.socialMediaPosts.map((social) => (
                  <SocialLink socialMediaPosts={social} key={social.id} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
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
