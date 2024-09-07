'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
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
  level: z.string(),
  text: z.string(),
  answer1: z.string(),
  answer2: z.string(),
  answer3: z.string(),
  answer4: z.string(),
  correctAnswer1: z.string(),
  correctAnswer2: z.string(),
  correctAnswer3: z.string(),
  correctAnswer4: z.string(),
  createdAt: z.string(),
})

export function DetailsForm({ id }: DetailsFormProps) {
  const { data, isLoading, error } = useFetchData(`/admin/question/${id}`)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (data) {
      form.setValue('id', data?.question?._id)
      form.setValue('level', data?.question?.level)
      form.setValue('text', data?.question?.text)
      form.setValue('answer1', data?.question?.answers[0]?.text || '')
      form.setValue('answer2', data?.question?.answers[1]?.text || '')
      form.setValue('answer3', data?.question?.answers[2]?.text || '')
      form.setValue('answer4', data?.question?.answers[3]?.text || '')
      form.setValue('correctAnswer1', data?.question?.answers[0]?.isCorrectAnswer)
      form.setValue('correctAnswer2', data?.question?.answers[1]?.isCorrectAnswer)
      form.setValue('correctAnswer3', data?.question?.answers[2]?.isCorrectAnswer)
      form.setValue('correctAnswer4', data?.question?.answers[3]?.isCorrectAnswer)
    }
  }, [data, form])

  const correctAnswer1 = form.getValues('correctAnswer1')
  const correctAnswer2 = form.getValues('correctAnswer2')
  const correctAnswer3 = form.getValues('correctAnswer3')
  const correctAnswer4 = form.getValues('correctAnswer4')

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
                  <FormLabel>Question ID</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
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
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='text'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className='gap-8 md:grid md:grid-cols-2'>
            <FormField
              control={form.control}
              name='answer1'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer 1</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className={correctAnswer1 ? 'bg-green-500' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='answer2'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer 2</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className={correctAnswer2 ? 'bg-green-500' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='answer3'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer 3</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly 
                      className={correctAnswer3 ? 'bg-green-500' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='answer4'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer 4</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly 
                      className={correctAnswer4 ? 'bg-green-500' : ''}  
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
