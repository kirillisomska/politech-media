"use client";

import { createCustomer, updateCustomer } from "@/actions/photos";
import { Customer } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import UploadButton from "../photos-page/UploadButton";
import PhotosList from "../photos-page/PhotosList";

type PropTypes = {
  dirNames: string[];
  type: "create" | "update";
  data?: Customer;
};

const CreateCustomerForm = ({ dirNames, type, data }: PropTypes) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleForm = async (formData: FormData) => {
    formRef.current?.reset();

    const res = await (data
      ? updateCustomer(formData, data.id)
      : createCustomer(formData));

    router.push(`/dashboard/customers`);
  };
  return (
    <div className="w-full">
      <h2 className="text-gray-600 font-semibold my-4">
        {type === "create"
          ? "Добавить нового заказчика"
          : "Редактировать заказчика"}
      </h2>
      <div className="flex gap-10 justify-between">
        <div className="w-[70%] flex-col">
          <form action={handleForm}>
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              Заказчик
            </label>
            <input
              className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
              type="text"
              name="name"
              id="name"
              placeholder="ОмГТУ"
              defaultValue={data ? data.name : ""}
            />
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <label
                  className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                  htmlFor="imageUrl"
                >
                  Путь до изображения (Логотип)
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                  placeholder="http://..."
                  defaultValue={data ? data.imageUrl : ""}
                />
              </div>

              <div className="w-full">
                <label
                  className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                  htmlFor="contacts"
                >
                  Ссылка на сайт
                </label>
                <input
                  type="text"
                  name="contacts"
                  id="contacts"
                  className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                  placeholder="http://..."
                  defaultValue={data ? data.contacts : ""}
                />
              </div>
            </div>

            <UploadButton
              defaultText={
                type === "create" ? "Добавить заказчика" : "Обновить заказчика"
              }
              pendingText={
                type === "create"
                  ? "Добавление заказчика..."
                  : "Обновление заказчика"
              }
            />
          </form>
        </div>
        <div className="w-[25%] overflow-y-scroll max-h-[50vh] pr-1">
          <PhotosList dirNames={dirNames} />
        </div>
      </div>
    </div>
  );
};

export default CreateCustomerForm;
