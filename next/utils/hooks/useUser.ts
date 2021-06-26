import Error from "next/error"
import { Router } from "next/router"
import { parseCookies } from "nookies"
import { useEffect } from "react"
import useSWR from "swr"
import { get } from "../helpers/client"
import { User } from "../interfaces/User"

const fetcher = (url: string) => {
  const cookie = parseCookies()
  return get(url, {
    headers: new Headers({
      Authorization: `Bearer ${cookie["token"]}`,
    }),
  })
}

export const useUser = ({ redirectTo = false, redirectIfFound = false }) => {
  const { data: user } = useSWR<User, Error>("/api/user", fetcher)

  useEffect(() => {
    if (!redirectTo || !user) return

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])
  return user
}
