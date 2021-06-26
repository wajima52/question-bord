import Error from "next/error"
import useSWR from "swr"
import { get } from "../helpers/client"
import { User } from "../interfaces/User"

const fetcher = (url: string) => get(url)

export const useUser = () => {
  const { data, error } = useSWR<User, Error>("/api/user", fetcher)
  console.log(data)
}
