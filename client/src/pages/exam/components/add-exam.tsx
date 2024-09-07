import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import apiService from '@/services/apiService'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus } from '@tabler/icons-react'
import { message } from 'antd'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required"),
  level: z
    .string()
    .min(1, "Level is required"),
  duration: z
    .string()
    .min(1, "Duration is required"),
})

export const AddExam = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await apiService.post('/admin/exam', values)
      message.success('Create Exam successfully')
      setTimeout(() => {
        window.location.reload();
      }, 500)
    } catch (error) {
      message.error(`Failed to update: ${error}`)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IconPlus />
          Add Exam
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Exam</DialogTitle>
          <DialogDescription>
            Enter the information below. Click Submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='title' className='text-right'>
                  Title
                </Label>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className='col-span-3 !mt-0 !w-[275px]'
                          placeholder='Enter exam title'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='duration' className='text-right'>
                  Durations
                </Label>
                <FormField
                  control={form.control}
                  name='duration'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className='col-span-3 !mt-0 !w-[275px]'
                          placeholder='1'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='level' className='text-right'>
                  Level
                </Label>
                <FormField
                  control={form.control}
                  name='level'
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className='col-span-3 !mt-0 !w-[275px]'>
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
            <DialogFooter>
              <Button type='submit'>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
  // return (
  //   <Dialog>
  //     <DialogTrigger asChild>
  //       <Button>
  //         <IconPlus />
  //         Add Exam
  //       </Button>
  //     </DialogTrigger>
  //     <DialogContent className='sm:max-w-[425px]'>
  //       <DialogHeader>
  //         <DialogTitle>Add Exam</DialogTitle>
  //         <DialogDescription>
  //           Enter the information below. Click Submit when you're done.
  //         </DialogDescription>
  //       </DialogHeader>
  //       <div className='grid gap-4 py-4'>
  //         <div className='grid grid-cols-4 items-center gap-4'>
  //           <Label htmlFor='title' className='text-right'>
  //             Title
  //           </Label>
  //           <Input id='title' placeholder='Exam Name' className='col-span-3' />
  //         </div>
  //         <div className='grid grid-cols-4 items-center gap-4'>
  //           <Label htmlFor='duration' className='text-right'>
  //             Durations
  //           </Label>
  //           <Input
  //             id='duration'
  //             placeholder='1'
  //             className='col-span-3'
  //           />
  //         </div>
  //         <div className='grid grid-cols-4 items-center gap-4'>
  //           <Label htmlFor='level' className='text-right'>
  //             Level
  //           </Label>
  //           <Select>
  //             <SelectTrigger className='col-span-3 w-full'>
  //               <SelectValue placeholder='Select a level' />
  //             </SelectTrigger>
  //             <SelectContent>
  //               <SelectGroup>
  //                 <SelectItem value='primarySchool'>Primary School</SelectItem>
  //                 <SelectItem value='secondarySchool'>
  //                   Secondary School
  //                 </SelectItem>
  //                 <SelectItem value='highSchool'>High School</SelectItem>
  //                 <SelectItem value='IELTS'>IELTS</SelectItem>
  //                 <SelectItem value='TOEIC'>TOEIC</SelectItem>
  //                 <SelectItem value='TOEFL'>TOEFL</SelectItem>
  //               </SelectGroup>
  //             </SelectContent>
  //           </Select>
  //         </div>
  //       </div>
  //       <DialogFooter>
  //         <Button type='submit'>Submit</Button>
  //       </DialogFooter>
  //     </DialogContent>
  //   </Dialog>
  // )
}
