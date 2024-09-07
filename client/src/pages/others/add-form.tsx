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
import { IconCheck, IconHelpOctagon, IconPaperclip, IconPhotoScan, IconPlus, IconX } from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/text-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { FontBoldIcon, FontItalicIcon, UnderlineIcon } from '@radix-ui/react-icons'

const formSchema = z.object({
  // fullname: z.string().min(2, {
  //   message: 'Username must be at least 2 characters.',
  // }),
  // email: z.string(),
  // firstname: z.string(),
  // lastname: z.string(),
  // password: z.string(),
  // level: z.any(),
  // level: z.union([z.string(), z.number()]).transform((val) => Number(val)),
})

export function AddForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    apiClient.post('/admin/administrator', values) 
      .then(response => {
        // Handle success response
        console.log('Success:', response.data.message);
        // Optionally reset form or redirect user
        setSuccess(true);
        toast.success("Create Administrator successfully");
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch(error => {
        // Handle error
        toast.error(error.message);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .finally(() => {
        // Reset loading state
        setLoading(false);
      });
  }

  const [questions, setQuestions] = useState([{ id: 1, options: [{ id: 1, value: '' }] }]);

  const addOption = (questionId: number) => {
    setQuestions(questions.map(question =>
      question.id === questionId
        ? { ...question, options: [...question.options, { id: question.options.length + 1, value: '' }] }
        : question
    ));
  };

  const removeOption = (questionId: number, optionId: number) => {
    setQuestions(questions.map(question =>
      question.id === questionId
        ? { ...question, options: question.options.filter(option => option.id !== optionId) }
        : question
    ));
  };

  const handleInputChange = (questionId: number, optionId: number, value: string) => {
    setQuestions(questions.map(question =>
      question.id === questionId
        ? {
          ...question,
          options: question.options.map(option =>
            option.id === optionId ? { ...option, value } : option
          ),
        }
        : question
    ));
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, options: [{ id: 1, value: '' }] }]);
  };

  const removeQuestion = (questionId: number) => {
    setQuestions(questions.filter(question => question.id !== questionId));
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='gap-8 px-5'>
            <Card>
              <div className='p-2 flex justify-between'>
                <div className='flex'>
                  <Button variant='outline' className='relative w-9 h-9'>
                    <IconHelpOctagon className='absolute z-1' /> 
                  </Button>
                  <div className='ml-2'>
                    <p className='text-sm'>Question</p>
                    <p className='text-xs text-gray-400'>Please complete the fields and choose a correct answer</p>
                  </div>
                </div>
                <Button className=''>Submit</Button>
              </div>
              <Separator className='shadow' />
              <div className='p-5'>
                {questions.map(question => (
                    <Card key={question.id} className='p-5 mb-4'>
                      <div>
                        <div className='flex mb-2 space-x-2'>
                          <Button variant='outline' className='w-9 h-9'>Q{question.id}</Button>
                          <Textarea 
                            placeholder='Enter the question text here'
                          />
                          <Button
                            variant='destructive'
                            className='relative w-9 h-9'
                            onClick={() => removeQuestion(question.id)}
                          >
                            <IconX className='absolute z-1' />
                          </Button>
                        </div>
                        <div className='flex justify-start ml-11'>
                          <ToggleGroup type="single" size="sm">
                            <ToggleGroupItem value="bold" aria-label="Toggle bold">
                              <FontBoldIcon className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="italic" aria-label="Toggle italic">
                              <FontItalicIcon className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                              <UnderlineIcon className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="link" aria-label="Toggle link">
                              <IconPaperclip className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="image" aria-label="Toggle image">
                              <IconPhotoScan className="h-4 w-4" />
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                        <Separator className='shadow' />
                        <div className='mt-2 space-y-2'>
                          {question.options.map(option => (
                            <div key={option.id} className='flex space-x-2'>
                              <Button variant='outline' className='relative w-9 h-9'>
                                <IconCheck className='absolute z-1' />
                              </Button>
                              <Input
                                className='w-full'
                                placeholder={`Answer ${option.id}`}
                                value={option.value}
                                onChange={(e) => handleInputChange(question.id, option.id, e.target.value)}
                              />
                              <Button
                                variant='destructive'
                                className='relative w-9 h-9'
                                onClick={() => removeOption(question.id, option.id)}
                              >
                                <IconX className='absolute z-1' />
                              </Button>
                            </div>
                          ))}
                          <div className='flex space-x-2'>
                            <Button className='' onClick={() => addOption(question.id)}>
                              <IconPlus className='mr-1' /> Add Option
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                <Separator className='relative shadow mt-8 flex justify-center items-center'>
                  <Button variant='outline' className='absolute justify-center' onClick={addQuestion}>
                    <IconPlus className='mr-1' /> Add Question
                  </Button>
                </Separator>
              </div>
            </Card>
            {/* <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='email@example.com'
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
              name='firstname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading}
                      placeholder='shadcn' 
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
              name='lastname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='shadcn' 
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      disabled={loading}
                      placeholder='••••••••' 
                      {...field} 
                    />
                    {/* <Input
                            // disabled={loading}
                            placeholder="********"
                            {...field}
                            /> */}
                  {/* </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name='level'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    disabled={loading}
                    // onValueChange={field.onChange}
                    //  value={field.value}
                    // defaultValue={field.value?.valueOf}
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.Number?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          // defaultValue={String(field.value)}
                          placeholder='Select a level for Admin'
                          
                        />
                      </SelectTrigger>
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='1'>Administrator</SelectItem>
                        <SelectItem value='3'>Super Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
