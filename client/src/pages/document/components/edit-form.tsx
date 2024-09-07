'use client'

import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/text-area'
import apiService from '@/services/apiService'
import useFetchData from '@/services/components/getData'
import { zodResolver } from '@hookform/resolvers/zod'
import { message } from 'antd'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

interface EditFormProps extends HTMLAttributes<HTMLDivElement> {
  id: any
}

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
  description: z.string(),
})

export function EditForm({ id }: EditFormProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { data, error } = useFetchData(`/admin/document/${id}`)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (data) {
      form.setValue('title', data.document.title)
      form.setValue('content', data.document.content)
      form.setValue('description', data.document.description)
    }
  }, [data, form])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await apiService.put(`/admin/document/${id}`, values)
      message.success('Updated successfully')
      setTimeout(() => {
        navigate('/document')
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='gap-8 md:grid md:grid-cols-1'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea className='min-h-[150px]' {...field} />
                  </FormControl>
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
