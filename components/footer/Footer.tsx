import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="custom-screen max-w-[1280px] w-[100%] mx-auto px-4">
      <div className="flex-1 items-center pt-8 text-gray-600 font-medium md:mt-0 flex flex-wrap gap-5">
      <Image src={logo} alt="Логотип" width={200} height={50}></Image>
        <ul className="justify-center items-center flex space-x-6 space-y-0 flex-wrap">
          <li className="hover:text-gray-900">
            <Link href="/#about">О компании</Link>
          </li>
          <li className="hover:text-gray-900">
            <Link href="/#projects">Проекты</Link>
          </li>
          <li className="hover:text-gray-900">
            <Link href="/#contacts">Контакты</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-gray-600 text-center mt-3 pb-5">{`© ${new Date().getFullYear()}, ПолитехМедиа`}</p>
      </div>
    </footer>
  );
};

export default Footer;
