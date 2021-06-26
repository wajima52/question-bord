import DefaultLayout from "../components/Templates/Layout/DefaultLayout"
import { useUser } from "../utils/hooks/useUser"

export default function Home() {
  const user = useUser({})
  return <DefaultLayout user={user} />
}
