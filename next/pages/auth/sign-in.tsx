import { parseCookies } from "nookies"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonProps } from "../../components/Atoms/Button"
import { InputProps } from "../../components/Atoms/Input"
import AuthForm from "../../components/Molecules/Auth/AuthForm"
import DefaultLayout from "../../components/Templates/Layout/DefaultLayout"

export type SignInFormValues = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInFormValues>()
  const onSubmit: SubmitHandler<SignInFormValues> = (data) => {
    if (process.browser) {
      const res = fetch("/api/sign-in", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "xsrf-token": cookies["XSRF-TOKEN"],
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          alert(
            "エラーが発生しました。\n申し訳ありませんが、再度ご登録をお願いいたします。"
          )
        }
      })
    }
  }
  const cookies = parseCookies()
  const inputs: InputProps[] = [
    {
      placeholder: "３文字以上",
      label: "ユーザー名",
      type: "text",
      register: register("name", {
        required: "必ず入力してください",
        minLength: { value: 3, message: "3文字以上で入力してください" },
      }),
      error: errors.name,
    },
    {
      placeholder: "メールアドレス",
      label: "メールアドレス",
      type: "email",
      register: register("email", {
        required: "必ず入力してください",
        pattern: {
          value: /^[\w.!#$%&'*+\/=?^_`{|}~-]+@[\w-]+(?:\.[\w-]+)*$/,
          message: "正しいメールアドレスの形式を入力してください",
        },
      }),
      autoComplete: "email",
      error: errors.email,
    },
    {
      placeholder: "8文字以上の半角英数字",
      label: "パスワード",
      type: "password",
      register: register("password", {
        required: "必ず入力してください",
        pattern: {
          value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/,
          message:
            "英数字がそれぞれ１文字以上含まれた8文字以上のパスワードを設定してください",
        },
      }),
      autoComplete: "new-password",
      error: errors.password,
    },
    {
      name: "password_confirmation",
      placeholder: "もう一度パスワードを入力してください",
      label: "パスワード(確認用)",
      type: "password",
      register: register("password_confirmation", {
        required: "必ず入力してください",
        validate: () =>
          watch().password_confirmation === watch().password ||
          "パスワードが異なります",
      }),
      autoComplete: "new-password",
      error: errors.password_confirmation,
    },
  ]
  const button: ButtonProps = {
    type: "submit",
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
          <AuthForm
            inputs={inputs}
            button={button}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
          />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default SignIn
