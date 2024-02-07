"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const authUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const Signin = () => {
  const session = useSession();
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setLoginError(false);
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
      router.push("/dashboard");
    } else {
      setLoginError(true);
    }
  };

  if (session.data) {
    router.push("/dashboard");
  }

  return (
    <div className="w-full mt-[60px] flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <h1 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Войти в ваш аккаунт
          </h1>
          {
            loginError ? <p className="text-red-800 text-xl font-bold sm:text-2xl mt-5">Введен неправильный логин или пароль!</p> : null
          }
        </div>
        <form className="mt-8 space-y-5" action={handleSubmit}>
          <div>
            <label className="font-medium" htmlFor="email">
              Почта
            </label>
            <input
              type="email"
              name="email"
              placeholder="test@mail.ru"
              required
              className="w-full mt-3 focus:border-blue-600 px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              placeholder="****"
              required
              className="w-full mt-3 focus:border-blue-600 px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150"
            />
          </div>

          <button
            className="w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg px-4 py-2.5 font-medium text-sm text-center duration-150"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
