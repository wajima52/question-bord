import React from "react"
import { FieldErrors, SubmitHandler } from "react-hook-form"
import Button, { ButtonProps } from "../../Atoms/Button"
import Input, { InputProps } from "../../Atoms/Input"

class TSubmitFieldValues {}

type Props = {
  inputs: InputProps[]
  button: ButtonProps
  handleSubmit: SubmitHandler<TSubmitFieldValues>
}

const AuthForm: React.FC<Props> = (props) => {
  return (
    <form
      className="mt-8 space-y-6"
      method="POST"
      onSubmit={props.handleSubmit}
    >
      <div className="rounded-md shadow-sm space-y-3">
        {props.inputs.map((input, index) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <Input {...input} key={index} />
        ))}
      </div>

      <div>
        <Button {...props.button} />
      </div>
    </form>
  )
}

export default AuthForm
