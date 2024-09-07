'use client'

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
import { formatDate } from '@/lib/utils'
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
  title: z.string(),
  content: z.string(),
  description: z.string(),
  createdAt: z.date(),
})

export function DetailsForm({ id }: DetailsFormProps) {
  const { data, isLoading, error } = useFetchData(`/admin/document/${id}`)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  useEffect(() => {
    if (data) {
      form.setValue('id', data.document._id)
      form.setValue('title', data.document.title)
      form.setValue('content', data.document.content)
      form.setValue('description', data.document.description)
      form.setValue('createdAt', data.document.createdAt)
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
                  <FormLabel>Document ID</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
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
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='createdAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created At</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly value={formatDate(field.value, true)}/>
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
                    <Textarea 
                      className='min-h-[150px]'
                      {...field} 
                      readOnly 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  )
}
