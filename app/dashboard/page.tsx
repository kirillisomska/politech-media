import { db } from "@/services/db";
import { z } from "zod";

const authUserSchema = z.object({
  name: z.string(),
  shortDescription: z.string(),
  imageUrl: z.string(),
  date: z.string(),
  fullDescription: z.string(),
});

const handleSubmit = async (data: FormData) => {
  "use server";

  const project = authUserSchema.parse({
    name: data.get("name"),
    shortDescription: data.get("shortDescription"),
    imageUrl: data.get("imageUrl"),
    date: data.get("date"),
    fullDescription: data.get("fullDescription"),
  });

  const res = await db.project.create({
    data: {
      ...project,
      date: new Date(project.date),
    },
  });
};

const Dashboard = () => {
  return (
    <div>
      <h1>Дашборд</h1>

      <h2>Создать новый проект</h2>
      <form action={handleSubmit}>
        <input type="text" name="name" placeholder="Название проекта" />
        <textarea
          name="shortDescription"
          placeholder="Короткое описание проекта"
        ></textarea>
        <input type="text" name="imageUrl" placeholder="Путь до изображения" />
        <input type="date" name="date" />
        <textarea
          name="fullDescription"
          placeholder="Полное описание"
        ></textarea>

        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default Dashboard;
