import { getAllDirNames } from "@/actions/photos";
import CreateCustomerForm from "@/components/customers-page/CreateCustomerForm";

const CreateCustomerPage = async () => {
  const dirNames = await getAllDirNames();

  return (
    <div>
      <h1 className="text-gray-600 font-bold text-2xl">Заказчики</h1>
      <hr />
      <div className="mt-4">
        <CreateCustomerForm dirNames={dirNames} type="create" />
      </div>
    </div>
  );
};

export default CreateCustomerPage;
