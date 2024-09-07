'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetchData from '@/services/components/getData'
import apiService from '@/services/apiService'
import { message } from 'antd'

interface EditFormProps extends HTMLAttributes<HTMLDivElement> {
  id: any
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(64, { message: 'Must be 64 or fewer characters long' }),
  password: z
    .string()
    .min(8, { message: 'Must be 8 or more characters long' })
    // .max(32, { message: 'Must be 32 or fewer characters long' })
    ,
  fullname: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(32, { message: 'Must be 32 or fewer characters long' }),
  roleName: z.string(),
})

export function EditForm({ id }: EditFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const { data, error } = useFetchData(`/admin/user/${id}`)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (data) {
      form.setValue('email', data.user.email)
      form.setValue('password', data.user.password)
      form.setValue('fullname', data.user.fullname)
      form.setValue('roleName', data.user.role)
    }
  }, [data, form])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await apiService.put(`/admin/user/${id}`, values)
      message.success('Updated successfully')
      setTimeout(() => {
        navigate("/user")
      }, 500)
    } catch (error) {
      message.error(`Failed to update: ${error}`)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='gap-8 md:grid md:grid-cols-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display email.
                  </FormDescription>
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
                    <PasswordInput
                      disabled={isLoading}
                      placeholder='••••••••'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display password.
                  </FormDescription>
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
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display full name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='roleName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a role for User'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <FormDescription>
                      This is your public display role.
                    </FormDescription>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='student'>Student</SelectItem>
                        <SelectItem value='teacher'>Teacher</SelectItem>
                        <SelectItem value='admin'>Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  )
}
