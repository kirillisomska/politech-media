import logo from "@/public/logo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="custom-screen max-w-[1280px] w-[100%] mx-auto px-4">
      <div className="flex-1 items-center pt-8 text-gray-600 font-medium md:mt-0 flex flex-wrap gap-5 justify-center">
        <Image src={logo} alt="Логотип" width={200} height={50}></Image>
      </div>
      <div>
        <p className="text-gray-600 mt-3 pb-5 text-center">{`© 2018 - ${new Date().getFullYear()}, ПолитехМедиа`}</p>
      </div>
    </footer>
  );
};

export default Footer;
