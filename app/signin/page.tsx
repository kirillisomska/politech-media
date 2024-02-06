"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const authUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const Signin = () => {
  const session = useSession();
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const user = authUserSchema.parse({
      email: data.get("email"),
      password: data.get("password"),
    });

    const res = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    if (res && res.ok) {
    //   router.push("/dashboard");
    }
  };

  console.log(session);

  return (
    <div>
      <h1>Вход</h1>
      <form action={handleSubmit}>
        <label htmlFor="email">Почта</label>
        <input type="email" name="email" placeholder="test@mail.ru" required />
        <label htmlFor="password">Пароль</label>
        <input type="password" name="password" required />

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Signin;
