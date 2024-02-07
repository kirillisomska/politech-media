import ProjectsList from "@/components/projects-list/ProjectsList";

export default function Home() {
  return (
    <>
      <div className="custom-screen max-w-[1280px] w-[100%] m-auto gap-x-20 items-center md:flex">
        <ProjectsList />
      </div>
    </>
  );
}
