"use server";

import fs from "fs";
import path, { join } from "path";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/services/db";

export const uploadImages = async (data: FormData) => {
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
};

export const createDir = async (data: FormData) => {
  const dirName = data.get("dirName");
  const publicFolderPath = path.join(
    process.cwd(),
    process.env.DEFAULT_IMAGE_FOLDER_PATH!
  );

  fs.mkdirSync(`${publicFolderPath}/${dirName}`);

  revalidatePath("/dashboard", "layout");
};

export const getAllDirNames = () => {
  if (process.env.CURRENT_ENV === "vercel") {
    return [];
  }

  const publicFolderPath = path.join(
    process.cwd(),
    process.env.DEFAULT_IMAGE_FOLDER_PATH!
  );

  const fileNames = fs.readdirSync(publicFolderPath, { withFileTypes: true });

  return fileNames.filter((d) => d.isDirectory()).map((d) => d.name);
};

const createProjectSchema = z.object({
  name: z.string(),
  shortDescription: z.string(),
  imageUrl: z.string(),
  date: z.string(),
  fullDescription: z.string(),
  customers: z.array(z.string()),
});

export const createProject = async (data: FormData) => {
  console.log(data.get("customers"));

  const project = createProjectSchema.parse({
    name: data.get("name"),
    shortDescription: data.get("shortDescription"),
    imageUrl: data.get("imageUrl"),
    date: data.get("date"),
    fullDescription: data.get("fullDescription"),
    customers: Array.from(data.getAll("customers")),
  });

  const res = await db.project.create({
    data: {
      ...project,
      date: new Date(project.date),
      hidden: true,
      customers: {
        connect: project.customers.map((item) => ({ id: item })),
      },
    },
  });

  revalidateTag("projects");

  return { project: res };
};

export const updateProject = async (data: FormData, id: string) => {
  const project = createProjectSchema.parse({
    name: data.get("name"),
    shortDescription: data.get("shortDescription"),
    imageUrl: data.get("imageUrl"),
    date: data.get("date"),
    fullDescription: data.get("fullDescription"),
    customers: Array.from(data.getAll("customers")),
  });

  const currentProject = await db.project.findUnique({
    where: { id },
    include: { customers: true },
  });

  const customersToRemove = currentProject?.customers.filter(
    (customer) => !project.customers.includes(customer.id)
  );

  const res = await db.project.update({
    where: { id },
    data: {
      ...project,
      date: new Date(project.date),
      customers: {
        disconnect: customersToRemove?.map((customer) => ({ id: customer.id })),
        connect: project.customers.map((item) => ({ id: item })),
      },
    },
  });

  revalidateTag("projects");

  return { project: res };
};

export const deleteProject = async (id: string) => {
  const res = await db.project.delete({
    where: { id },
  });

  revalidateTag("projects");

  return { project: res };
};

export const hiddenProject = async (id: string, status: boolean) => {
  const res = await db.project.update({
    where: { id },
    data: {
      hidden: status,
    },
  });

  revalidateTag("projects");

  return { project: res };
};

const CustomerSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
  contacts: z.string(),
});

export const createCustomer = async (data: FormData) => {
  const customer = CustomerSchema.parse({
    name: data.get("name"),
    imageUrl: data.get("imageUrl"),
    contacts: data.get("contacts"),
  });

  const res = await db.customer.create({
    data: { ...customer },
  });

  revalidateTag("customers");

  return { customer: res };
};

export const updateCustomer = async (data: FormData, id: string) => {
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

  return { customer: res };
};
