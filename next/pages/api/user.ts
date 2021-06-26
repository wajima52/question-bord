import type { NextApiRequest, NextApiResponse } from "next"
import { get } from "../../utils/helpers/client"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await get(process.env.BACKEND_URL + "/user", {
      headers: new Headers(req.headers),
    })
    res.status(200).json({ isLoggedIn: true, ...user })
  } catch (error: Error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(Number(error.message)).json({ isLoggedIn: false })
  }
}
