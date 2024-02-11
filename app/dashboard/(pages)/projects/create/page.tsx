import { getAllDirNames } from "@/actions/photos";
import CreateProjectForm from "@/components/projects-page/CreateProjectForm";
import { db } from "@/services/db";

const CreateProjectPage = async () => {
  const dirNames = getAllDirNames();
  const customers = await db.customer.findMany();

  return (
    <div>
      <h1 className="text-gray-600 font-bold text-2xl">Проекты</h1>
      <hr />
      <div className="mt-4">
        <CreateProjectForm dirNames={dirNames} customers={customers} type="create"/>
      </div>
    </div>
  );
};

export default CreateProjectPage;
