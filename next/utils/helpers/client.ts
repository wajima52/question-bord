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
