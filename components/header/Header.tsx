"use client";

import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const session = useSession();

  return (
    <header className="custom-screen max-w-[1280px] w-[100%] m-auto gap-x-20 items-center md:flex px-4">
      <div className="flex items-center justify-between py-5 md:block">
        <Link href="/">
          <Image src="/logo.svg" alt="Логотип" width={200} height={50} />
        </Link>
      </div>
      <div className="flex-1 items-center mt-8 text-gray-600 md:font-medium md:mt-0 md:flex hidden">
        <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
          <li className="hover:text-gray-900">
            <Link href="/">Главная</Link>
          </li>
          <li className="hover:text-gray-900">
            <Link href="/about">О нас</Link>
          </li>
          <li className="hover:text-gray-900">
            <Link href="/partners">Партнеры</Link>
          </li>
          {session.status === "authenticated" ? (
            <li className="hover:text-gray-900">
              <Link href="/dashboard">Дашборд</Link>
            </li>
          ) : null}
        </ul>
        <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
          {session.status === "authenticated" ? (
            <button onClick={() => signOut()} className="py-2.5 px-4 text-center rounded-full duration-150 flex items-center justify-center gap-x-1 text-sm text-white font-medium bg-gray-800 hover:bg-gray-600 active:bg-gray-900 md:inline-flex">
              Выход
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
