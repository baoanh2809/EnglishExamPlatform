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
import apiClient from '@/services/apiClient'
import { toast } from 'react-hot-toast'
import { Card } from '@/components/ui/card'
import {
  IconCheck,
  IconHelpOctagon,
  IconPaperclip,
  IconPhotoScan,
  IconPlus,
  IconX,
} from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/text-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons'
import { Label } from '@/components/ui/label'
import apiService from '@/services/apiService'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  questionText: z.string().min(1, 'Question text is required'),
  answers: z.array(
    z.object({
      text: z.string().min(1, 'Answer text is required'),
      isCorrectAnswer: z.boolean(),
    })
  ),
  level: z.string().min(1, 'Level is required'),
})

export function AddQuestionForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: '',
      answers: [
        { text: '', isCorrectAnswer: false },
        { text: '', isCorrectAnswer: false },
        { text: '', isCorrectAnswer: false },
        { text: '', isCorrectAnswer: false },
      ],
      level: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(values);
    try {
      await apiService.post('/admin/question', values)
      message.success('Create question successfully')
      setTimeout(() => {
        navigate('/question')
      }, 500)
    } catch (error) {
      message.error(`Failed to update: ${error}`)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }

  const [questions, setQuestions] = useState([
    { id: 1, options: [{ id: 1, value: '' }] },
  ])

  const addOption = (questionId: number) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [
                ...question.options,
                { id: question.options.length + 1, value: '' },
              ],
            }
          : question
      )
    )
  }

  const removeOption = (questionId: number, optionId: number) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter(
                (option) => option.id !== optionId
              ),
            }
          : question
      )
    )
  }

  const handleInputChange = (
    questionId: number,
    optionId: number,
    value: string
  ) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.id === optionId ? { ...option, value } : option
              ),
            }
          : question
      )
    )
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, options: [{ id: 1, value: '' }] },
    ])
  }

  const removeQuestion = (questionId: number) => {
    setQuestions(questions.filter((question) => question.id !== questionId))
  }

  const handleCorrectAnswerClick = (index: any) => {
    setIsClicked(index);
    form.setValue(`answers.${index}.isCorrectAnswer`, true);
    for (let i = 0; i < 4; i++) {
      if (i !== index) {
        form.setValue(`answers.${i}.isCorrectAnswer`, false);
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='gap-8 px-5'>
            <Card>
              <div className='flex justify-between p-2'>
                <div className='flex'>
                  <Button type='button' variant='outline' className='relative h-9 w-9'>
                    <IconHelpOctagon className='z-1 absolute' />
                  </Button>
                  <div className='ml-2'>
                    <p className='text-sm'>Question</p>
                    <p className='text-xs text-gray-400'>
                      Please complete the fields and choose a correct answer
                    </p>
                  </div>
                </div>
                <Button type='submit'>Submit</Button>
              </div>
              <Separator className='shadow' />
              <div className='p-5'>
                {questions.map((question) => (
                  <Card key={question.id} className='mb-4 p-5'>
                    <div>
                      <div className='mb-2 flex space-x-2'>
                        <Button type='button' variant='outline' className='h-9 w-9'>
                          Q{question.id}
                        </Button>
                        <FormField
                          control={form.control}
                          name='questionText'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <Textarea
                                  className='!mt-0 !w-[1160px]'
                                  // disabled={isLoading} 
                                  placeholder='Enter the question text here'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type='button'
                          variant='destructive'
                          className='relative h-9 w-9'
                          onClick={() => removeQuestion(question.id)}
                        >
                          <IconX className='z-1 absolute' />
                        </Button>
                      </div>
                      <div className='mx-11 flex justify-between'>
                        <div className='flex justify-start'>
                          <ToggleGroup type='single' size='sm'>
                            <ToggleGroupItem
                              value='bold'
                              aria-label='Toggle bold'
                            >
                              <FontBoldIcon className='h-4 w-4' />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value='italic'
                              aria-label='Toggle italic'
                            >
                              <FontItalicIcon className='h-4 w-4' />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value='strikethrough'
                              aria-label='Toggle strikethrough'
                            >
                              <UnderlineIcon className='h-4 w-4' />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value='link'
                              aria-label='Toggle link'
                            >
                              <IconPaperclip className='h-4 w-4' />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value='image'
                              aria-label='Toggle image'
                            >
                              <IconPhotoScan className='h-4 w-4' />
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                        <div className='flex items-center space-x-2 mt-0'>
                          <Label htmlFor='level' className='text-right'>
                            Level
                          </Label>
                          <FormField
                            control={form.control}
                            name='level'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel></FormLabel>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className='col-span-3 h-6 w-full !mt-0'>
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
                                      <SelectItem value='IELTS'>
                                        IELTS
                                      </SelectItem>
                                      <SelectItem value='TOEIC'>
                                        TOEIC
                                      </SelectItem>
                                      <SelectItem value='TOEFL'>
                                        TOEFL
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <Separator className='shadow' />
                      <div className='mt-2 space-y-2'>
                        {question.options.map((option, index: any) => (
                          <div key={option.id} className='flex space-x-2'>
                            <Button
                              key={option.id}
                              type='button'
                              variant='outline'
                              className={`relative h-9 w-9 ${isClicked == index ? 'bg-green-300' : ''}`}
                              onClick={() => handleCorrectAnswerClick(index)}
                            >
                              <IconCheck className={`z-1 absolute ${isClicked == index ? 'text-green-600' : ''}`} />
                            </Button>
                            <FormField
                              control={form.control}
                              name={`answers.${index}.text`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel></FormLabel>
                                  <FormControl>
                                  <Input
                                    className='!mt-0 !w-[1160px]'
                                    placeholder={`Answer ${option.id}`}
                                    {...field}
                                    // value={option.value}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleInputChange(
                                        question.id,
                                        option.id,
                                        e.target.value
                                      )
                                    }
                                    }
                                  />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {/* <Input
                              className='w-full'
                              placeholder={`Answer ${option.id}`}
                              value={option.value}
                              onChange={(e) =>
                                handleInputChange(
                                  question.id,
                                  option.id,
                                  e.target.value
                                )
                              }
                            /> */}
                            <Button
                              type='button'
                              variant='destructive'
                              className='relative h-9 w-9'
                              onClick={() =>
                                removeOption(question.id, option.id)
                              }
                            >
                              <IconX className='z-1 absolute' />
                            </Button>
                          </div>
                        ))}
                        <div className='flex space-x-2'>
                          <Button
                            type='button'
                            className=''
                            onClick={() => addOption(question.id)}
                          >
                            <IconPlus className='mr-1' /> Add Option
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                <Separator className='relative mt-8 flex items-center justify-center shadow'>
                  <Button
                    type='button'
                    variant='outline'
                    className='absolute justify-center'
                    onClick={addQuestion}
                  >
                    <IconPlus className='mr-1' /> Add Question
                  </Button>
                </Separator>
              </div>
            </Card>
          </div>
        </form>
      </Form>
    </>
  )
}
