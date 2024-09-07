'use client'

import { PasswordInput } from '@/components/custom/password-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import { adminLevel } from '@/constants'
import { formatDateHours } from '@/lib/utils'
import useFetchData from '@/services/components/getData'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface DetailsFormProps extends HTMLAttributes<HTMLDivElement> {
  id: any
}

const formSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  fullname: z.string(),
  lastname: z.string(),
  level: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export function DetailsForm({ id }: DetailsFormProps) {
  const { data, isLoading, error } = useFetchData(`/admin/user/${id}`)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  useEffect(() => {
    if (data) {
      form.setValue('id', data.user._id)
      form.setValue('email', data.user.email)
      form.setValue('password', data.user.password)
      form.setValue('fullname', data.user.fullname)
      form.setValue('lastname', data.lastname)
      form.setValue('level', data.level)
      form.setValue('createdAt', data.createdAt)
      form.setValue('updatedAt', data.updatedAt)
    }
  }, [data, form])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>
  return (
    <>
      <Form {...form}>
        <form className='space-y-8'>
          <div className='gap-8 md:grid md:grid-cols-2'>
            <FormField
              control={form.control}
              name='id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fullname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name='level'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      value={
                        field.value === adminLevel.ADMINISTRATOR
                          ? 'Administrator'
                          : field.value === adminLevel.SUPER_ADMIN
                            ? 'Super Admin'
                            : field.value
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name='createdAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Join</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly value={formatDateHours(new Date(field.value))}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='updatedAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Login</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly value={formatDateHours(new Date(field.value))}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
        </form>
      </Form>
    </>
  )
}
