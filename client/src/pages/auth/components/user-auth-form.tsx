import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import apiService from '@/services/apiService'
import { zodResolver } from '@hookform/resolvers/zod'
import { message } from 'antd'
import Cookies from 'js-cookie'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(6, {
      message: 'Password must be at least 6 characters long',
    })
    .max(32, { message: 'Password must not be more than 32 characters' }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<HTMLFormElement | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  type FormData = {
    email: string
    password: string
  }

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)

    try {
      const response = await apiService.post('/api/signin', data)
      const accessToken = response.token
      Cookies.set('accesstoken', accessToken, { expires: 7 })
      localStorage.setItem('userData', JSON.stringify(response.user));
      message.success('Login Success!')
      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
    } catch (error) {
      message.error('Login Failed! Please check your email or password again')
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  })

  //HANDER ENTER LOGIN
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        formRef.current?.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        )
      }
    }

    if (formRef.current) {
      formRef.current.addEventListener('keypress', handleKeyPress)
    }

    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener('keypress', handleKeyPress)
      }
    }
  }, [])

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form ref={formRef} onSubmit={onSubmit}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={() => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder='name@example.com'
                      {...register('email', { required: 'Email is required' })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={() => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder='••••••••'
                      required
                      {...register('password', {
                        required: 'password is required',
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              Sign In
            </Button>

            {/* <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandGithub className='h-4 w-4' />}
              >
                GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandFacebook className='h-4 w-4' />}
              >
                Facebook
              </Button>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  )
}
