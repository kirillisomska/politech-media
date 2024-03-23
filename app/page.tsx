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
        <section className="relative" id="top">
          <div className="w-full flex flex-col items-center justify-center gap-6 relative overflow-hidden">
            <video autoPlay loop className="w-full" src="/compress.mp4" muted>
            </video>

            <div
              className="absolute w-full h-full bg-black bg-opacity-80"
              style={{
                background:
                  "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(77,77,77,0.039653361344537785) 60%)",
              }}
            ></div>

            <div className="absolute top-[10%]">
              <h1 className="text-white md:text-5xl text-3xl font-semibold text-center uppercase">
                Лаборатория идей «Политех<span className="text-[#39AAE1]">Медиа</span>»
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap xl:justify-between justify-center mt-6 gap-4 xl:absolute xl:bottom-[-10%] xl:ml-[8%]">
            <div className=" shadow-md w-full xl:max-w-[342px] h-[225px] py-4 px-6 bg-white">
              <h2 className="text-[#39AAE1] text-7xl font-bold">1</h2>
              <h3 className="font-semibold text-xl text-gray-900 mt-4">
                Работаем над проектами в условиях нечёткого или отсутствующего
                ТЗ
              </h3>
            </div>

            <div className=" shadow-md w-full xl:max-w-[342px] h-[225px] py-4 px-6 bg-white">
              <h2 className="text-[#39AAE1] text-7xl font-bold">2</h2>
              <h3 className="font-semibold text-xl text-gray-900 mt-4">
                Используем широкий спектр мультимедийных интерактивных
                технологий
              </h3>
            </div>

            <div className=" shadow-md w-full xl:max-w-[342px] h-[225px] py-4 px-6 bg-white">
              <h2 className="text-[#39AAE1] text-7xl font-bold">3</h2>
              <h3 className="font-semibold text-xl text-gray-900 mt-4">
                Разрабатываем форму, дизайн и информационное наполнение продукта
              </h3>
            </div>
          </div>
        </section>

        <section id="about" className="xl:mt-[220px]">
          <h2 className="mt-10 mb-4 text-gray-900 font-bold text-3xl text-center">
            О компании
          </h2>

          <p className="mb-6 max-w-[1058px] m-auto my-8 text-xl mb-[40px]">
            Творческое конструкторское бюро "Политех/Медиа" сформировалось на
            кафедре "Дизайн и технологии медиаиндустрии" Омского
            государственного технического университета в 2017 г. Оно возникло
            как сообщество единомышленников - преподавателей и студентов
            ИТ-шников, имеющих интерес к компьютерному творчеству и желание
            создавать нечто общественнозначимое, современное, уникальное,
            красочное.
          </p>

          <div className="flex flex-wrap gap-6 justify-between">
            <div className="w-full xl:max-w-[600px] relative  shadow-md px-6 py-3 md:h-[160px] h-[225px] bg-white">
              <h3 className="font-semibold text-2xl text-gray-900 mt-4 mb-1">
                Интерактивные инсталляции
              </h3>
              <p className="text-gray-900 text-sm max-w-[65%]">
                Ищем профессионалов и приглашаем их для сотрудничества,
                формируем ТЗ
              </p>
              <div className="absolute bottom-[35%] right-[24px] w-[50px] h-[50px] bg-[#39AAE1] rounded-[50%]"></div>
            </div>

            <div className="w-full xl:max-w-[600px] relative  shadow-md px-6 py-3 md:h-[160px] h-[225px] bg-white">
              <h3 className="font-semibold text-2xl text-gray-900 mt-4 mb-1">
                Видеомэппинг
              </h3>
              <p className="text-gray-900 text-sm max-w-[65%]">
                Видеопроекция на здание/обьект сложной формы с учетом его
                геометрии и положения в пространстве
              </p>
              <div className="absolute bottom-[35%] right-[24px] w-[50px] h-[50px] bg-[#39AAE1] rounded-[50%]"></div>
            </div>

            <div className="w-full xl:max-w-[600px] relative  shadow-md px-6 py-3 md:h-[160px] h-[225px] bg-white">
              <h3 className="font-semibold text-2xl text-gray-900 mt-4 mb-1">
                3D-моделирование
              </h3>
              <p className="text-gray-900 text-sm max-w-[65%]">
                Ищем профессионалов и приглашаем их для сотрудничества,
                формируем ТЗ
              </p>
              <div className="absolute bottom-[35%] right-[24px] w-[50px] h-[50px] bg-[#39AAE1] rounded-[50%]"></div>
            </div>

            <div className="w-full xl:max-w-[600px] relative  shadow-md px-6 py-3 md:h-[160px] h-[225px] bg-white">
              <h3 className="font-semibold text-2xl text-gray-900 mt-4 mb-1">
                Дополненная реальность
              </h3>
              <p className="text-gray-900 text-sm max-w-[65%]">
                Ищем профессионалов и приглашаем их для сотрудничества,
                формируем ТЗ
              </p>
              <div className="absolute bottom-[35%] right-[24px] w-[50px] h-[50px] bg-[#39AAE1] rounded-[50%]"></div>
            </div>
          </div>

          <div className="flex justify-between w-full text-[#39AAE1] py-6 px-4 mt-6 items-center bg-[#39AAE1]">
            <p className="text-white font-semibold text-xl">
              У вас есть интересный проект?
            </p>
            <Link
              href="#contacts"
              className="bg-white p-2 text-xs text-[#39AAE1] font-semibold shadow-sm flex items-center justify-center text-center max-h-14"
            >
              Связаться с нами
            </Link>
          </div>
        </section>

        <div id="projects" className="xl:mt-[180px]">
          <ProjectsList projects={projects} />
        </div>
        <section id="contacts">
          <h2 className="xl:mt-[180px] mb-10 text-gray-900 font-bold text-3xl text-center">
            Контакты
          </h2>
          <div className="flex md:justify-between md:flex-row flex-col gap-4">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A9cd4beba281a298ab562252e24fa0488dee5863cb54f450f100cbf46d83387dd&amp;source=constructor"
              width="928"
              height="647"
              className=" max-h-[320px] max-w-[850px] w-full shadow-md"
            ></iframe>
            <div className="bg-white  px-6 py-4">
              <h2 className="text-gray-900 font-bold text-3xl mb-2 mt-3">
                Всегда на связи
              </h2>
              <address>
                <div>
                  <a
                    className="text-gray-900 font-bold text-xl mb-2 mt-3"
                    href="tel:+79136021597"
                  >
                    8 (913) 602-15-97
                  </a>
                  <p className="text-gray-900 mb-2">
                    Звоните с 09:00 до 18:00 по МСК
                  </p>
                </div>
                <div>
                  <a
                    className="text-gray-900 font-bold text-xl mb-2 mt-3"
                    href="mailto:p-media@inbox.ru"
                  >
                    p-media@inbox.ru
                  </a>
                  <p className="text-gray-900 mb-2">Пишите, когда вам удобно</p>
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
                  <Link href="https://vk.com/politechmedia" target="_blank">
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
          <div className="flex justify-between w-full text-white py-6 px-4 mt-6 items-center bg-[#39AAE1]"><p className="text-white font-semibold text-xl">г. Омск, пр. Мира 11<span className="hidden xl:inline">, корпус 6</span>, к. 6-338</p> </div>

        </section>
        <Link className="block xl:hidden" href='#top'><div className="fixed bottom-[10px] right-[10px] bg-[#39AAE1] w-[50px] h-[50px] text-white text-center text-4xl rounded-[50%]">
          ▲
        </div></Link>
      </div>
    </>
  );
}
