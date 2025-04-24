'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { loginUserSchema, LoginUserSchemaType } from "@/schemas/loginUserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/services/api"

export default function LoginPage() {
  const form = useForm<LoginUserSchemaType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { handleSubmit, control } = form

  const handleOnSubmit = async (data: LoginUserSchemaType) => {
    try {
      await api.post('/login', { user: data })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-3.5 space-y-7">
      <h1 className="text-3xl">Faça seu login</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4 border p-7 rounded text-center max-w-96 w-full">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="Senha" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-center w-full justify-center gap-3">
            <Button type="submit">Entrar</Button>
            <Link href='/signup'>Não tem conta? Faça seu registro</Link>
          </div>
        </form>
      </Form>
    </div>
  )
}