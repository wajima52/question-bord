import React from "react"
import Button, { ButtonProps } from "../../Atoms/Button"
import Input, { InputProps } from "../../Atoms/Input"

type Props = {
  inputs: InputProps[]
  button: ButtonProps
}

const AuthForm: React.FC<Props> = (props) => {
  return (
    <form className="mt-8 space-y-6" method="POST" name={"auth"}>
      <div className="rounded-md shadow-sm space-y-3">
        {props.inputs.map((input, index) => (
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
