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
import { v4 as uuidv4 } from 'uuid';

import { useRouter } from "next/navigation";
import { Customer, Slide, SocialMedia, SocialMediaPost } from "@prisma/client";

type PropTypes = {
  dirNames: string[];
  customers: Customer[];
  type: "create" | "update";
  data?: {
    customers: {
      id: string;
      name: string;
      imageUrl: string;
      contacts: string;
    }[];
    slider: {
      id: string;
      text: string;
      imageUrl: string;
    }[];
    socialMediaPosts: {
      id: string;
      type: SocialMedia;
      link: string;
    }[];
  } & {
    id: string;
    name: string;
    shortDescription: string;
    imageUrl: string;
    fullDescription: string;
    date: Date;
    hidden: boolean;
  };
};

const CreateProjectForm = ({ dirNames, type, data, customers }: PropTypes) => {
  const [value, setValue] = useState<string>();
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [slider, setSlider] = useState<Slide[]>([]);
  const [selectedSlides, setSelectedSlides] = useState<string[]>([]);
  const [slideUrl, setSlideUrl] = useState("");
  const [slideText, setSlideText] = useState("");

  const [socialList, setSocialList] = useState<SocialMediaPost[]>([]);
  const [selectedSocials, setSelectedSocials] = useState<string[]>([]);
  const [socialType, setSocialType] = useState<SocialMedia>(SocialMedia.VK);
  const [socialUrl, setSocialUrl] = useState<string>("");

  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const handleForm = async (formData: FormData) => {
    formRef.current?.reset();

    const res = await (data
      ? updateProject(formData, data.id, slider, socialList)
      : createProject(formData, slider, socialList));

    router.push(`/projects/${res.project.id}`);
  };

  useEffect(() => {
    if (data) {
      setValue(data.fullDescription);
      setSelectedCustomers(data.customers.map((customer) => customer.id));
      setSlider(data.slider);
      setSelectedSlides(data.slider.map((slide) => slide.id));
      setSocialList(data.socialMediaPosts);
      setSelectedSocials(data.socialMediaPosts.map((item) => item.id));
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

            <div className="w-full flex gap-4">
              <div className="w-full">
                <label
                  className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                  htmlFor="slider"
                >
                  Слайдер
                </label>
                <select
                  className="mb-3 w-full h-[200px] px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                  name="slider"
                  id="slider"
                  value={selectedSlides}
                  onChange={(e) =>
                    setSelectedSlides(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  multiple
                >
                  {slider.map((slide) => (
                    <option key={slide.id} value={slide.id}>
                      {slide.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <p className="block mt-3 mb-2 text-sm font-medium text-gray-600">
                  Создание слайда
                </p>
                <div className="w-full">
                  <label
                    className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                    htmlFor="slide-text"
                  >
                    Текст слайда
                  </label>
                  <input
                    value={slideText}
                    onChange={(e) => setSlideText(e.target.value)}
                    type="text"
                    id="slide-text"
                    className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                    placeholder="Текст ..."
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                    htmlFor="slide-url"
                  >
                    Путь до изображения
                  </label>
                  <input
                    value={slideUrl}
                    onChange={(e) => setSlideUrl(e.target.value)}
                    type="text"
                    id="slide-url"
                    className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                    placeholder="http://..."
                  />
                </div>
                <p
                  className="mt-3 w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg px-4 py-2.5 font-medium text-sm text-center duration-150"
                  onClick={() => {
                    const slide = {
                      id: uuidv4(),
                      text: slideText,
                      imageUrl: slideUrl,
                    } as Slide;
                    setSlider((prev) => [...prev, slide]);
                    setSelectedSlides((prev) => [...prev, slide.id]);

                    setSlideText("");
                    setSlideUrl("");
                  }}
                >
                  Создать слайд
                </p>
              </div>
            </div>

            <div className="w-full flex gap-4">
              <div className="w-full">
                <label
                  className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                  htmlFor="socials"
                >
                  Социальные сети
                </label>
                <select
                  className="mb-3 w-full h-[200px] px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                  name="socials"
                  id="socials"
                  value={selectedSocials}
                  onChange={(e) =>
                    setSelectedSocials(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  multiple
                >
                  {socialList.map((social) => (
                    <option key={social.id} value={social.id}>
                      {social.link}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <p className="block mt-3 mb-2 text-sm font-medium text-gray-600">
                  Добавление ссылки
                </p>
                <div className="w-full">
                  <label
                    className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                    htmlFor="social-type"
                  >
                    Тип социальной сети
                  </label>
                  <select
                    value={socialType}
                    onChange={(e) =>
                      setSocialType(e.target.value as SocialMedia)
                    }
                    id="social-type"
                    className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                  >
                    <option value={SocialMedia.Telegram}>Telegram</option>
                    <option value={SocialMedia.VK}>VK</option>
                    <option value={SocialMedia.WhatsApp}>WhatsApp</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    className="block mt-3 mb-2 text-sm font-medium text-gray-600"
                    htmlFor="social-url"
                  >
                    Ссылка на новость
                  </label>
                  <input
                    value={socialUrl}
                    onChange={(e) => setSocialUrl(e.target.value)}
                    type="text"
                    id="social-url"
                    className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                    placeholder="http://..."
                  />
                </div>
                <p
                  className="mt-3 w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg px-4 py-2.5 font-medium text-sm text-center duration-150"
                  onClick={() => {
                    const socialMedia = {
                      id: uuidv4(),
                      type: socialType,
                      link: socialUrl,
                    } as SocialMediaPost;
                    setSocialList((prev) => [...prev, socialMedia]);
                    setSelectedSocials((prev) => [...prev, socialMedia.id]);

                    setSocialType(SocialMedia.VK);
                    setSocialUrl("");
                  }}
                >
                  Добавить ссылку
                </p>
              </div>
            </div>

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
