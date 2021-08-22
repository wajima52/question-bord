import { parseCookies } from "nookies"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonProps } from "../../components/Atoms/Button"
import { InputProps } from "../../components/Atoms/Input"
import FormGroup from "../../components/Molecules/Form/FormGroup"
import DefaultLayout from "../../components/Templates/Layout/DefaultLayout"
import { post } from "../../utils/helpers/client"
import { Token } from "../../utils/interfaces/Token"
import { LoginFormValues } from "./login"

const SendPasswordReset: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>()
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

  const onSubmit: SubmitHandler<LoginFormValues> = async () => {
    // TODO
    await post<LoginFormValues, Token>("", data, {
      headers: {
        "xsrf-token": cookies["XSRF-TOKEN"],
        "Content-Type": "application/json",
      },
    })
  }

  const button: ButtonProps = {
    type: "submit",
    text: "パスワードリセットメールを送信する",
  }

  return (
    <DefaultLayout>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            パスワードリセット
          </h2>
        </div>
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
