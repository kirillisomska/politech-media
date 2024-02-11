import { getAllDirNames } from "@/actions/photos";
import CreateCustomerForm from "@/components/customers-page/CreateCustomerForm";
import { db } from "@/services/db";
import { redirect } from "next/navigation";

const getCustomerById = async (id: string) => {
  const customer = await db.customer.findFirst({
    where: { id },
  });

  if (!customer) {
    redirect("/404");
  }

  return customer;
};

const UpdateCustomerPage = async ({ params }: { params: { id: string } }) => {
  const dirNames = getAllDirNames();
  const customer = await getCustomerById(params.id);

  return (
    <div>
      <h1 className="text-gray-600 font-bold text-2xl">Проекты</h1>
      <hr />
      <div className="mt-4">
        <CreateCustomerForm dirNames={dirNames} type="update" data={customer}/>
      </div>
    </div>
  );
};

export default UpdateCustomerPage;
