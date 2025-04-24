'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createUserSchema, CreateUserSchemaType } from "schemas/createUserSchema"
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
import { api } from "@/services/api"
import Link from "next/link"

export default function SignUpPage() {
  const form = useForm<CreateUserSchemaType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      name: '',
      password: ''
    }
  })

  const { handleSubmit, control } = form

  const handleOnSubmit = async (data: CreateUserSchemaType) => {
    try {
      await api.post('/signup',
        {
          user: data
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-3.5 space-y-7">
      <h1 className="text-3xl">Faça seu registro</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4 border p-7 rounded text-center max-w-96 w-full">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            <Button type="submit">Registrar-se</Button>
            <Link href='/login'>Já tem conta? Faça login</Link>
          </div>
        </form>
      </Form>
    </div>
  )
}