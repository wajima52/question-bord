import { useRouter } from "next/router"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonProps } from "../../components/Atoms/Button"
import { InputProps } from "../../components/Atoms/Input"
import Title from "../../components/Atoms/Title"
import FormGroup from "../../components/Molecules/Form/FormGroup"
import DefaultLayout from "../../components/Templates/Layout/DefaultLayout"
import { submitForm } from "../../utils/helpers/client"

export type SignInFormValues = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const SignIn: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInFormValues>()
  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    const isSucceeded = await submitForm(data, "/api/sign-in").then(
      (response) => {
        if (!response.ok) {
          alert(
            "エラーが発生しました。\n申し訳ありませんが、再度ご登録をお願いいたします。"
          )
        }
        return response.ok
      }
    )

    if (isSucceeded) {
      await router.push("/")
    }
  }
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
  }

  return (
    <DefaultLayout>
      <div className="max-w-md w-full space-y-8">
        <Title text={"新規会員登録"} />
        <FormGroup
          inputs={inputs}
          button={button}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </DefaultLayout>
  )
}

export default SignIn
