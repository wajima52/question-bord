import { GetServerSideProps } from "next"
import { setCookie } from "nookies"
import DefaultLayout from "../../../../components/Templates/Layout/DefaultLayout"
import { get } from "../../../../utils/helpers/client"

type Props = {
  result: "duplicated" | "error"
}

const EmailVerify: React.FC<Props> = (props) => {
  return (
    <DefaultLayout>
      {props.result === "duplicated" &&
        "既に確認済みです。ログイン画面からログインしてください"}
      {props.result === "error" &&
        "エラーが発生しました。再度メールを確認してください"}
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const verifyResult = await get<{ token: string }>(
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
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const result = error.message === "409" ? "duplicated" : "error"
    return {
      props: {
        result: result,
      } as Props,
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  }
}

export default EmailVerify
