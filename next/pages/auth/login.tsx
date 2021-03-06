import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies, setCookie } from "nookies"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonProps } from "../../components/Atoms/Button"
import { InputProps } from "../../components/Atoms/Input"
import Title from "../../components/Atoms/Title"
import FormGroup from "../../components/Molecules/Form/FormGroup"
import DefaultLayout from "../../components/Templates/Layout/DefaultLayout"
import { post } from "../../utils/helpers/client"
import { Token } from "../../utils/interfaces/Token"

export type LoginFormValues = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>()
  const cookies = parseCookies()
  const router = useRouter()
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    if (process.browser) {
      try {
        const res = await post<LoginFormValues, Token>("/api/login", data, {
          headers: {
            "xsrf-token": cookies["XSRF-TOKEN"],
            "Content-Type": "application/json",
          },
        })
        setCookie(null, "token", res.token)
        await router.push("/")
      } catch (e) {
        // TODO ログインできない時のメッセージをちゃんと書く
        alert("ログインが失敗しました。もう一度入力してください")
      }
    }
  }

  const inputs: InputProps[] = [
    {
      placeholder: "メールアドレス",
      label: "メールアドレス",
      type: "email",
      autoComplete: "email",
      register: register("email", { required: true }),
    },
    {
      placeholder: "8文字以上の半角英数字",
      label: "パスワード",
      type: "password",
      autoComplete: "current-password",
      register: register("password", { required: true }),
    },
  ]

  const button: ButtonProps = {
    type: "submit",
    text: "ログイン",
  }

  return (
    <DefaultLayout>
      <div className="max-w-md w-full space-y-8">
        <Title text={"ログイン"} />
        <FormGroup
          inputs={inputs}
          button={button}
          handleSubmit={handleSubmit(onSubmit)}
        />
        <p>
          パスワードをお忘れの方は
          <Link href={"/auth/send-password-reset"}>
            <a className={"text-blue-500"}>こちら</a>
          </Link>
        </p>
      </div>
    </DefaultLayout>
  )
}

export default Login
