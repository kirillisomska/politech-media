"use server";

import fs from "fs";
import path, { join } from "path";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/services/db";
import { Slide } from "@prisma/client";

export async function uploadImages(data: FormData) {
  const files: FileList | null = data.getAll("file") as unknown as FileList;
  const dirName = data.get("dir");

  if (!files || files.length === 0) {
    return {
      error: "Incorrect file input",
    };
  }

  const paths = await Promise.all(
    Array.from(files)
      .map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const path = join(
          `${process.env.DEFAULT_IMAGE_FOLDER_PATH}/${dirName}/`,
          `${randomUUID()}.${file.type.split("/")[1]}`
        );

        try {
          await writeFile(path, buffer);
          return path;
        } catch (e) {
          return null;
        }
      })
      .filter((path) => path !== null)
  );

  revalidatePath("/", "layout");
  revalidatePath("/public/images/");

  return { paths };
}

export async function createDir(data: FormData) {
  const dirName = data.get("dirName");
  const publicFolderPath = path.join(
    process.cwd(),
    process.env.DEFAULT_IMAGE_FOLDER_PATH!
  );

  fs.mkdirSync(`${publicFolderPath}/${dirName}`);

  revalidatePath("/dashboard", "layout");
}

export async function getAllDirNames() {
  if (process.env.CURRENT_ENV === "vercel") {
    return [];
  }

  const publicFolderPath = path.join(
    process.cwd(),
    process.env.DEFAULT_IMAGE_FOLDER_PATH!
  );

  const fileNames = fs.readdirSync(publicFolderPath, { withFileTypes: true });

  return fileNames.filter((d) => d.isDirectory()).map((d) => d.name);
}

const createProjectSchema = z.object({
  name: z.string(),
  shortDescription: z.string(),
  imageUrl: z.string(),
  date: z.date(),
  fullDescription: z.string(),
  customers: z.array(z.string()),
  slider: z.array(z.string()),
});

export async function createProject(data: FormData, slider: Slide[]) {
  const project = createProjectSchema.parse({
    name: data.get("name"),
    shortDescription: data.get("shortDescription"),
    imageUrl: data.get("imageUrl"),
    date: data.get("date") ? new Date(data.get("date") as string) : new Date(),
    fullDescription: data.get("fullDescription"),
    customers: Array.from(data.getAll("customers")),
    slider: Array.from(data.getAll("slider")),
  });

  const filteredSlider = slider.filter((slide) =>
    project.slider.includes(slide.id)
  );

  const slides = await Promise.all(
    filteredSlider.map((slide) => db.slide.create({ data: slide }))
  );

  const res = await db.project.create({
    data: {
      ...project,
      date: new Date(project.date),
      hidden: true,
      customers: {
        connect: project.customers.map((item) => ({ id: item })),
      },
      slider: {
        connect: slides.map((item) => ({ id: item.id })),
      },
    },
  });

  revalidateTag("projects");
  revalidatePath("/dashboard/projects", "page");

  return { project: res };
}

export async function updateProject(
  data: FormData,
  id: string,
  slider: Slide[]
) {
  const project = createProjectSchema.parse({
    name: data.get("name"),
    shortDescription: data.get("shortDescription"),
    imageUrl: data.get("imageUrl"),
    date: data.get("date") ? new Date(data.get("date") as string) : new Date(),
    fullDescription: data.get("fullDescription"),
    customers: Array.from(data.getAll("customers")),
    slider: Array.from(data.getAll("slider")),
  });

  const currentProject = await db.project.findUnique({
    where: { id },
    include: { customers: true, slider: true },
  });

  if (!currentProject) throw new Error("Project not found");

  const currentSlideIds = currentProject.slider.map((slide) => slide.id);
  const currentCustomerIds = currentProject.customers.map(
    (customer) => customer.id
  );

  const disconnectSlides = currentSlideIds
    .filter((slide) => !project.slider.includes(slide))
    .map((item) => ({ id: item }));
  const connectSlides = slider.filter(
    (slide) =>
      project.slider.includes(slide.id) && !currentSlideIds.includes(slide.id)
  );

  const disconnectCustomers = currentCustomerIds
    .filter((id) => !project.customers.includes(id))
    .map((item) => ({ id: item }));

  const updateData = {
    ...project,
    slider: { disconnect: disconnectSlides, connect: connectSlides },
    customers: {
      disconnect: disconnectCustomers,
      connect: project.customers.map((item) => ({ id: item })),
    },
  };

  const slidesCreateResponse = connectSlides.map((slide) =>
    db.slide.create({ data: slide })
  );

  await Promise.all([...slidesCreateResponse]);

  const projectUpdateResponse = db.project.update({
    where: { id },
    data: updateData,
  });

  const res = await projectUpdateResponse;

  revalidateTag("projects");
  revalidatePath("/", "page");
  revalidatePath("/dashboard/projects", "page");

  return { project: res };
}

export async function deleteProject(id: string) {
  const res = await db.project.delete({
    where: { id },
  });

  revalidateTag("projects");
  revalidatePath("/", "page");
  revalidatePath("/dashboard/projects", "page");

  return { project: res };
}

export async function hiddenProject(id: string, status: boolean) {
  const res = await db.project.update({
    where: { id },
    data: {
      hidden: status,
    },
  });

  revalidateTag("projects");
  revalidatePath("/dashboard/projects", "page");
  revalidatePath("/", "page");

  return { project: res };
}

const CustomerSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
  contacts: z.string(),
});

export async function createCustomer(data: FormData) {
  const customer = CustomerSchema.parse({
    name: data.get("name"),
    imageUrl: data.get("imageUrl"),
    contacts: data.get("contacts"),
  });

  const res = await db.customer.create({
    data: { ...customer },
  });

  revalidateTag("customers");
  revalidatePath("/dashboard/customers", "page");

  return { customer: res };
}

export async function updateCustomer(data: FormData, id: string) {
  const customer = CustomerSchema.parse({
    name: data.get("name"),
    imageUrl: data.get("imageUrl"),
    contacts: data.get("contacts"),
  });

  const res = await db.customer.update({
    where: { id },
    data: { ...customer },
  });

  revalidateTag("customers");
  revalidatePath("/dashboard/customers", "page");

  return { customer: res };
}
