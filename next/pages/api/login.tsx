import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResponse = await fetch(process.env.BACKEND_URL + "/login", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  })
  console.log(apiResponse.status)
  console.log(apiResponse.json())
  // res.status(apiResponse.status).json(apiResponse.json())
}
