import { useRouter } from "next/router"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonProps } from "../../../components/Atoms/Button"
import { InputProps } from "../../../components/Atoms/Input"
import Title from "../../../components/Atoms/Title"
import FormGroup from "../../../components/Molecules/Form/FormGroup"
import DefaultLayout from "../../../components/Templates/Layout/DefaultLayout"
import { submitForm } from "../../../utils/helpers/client"

export type NewPasswordFormValue = {
  password: string
  password_confirmation: string
  mail: string
  token: string
}

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordFormValue>()
  const inputs: InputProps[] = [
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
  const router = useRouter()
  const onSubmit: SubmitHandler<NewPasswordFormValue> = async (data) => {
    const isSucceeded = await submitForm<NewPasswordFormValue>(
      {
        ...data,
        mail: String(router.query.email),
        token: String(router.query.token),
      },
      "/api/update-password"
    )
      .then((response) => {
        if (response.ok) {
          alert(
            "パスワードリセットが成功しました。\nログインページにリダイレクトします"
          )
        }
        return response.ok
      })
      .catch(() => {
        alert(
          "エラーが発生しました。\n申し訳ありませんが、再度パスワードリセット操作を行ってください"
        )
      })

    if (isSucceeded) {
      await router.push("/auth/login")
    }
  }

  const button: ButtonProps = {
    type: "submit",
    text: "パスワードを更新する",
  }

  return (
    <DefaultLayout>
      <div className="max-w-md w-full space-y-8">
        <Title text={"パスワードリセット"} />
        新しいパスワードを入力してください
        <FormGroup
          inputs={inputs}
          button={button}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
        />
      </div>
    </DefaultLayout>
  )
}

export default ResetPassword
