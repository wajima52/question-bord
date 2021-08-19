import { GetServerSideProps } from "next"
import { setCookie } from "nookies"
import DefaultLayout from "../../../../components/Templates/Layout/DefaultLayout"
import { get } from "../../../../utils/helpers/client"

const EmailVerify: React.FC = () => {
  return (
    <DefaultLayout>
      メールアドレスを確認中です。 少しお待ちください
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const verifyResult = await get(
    process.env.BACKEND_URL +
      `/email/verification/${String(context.query.id)}/${String(
        context.query.hash
      )}?expires=${String(context.query.expires)}&signature=${String(
        context.query.signature
      )}`
  )

  setCookie(context, "token", verifyResult.token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  })

  return { props: {} }
}

export default EmailVerify
