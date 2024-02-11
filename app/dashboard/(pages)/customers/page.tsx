import CustomersTable from "@/components/customers-page/CustomersTable";
import { getAllCustomers } from "@/db/db";
import { db } from "@/services/db";
import Link from "next/link";

const CustomersPage = async () => {
  const customers = await db.customer.findMany();

  return (
    <div>
      <h1 className="text-gray-600 font-bold text-2xl">Заказчики</h1>
      <hr />
      <div className="flex justify-end mt-4">
        <Link
          href="/dashboard/customers/create"
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
        >
          Добавить заказчика
        </Link>
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
};

export default CustomersPage;
