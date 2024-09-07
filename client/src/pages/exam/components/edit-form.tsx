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
  title: z.string().min(1, { message: 'Title is required' }),
  duration: z.string().min(1, { message: 'Duration is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
})

export function EditForm({ id }: EditFormProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { data, error } = useFetchData(`/admin/exam/${id}`)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (data) {
      form.setValue('title', data.exam.title)
      form.setValue('duration', data.exam.duration)
      form.setValue('level', data.exam.level)
    }
  }, [data, form])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await apiService.put(`/admin/exam/${id}`, values)
      message.success('Updated Exam successfully')
      setTimeout(() => {
        navigate("/exam")
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
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormDescription>This is your title of exam.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='level'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='col-span-3 h-9 w-full'>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a level'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='primarySchool'>
                          Primary School
                        </SelectItem>
                        <SelectItem value='secondarySchool'>
                          Secondary School
                        </SelectItem>
                        <SelectItem value='highSchool'>High School</SelectItem>
                        <SelectItem value='IELTS'>IELTS</SelectItem>
                        <SelectItem value='TOEIC'>TOEIC</SelectItem>
                        <SelectItem value='TOEFL'>TOEFL</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='duration'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durations</FormLabel>
                  <FormControl>
                    <Input type='number' disabled={isLoading} {...field} />
                  </FormControl>
                  <FormDescription>This is your time of exam.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
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
                    This is your public display name.
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
                    This is your public display name.
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
                      This is your public display name.
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
            /> */}
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  )
}
