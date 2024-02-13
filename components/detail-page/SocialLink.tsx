import Link from "next/link";
import { SocialMedia, type SocialMediaPost } from "@prisma/client";
import Image from "next/image";

import tgLogo from "@/public/icons8-телеграм.svg";
import vkLogo from "@/public/icons8-vk.svg";
import whatsappLogo from "@/public/icons8-whatsapp.svg";

type PropTypes = {
  socialMediaPosts: SocialMediaPost;
};

const SocialMediaIcon = {
  [SocialMedia.Telegram]: tgLogo,
  [SocialMedia.WhatsApp]: whatsappLogo,
  [SocialMedia.VK]: vkLogo,
};

const SocialLink = ({ socialMediaPosts }: PropTypes) => {
  return (
    <Link href={socialMediaPosts.link} target="_blank">
      <Image
        src={SocialMediaIcon[socialMediaPosts.type]}
        alt="Ссылка на соц сеть"
        width={50}
        height={50}
        className="w-[35px]"
      ></Image>
    </Link>
  );
};

export default SocialLink;
