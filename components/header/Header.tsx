"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  return (
    <header className="custom-screen max-w-[1280px] w-[100%] m-auto gap-x-20 items-center md:flex px-4">
      <div className="flex gap-4 w-full">
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-4xl text-gray-900">
        {isOpen ? '×' : '≡' }
      </button>
      <div className="flex items-center justify-between py-5 md:block">
        <Link href="/">
          <Image src="/logo.svg" alt="Логотип" width={200} height={50} />
        </Link>
      </div>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "block" : "hidden"
        } flex-1 items-center mt-8 text-gray-600 md:font-medium md:mt-0 md:flex`}
      >
        <ul className="justify-center items-center space-y-6 md:flex md:gap-4 md:space-y-0 md:mr-4">
          <li className="hover:text-gray-900 md:min-w-[120px] md:text-center">
            <Link href="/#about">О компании</Link>
          </li>
          <li className="hover:text-gray-900 md:min-w-[120px] md:text-center">
            <Link href="/#projects">Проекты</Link>
          </li>
          <li className="hover:text-gray-900 md:min-w-[120px] md:text-center">
            <Link href="/#contacts">Контакты</Link>
          </li>
          {session.status === "authenticated" ? (
            <li className="hover:text-gray-900 md:min-w-[120px] md:text-center">
              <Link href="/dashboard">Дашборд</Link>
            </li>
          ) : null}
        </ul>
        <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
          {session.status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="py-2.5 px-4 text-center rounded-full duration-150 flex items-center justify-center gap-x-1 text-sm text-white font-medium bg-gray-800 hover:bg-gray-600 active:bg-gray-900 md:inline-flex"
            >
              Выход
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
