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

const formSchema = z.object({
  // fullname: z.string().min(2, {
  //   message: 'Username must be at least 2 characters.',
  // }),
  email: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
  level: z.any(),
  // level: z.union([z.string(), z.number()]).transform((val) => Number(val)),
})

export function TeacherForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      level: 1,
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
            />
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  )
}
