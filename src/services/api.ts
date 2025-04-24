const baseURL = process.env.NEXT_PUBLIC_API_URL

const post = async <T = undefined>(endpoint: string | URL | globalThis.Request, body?: T | null) => {
  const bodyInit = body as BodyInit

  return await fetch(`${baseURL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyInit),
    credentials: 'include',
    mode: 'cors'
  })
}

const get = async (endpoint: string | URL | globalThis.Request, config: RequestInit) => {

  return await fetch(`${baseURL}${endpoint}`, { method: 'GET', ...config })
}

export const api = {
  post,
  get
}