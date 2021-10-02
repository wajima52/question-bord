import { Router, useRouter } from "next/router"
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

export const useUser = ({ redirectTo = "", redirectIfFound = "" }) => {
  const router = useRouter()
  const { data: user } = useSWR<User>("/api/user" as any, fetcher as any)

  useEffect(() => {
    if (redirectTo.length === 0 || !user) return

    if (
      (redirectTo && redirectIfFound.length === 0 && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])
  return user
}
