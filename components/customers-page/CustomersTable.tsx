"use client";

import type { Customer } from "@prisma/client";
import Link from "next/link";

type PropsTypes = {
  customers: Customer[];
};

const CustomersTable = ({ customers }: PropsTypes) => {
  return (
    <div>
      <h2 className="text-gray-600 font-semibold mt-4 mb-2">
        Таблица заказчиков
      </h2>
      <div className="relative h-max overflow-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 pr-6">Название</th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {customers.map((item) => (
              <tr key={item.id}>
                <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="text-right whitespace-nowrap">
                  <Link
                    href={`/dashboard/customers/${item.id}`}
                    className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                  >
                    Редактировать
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;
