"use client";

import { FormEventHandler, useState } from "react";
import { z } from "zod";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import PhotosList from "@/components/PhotosList";

const authUserSchema = z.object({
  name: z.string(),
  shortDescription: z.string(),
  imageUrl: z.string(),
  date: z.string(),
  fullDescription: z.string(),
});

const Dashboard = () => {
  const [value, setValue] = useState<string>();
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  
    const data = new FormData(e.currentTarget);
  
    const project = authUserSchema.parse({
      name: data.get("name"),
      shortDescription: data.get("shortDescription"),
      imageUrl: data.get("imageUrl"),
      date: data.get("date"),
      fullDescription: data.get("fullDescription"),
    });
  
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...project,
      }),
    });
  
    if (res.ok) {
      const data = await res.json();
      router.push(`/projects/${data.id}`);
    }
  };

  return (
    <div>
      <h1>Дашборд</h1>

      <h2>Создать новый проект</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Название проекта" />
        <textarea
          name="shortDescription"
          placeholder="Короткое описание проекта"
        ></textarea>
        <input type="text" name="imageUrl" placeholder="Путь до изображения" />
        <input type="date" name="date" />
        <MDEditor value={value} onChange={setValue} height={300} />
        <textarea
          name="fullDescription"
          placeholder="Полное описание"
          value={value}
          className="hidden"
        ></textarea>

        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default Dashboard;
