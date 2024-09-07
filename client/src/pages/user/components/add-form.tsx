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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiService from '@/services/apiService'
import { message } from 'antd'

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(64, { message: 'Must be 64 or fewer characters long' }),
  password: z
    .string()
    .min(8, { message: 'Must be 8 or more characters long' })
    .max(32, { message: 'Must be 32 or fewer characters long' }),
  fullname: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(32, { message: 'Must be 32 or fewer characters long' }),
  roleName: z.string(),
})

export function AddUserForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await apiService.post('/admin/user', values)
      message.success('Create User successfully')
      setTimeout(() => {
        navigate('/user')
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
                    <Input
                      disabled={isLoading}
                      placeholder='email@example.com'
                      {...field}
                    />
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
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Nguyen Van A'
                      {...field}
                    />
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
                  <FormLabel>Level</FormLabel>
                  <Select disabled={isLoading} onValueChange={field.onChange}>
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
