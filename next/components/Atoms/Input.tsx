import React from "react"
import { UseFormRegister } from "react-hook-form"

export type InputProps = {
  label: string
  register: UseFormRegister<any>
  required: boolean
  type: string
  name: string
  placeholder: string
  autoComplete?: string
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        {...props.register(props.name, { required: props.required })}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        type={props.type}
      />
    </div>
  )
}

export default Input
