'use client'

import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/text-area'
import useFetchData from '@/services/components/getData'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconCheck } from '@tabler/icons-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

interface EditFormProps extends HTMLAttributes<HTMLDivElement> {
  id: any
}

const formSchema = z.object({
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
})

export function EditForm({ id }: EditFormProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { data, error } = useFetchData(`/admin/question/${id}`)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (data) {
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

  // const handleCorrectAnswerClick = (index: number) => {
  //   setValue(`answers[${index}].isCorrectAnswer`, true);
  // };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(values)

    // try {
    //   await apiService.put(`/admin/administrator/${id}`, values)
    //   message.success('Updated successfully')
    //   setTimeout(() => {
    //     navigate("/administrators")
    //   }, 500)
    // } catch (error) {
    //   message.error(`Failed to update: ${error}`)
    //   setTimeout(() => {
    //     setIsLoading(false)
    //   }, 2000)
    // }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='gap-8 md:grid md:grid-cols-3'>
            <div className='md:col-span-2'>
              <FormField
                control={form.control}
                name='text'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea
                        className='min-h-16'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='md:col-span-1'>
              <FormField
                control={form.control}
                name='level'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Label htmlFor='level' className='text-right'>
                        Level
                      </Label>
                    </FormLabel>
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
                          <SelectItem value='highSchool'>
                            High School
                          </SelectItem>
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
            </div>
          </div>
          <Separator />
          <div className='gap-8 md:grid md:grid-cols-2'>
            <div className='flex'>
              <FormField
                control={form.control}
                name='answer1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer 1</FormLabel>
                    <FormControl>
                      <Input className='w-[622px]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                className={`relative ml-4 mt-8 h-9 w-9 ${correctAnswer1 ? 'bg-green-300' : ''}`}
                variant='outline'
                type='button'
              >
                <IconCheck className={`z-1 absolute ${correctAnswer1 ? 'text-green-600' : ''}`} />
              </Button>
            </div>
            <div className='flex'>
              <FormField
                control={form.control}
                name='answer2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer 2</FormLabel>
                    <FormControl>
                      <Input className='w-[622px]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                className={`relative ml-4 mt-8 h-9 w-9 ${correctAnswer2 ? 'bg-green-300' : ''}`}
                variant='outline'
                type='button'
              >
                <IconCheck className={`z-1 absolute ${correctAnswer2 ? 'text-green-600' : ''}`} />
              </Button>
            </div>
            <div className='flex'>
              <FormField
                control={form.control}
                name='answer3'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer 3</FormLabel>
                    <FormControl>
                      <Input className='w-[622px]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                className={`relative ml-4 mt-8 h-9 w-9 ${correctAnswer3 ? 'bg-green-300' : ''}`}
                variant='outline'
                type='button'
              >
                <IconCheck className={`z-1 absolute ${correctAnswer3 ? 'text-green-600' : ''}`} />
              </Button>
            </div>
            <div className='flex'>
              <FormField
                control={form.control}
                name='answer4'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer 4</FormLabel>
                    <FormControl>
                      <Input className='w-[622px]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                className={`relative ml-4 mt-8 h-9 w-9 ${correctAnswer4 ? 'bg-green-300' : ''}`}
                variant='outline'
                type='button'
              >
                <IconCheck className={`z-1 absolute ${correctAnswer4 ? 'text-green-600' : ''}`} />
              </Button>
            </div>

            {/* <FormField
              control={form.control}
              name='answer1'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer 1</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                  <FormLabel>Answer 4</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
