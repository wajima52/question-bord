import { NextRouter } from "next/dist/next-server/lib/router/router"
import { parseCookies } from "nookies"
import { UnpackNestedValue } from "react-hook-form"

async function http<T>(path: string, config: RequestInit): Promise<T> {
  const commonConfig: RequestInit = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }

  const request = new Request(path, { ...commonConfig, ...config })
  const response = await fetch(request)

  if (!response.ok) {
    throw new Error(response.status.toString())
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await response.json().catch(() => ({}))
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: "get", ...config }
  return await http<T>(path, init)
}

export async function post<T, U>(
  path: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = { method: "post", body: JSON.stringify(body), ...config }
  return await http<U>(path, init)
}

export async function submitForm<T>(
  data: UnpackNestedValue<T>,
  router: NextRouter,
  postUrl: string,
  redirectUrl?: string
) {
  if (process.browser) {
    const cookies = parseCookies()
    const isSucceeded = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "xsrf-token": cookies["XSRF-TOKEN"],
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        alert(
          "エラーが発生しました。\n申し訳ありませんが、再度ご登録をお願いいたします。"
        )
        return false
      }
      return true
    })

    if (isSucceeded && redirectUrl && redirectUrl.length > 0) {
      await router.push(redirectUrl)
    }
  }
}
