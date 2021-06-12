import { parseCookies } from "nookies"
import React from "react"
import { ButtonProps } from "../../components/Atoms/Button"
import { InputProps } from "../../components/Atoms/Input"
import AuthForm from "../../components/Molecules/Auth/AuthForm"
import DefaultLayout from "../../components/Templates/Layout/DefaultLayout"

const SignIn: React.FC = () => {
  const cookies = parseCookies()
  const inputs: InputProps[] = [
    {
      placeholder: "３文字以上",
      label: "ユーザー名",
      type: "text",
      name: "name",
    },
    {
      placeholder: "メールアドレス",
      label: "メールアドレス",
      type: "email",
      name: "email",
      autoComplete: "email",
    },
    {
      placeholder: "8文字以上の半角英数字",
      label: "パスワード",
      type: "password",
      name: "password",
      autoComplete: "new-password",
    },
    {
      placeholder: "もう一度パスワードを入力してください",
      label: "パスワード(確認用)",
      type: "password",
      name: "password_confirmation",
      autoComplete: "new-password",
    },
  ]
  const button: ButtonProps = {
    type: "button",
    text: "登録する",
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
    onClick: () => {
      if (process.browser) {
        const form = document.forms.namedItem("auth")
        const formData = new FormData(form)
        const res = fetch("/api/sign-in", {
          method: "POST",
          body: formData,
          headers: {
            "xsrf-token": cookies["XSRF-TOKEN"],
          },
        })
      }
    },
  }

  return (
    <DefaultLayout>
      <div className="min-h-0 lg:min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              新規会員登録
            </h2>
          </div>
          <AuthForm inputs={inputs} button={button} />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default SignIn
