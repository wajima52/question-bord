import { parseCookies } from "nookies"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonProps } from "../../components/Atoms/Button"
import { InputProps } from "../../components/Atoms/Input"
import AuthForm from "../../components/Molecules/Auth/AuthForm"
import DefaultLayout from "../../components/Templates/Layout/DefaultLayout"
import { SignInFormValues } from "./sign-in"

export type LoginFormValues = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>()
  const cookies = parseCookies()
  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    if (process.browser) {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "xsrf-token": cookies["XSRF-TOKEN"],
          "Content-Type": "application/json",
        },
      })
      console.log(await res.json())
    }
  }

  const inputs: InputProps[] = [
    {
      placeholder: "メールアドレス",
      label: "メールアドレス",
      type: "email",
      name: "email",
      autoComplete: "email",
      required: true,
      register: register,
    },
    {
      placeholder: "8文字以上の半角英数字",
      label: "パスワード",
      type: "password",
      name: "password",
      autoComplete: "current-password",
      required: true,
      register: register,
    },
  ]

  const button: ButtonProps = {
    type: "submit",
    text: "ログイン",
    icon: (
      <svg
        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  }

  return (
    <DefaultLayout>
      <div className="min-h-0 lg:min-h-screen flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              ログイン
            </h2>
          </div>
          <AuthForm
            inputs={inputs}
            button={button}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Login
