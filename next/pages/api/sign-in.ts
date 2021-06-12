export default function handler(req, res) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  res.status(200).json({ name: "John Doe" })
}
