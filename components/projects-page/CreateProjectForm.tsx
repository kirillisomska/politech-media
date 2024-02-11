"use client";

import {
  createProject,
  deleteProject,
  hiddenProject,
  updateProject,
} from "@/actions/photos";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import UploadButton from "../photos-page/UploadButton";
import PhotosList from "../photos-page/PhotosList";

import { useRouter } from "next/navigation";
import { Customer } from "@prisma/client";
import { Project } from "@/types";

type PropTypes = {
  dirNames: string[];
  customers: Customer[];
  type: "create" | "update";
  data?: Project;
};

const CreateProjectForm = ({ dirNames, type, data, customers }: PropTypes) => {
  const [value, setValue] = useState<string>();
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const handleForm = async (formData: FormData) => {
    formRef.current?.reset();

    const res = await (data
      ? updateProject(formData, data.id)
      : createProject(formData));

    router.push(`/projects/${res.project.id}`);
  };

  useEffect(() => {
    if (data) {
      setValue(data.fullDescription);
      setSelectedCustomers(data.customers.map((customer) => customer.id));
    }
  }, [data]);

  return (
    <div className="w-full">
      <h2 className="text-gray-600 font-semibold my-4">
        {type === "create" ? "Создать новый проект" : "Обновить проект"}
      </h2>
      <div className="flex gap-10 justify-between">
        <div className="w-[70%] flex-col">
          <form action={handleForm}>
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              Название проекта
            </label>
            <input
              className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
              type="text"
              name="name"
              id="name"
              placeholder="Проект 1"
              defaultValue={data ? data.name : ""}
            />
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <label
                  className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                  htmlFor="shortDescription"
                >
                  Короткое описание проекта
                </label>
                <textarea
                  className="resize-none w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                  name="shortDescription"
                  placeholder="Короткое описание проекта"
                  rows={3}
                  maxLength={70}
                  defaultValue={data ? data.shortDescription : ""}
                ></textarea>
              </div>
              <div className="w-full">
                <label
                  className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                  htmlFor="customers"
                >
                  Заказчики проекта
                </label>
                <select
                  className="mb-3 w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                  name="customers"
                  id="customers"
                  value={selectedCustomers}
                  onChange={(e) =>
                    setSelectedCustomers(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  multiple
                >
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <label
                  className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                  htmlFor="imageUrl"
                >
                  Путь до изображения
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
                  htmlFor="date"
                >
                  Дата окончания проекта
                </label>
                <input
                  className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                  id="date"
                  type="date"
                  name="date"
                  defaultValue={
                    data ? data.date.toISOString().split("T")[0] : ""
                  }
                />
              </div>
            </div>
            <label
              className="block mt-3 mb-2 text-sm font-medium text-gray-600"
              htmlFor="fullDescription"
            >
              Полное описание проекта
            </label>
            <MDEditor
              id="fullDescription"
              value={value}
              onChange={setValue}
              defaultValue={data ? data.fullDescription : ""}
              height={300}
              data-color-mode="light"
            />
            <textarea
              name="fullDescription"
              placeholder="Полное описание"
              value={value}
              defaultValue={data ? data.fullDescription : ""}
              className="hidden"
            ></textarea>

            <UploadButton
              defaultText={
                type === "create" ? "Создать проект" : "Обновить проект"
              }
              pendingText={
                type === "create" ? "Создание проекта..." : "Обновление проекта"
              }
            />
          </form>
          {type === "update" ? (
            <div className="flex w-full justify-between gap-4">
              <form
                className="w-full"
                action={async (e) => {
                  if (data) {
                    const res = await deleteProject(data?.id);
                    if (res.project) {
                      router.push("/");
                    }
                  }
                }}
              >
                <UploadButton defaultText="Удалить" pendingText="Удаление" />
              </form>
              <form
                className="w-full"
                action={async (e) => {
                  if (data) {
                    const res = await hiddenProject(data?.id, !data.hidden);
                    if (res.project) {
                      router.push(`/projects/${res.project.id}`);
                    }
                  }
                }}
              >
                <UploadButton
                  defaultText={data?.hidden ? "Сделать видимым" : "Скрыть"}
                  pendingText="Смена видимости..."
                />
              </form>
            </div>
          ) : null}
        </div>
        <div className="w-[25%] overflow-y-scroll max-h-[50vh] pr-1">
          <PhotosList dirNames={dirNames} />
        </div>
      </div>
    </div>
  );
};

export default CreateProjectForm;
