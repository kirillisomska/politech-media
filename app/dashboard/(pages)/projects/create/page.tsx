import { getAllDirNames } from "@/actions/photos";
import CreateProjectForm from "@/components/projects-page/CreateProjectForm";
import { getAllCustomers } from "@/db/db";

const CreateProjectPage = async () => {
  const dirNames = await getAllDirNames();
  const customers = await getAllCustomers();

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
