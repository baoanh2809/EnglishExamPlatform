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
// import { adminLevel } from '@/constants'
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
  createdAt: z.date(),
  updatedAt: z.date(),
  duration: z.number(),
  questions: z.string(),
  questionLength: z.number(),
})

export function DetailsForm({ id }: DetailsFormProps) {
  const { data, isLoading, error } = useFetchData(`/admin/exam/${id}`)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  useEffect(() => {
    if (data) {
      form.setValue('id', data?.exam?._id)
      form.setValue('title', data?.exam?.title)
      form.setValue('createdAt', data?.exam?.createAt)
      form.setValue('updatedAt', data?.exam?.updatedAt)
      form.setValue('duration', data?.exam?.duration)
      form.setValue('questions', data?.exam?.questions)
      form.setValue('questionLength', data?.exam?.questions?.length)
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
                  <FormLabel>Exam ID</FormLabel>
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
              name='createdAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created At</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly 
                      value={formatDate(field.value, true)}
                    />
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
                  <FormLabel>Updated At</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly 
                      value={formatDate(field.value, true)}
                    />
                  </FormControl>
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
                    <Input 
                      {...field} 
                      readOnly 
                      value={field.value + ' minutes'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='questionLength'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type='number' 
                      readOnly 
                      value={field.value}
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
