import { Header } from "../../Organisms/Header/Header"

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default DefaultLayout
