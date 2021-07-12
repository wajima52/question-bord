import React from "react"
import { Header, HeaderProps } from "../../Organisms/Header/Header"

type Props = HeaderProps

const DefaultLayout: React.FC<Props> = ({ children, ...headerProps }) => {
  return (
    <>
      <Header {...headerProps} />
      <div className={"pt-20"}>{children}</div>
    </>
  )
}

export default DefaultLayout
