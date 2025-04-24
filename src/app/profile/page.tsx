import { api } from "@/services/api"
import { cookies } from 'next/headers'

export const getUser = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  const response = await api.get('/users/me', {
    headers: {
      'Authorization': `Bearer ${token?.value}`
    }
  })

  return await response.json()
}

export default async function ProfilePage() {
  const response = await getUser()

  return (
    <h1>Bem-vindo, {response.data.name}</h1>
  )
}