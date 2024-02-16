import ProjectsList from "@/components/projects-list/ProjectsList";
import { getAllProjectsWithoutCustomers } from "@/db/db";
import Image from "next/image";
import Link from "next/link";

import tgLogo from "@/public/icons8-телеграм.svg";
import vkLogo from "@/public/icons8-vk.svg";

export default async function Home() {
  const projects = await getAllProjectsWithoutCustomers();

  return (
    <>
      <div className="custom-screen max-w-[1280px] w-[100%] px-4 m-auto items-center flex-col gap-16">
        <ProjectsList projects={projects} />
        <div className="flex justify-between mt-20">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A9cd4beba281a298ab562252e24fa0488dee5863cb54f450f100cbf46d83387dd&amp;source=constructor"
            width="928"
            height="647"
            className="rounded-2xl max-h-[520px] max-w-[900px] w-full"
          ></iframe>
          <div>
            <h2 className="text-gray-900 font-bold text-3xl mb-2 mt-3">Всегда на связи</h2>
            <address>
              <div>
                <a className="text-gray-900 font-bold text-xl mb-2 mt-3" href="tel:+78008008080">8 (800) 800-80-80</a>
                <p className="text-gray-900 mb-2">Звоните с 12:00 до 23:00 по МСК</p>
              </div>
              <div>
                <a className="text-gray-900 font-bold text-xl mb-2 mt-3" href="mailto:example@gmail.com">example@gmail.com</a>
                <p className="text-gray-900 mb-2">Пишите, когда вам удобно </p>
              </div>
              <div className="flex gap-3">
                <Link href="#">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={tgLogo}
                      alt="Tg-logo"
                      width={50}
                      height={50}
                    ></Image>
                    <p>Telegram</p>
                  </div>
                </Link>
                <Link href="#">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={vkLogo}
                      alt="Tg-logo"
                      width={50}
                      height={50}
                    ></Image>
                    <p>ВКонтакте</p>
                  </div>
                </Link>
              </div>
            </address>
          </div>
        </div>
      </div>
    </>
  );
}
