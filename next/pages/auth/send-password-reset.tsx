import { parseCookies } from "nookies"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonProps } from "../../components/Atoms/Button"
import { InputProps } from "../../components/Atoms/Input"
import Title from "../../components/Atoms/Title"
import FormGroup from "../../components/Molecules/Form/FormGroup"
import DefaultLayout from "../../components/Templates/Layout/DefaultLayout"
import { post } from "../../utils/helpers/client"
import { Token } from "../../utils/interfaces/Token"
import { LoginFormValues } from "./login"

export type PasswordResetFormValue = {
  email: string
}

const SendPasswordReset: React.FC = () => {
  const { register, handleSubmit } = useForm<PasswordResetFormValue>()
  const cookies = parseCookies()
  const inputs: InputProps[] = [
    {
      placeholder: "メールアドレス",
      label: "メールアドレス",
      type: "email",
      autoComplete: "email",
      register: register("email", { required: true }),
    },
  ]

  const onSubmit: SubmitHandler<PasswordResetFormValue> = async (data) => {
    await post<PasswordResetFormValue, Token>("/api/password-reset", data, {
      headers: {
        "xsrf-token": cookies["XSRF-TOKEN"],
        "Content-Type": "application/json",
      },
    })
  }

  const button: ButtonProps = {
    type: "submit",
    text: "次へ",
  }

  return (
    <DefaultLayout>
      <div className="max-w-md w-full space-y-8">
        <Title text={"パスワードリセット"} />
        <FormGroup
          inputs={inputs}
          button={button}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </DefaultLayout>
  )
}

export default SendPasswordReset
