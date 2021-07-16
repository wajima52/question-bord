import Link from "next/link"
import { useState } from "react"
import { User } from "../../../utils/interfaces/User"
import ShowMobile from "../../Atoms/ShowMobile"
import ShowPc from "../../Atoms/ShowPc"
import ToggleMenu from "../../Atoms/ToggleMenu"

export type HeaderProps = {
  user?: User
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed w-full flex bg-white  items-center justify-between flex-wrap bg-teal p-6 shadow-md">
      <div className="flex items-center flex-no-shrink text-white mr-6">
        <svg
          className="h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
      </div>
      <div className="inline-flex">
        {user && user.isLoggedIn && (
          <ShowMobile>
            <p className="font-medium px-4">{user.name} さん</p>
          </ShowMobile>
        )}
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-whiten lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <ToggleMenu isOpen={isOpen}>
        <>
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
            >
              Docs
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
            >
              Examples
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white"
            >
              Blog
            </a>
          </div>
          {user && user.isLoggedIn && (
            <ShowPc>
              <p className="font-medium px-4">{user.name} さん</p>
            </ShowPc>
          )}
          {(!user || !user.isLoggedIn) && (
            <>
              <div className={"block mt-4 lg:inline-block lg:mt-0 text-center"}>
                <Link href={"/auth/login"}>
                  <a className="inline-block text-sm px-4 py-2 leading-none rounded hover:border-transparent  mt-4 lg:mt-0">
                    ログイン
                  </a>
                </Link>
                <Link href={"/auth/sign-in"}>
                  <a className="inline-block text-sm px-4 py-2 leading-none border rounded border-black hover:border-transparent hover:text-teal mx-2">
                    新規登録
                  </a>
                </Link>
              </div>
            </>
          )}
        </>
      </ToggleMenu>
    </nav>
  )
}
