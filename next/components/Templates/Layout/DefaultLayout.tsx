import { Header, HeaderProps } from "../../Organisms/Header/Header"

type Props = HeaderProps

const DefaultLayout: React.FC<Props> = ({ children, ...headerProps }) => {
  return (
    <>
      <Header {...headerProps} />
      {children}
    </>
  )
}

export default DefaultLayout
