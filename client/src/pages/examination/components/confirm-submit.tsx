import { Button } from '@/components/custom/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import apiService from '@/services/apiService';
import { message } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConfirmSubmit({ data }: any) {
  const { id } = useParams();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  
  const transformData = (data: { [key: string]: string }) => {
    return {
      answersUser: Object.entries(data).map(([questionID, answerID]) => ({
        questionID,
        answerID,
      })),
    };
  };
  
  const handleSubmit = async () => {
    // Logic to handle the submission
    const values = transformData(data.selectedAnswers);
    console.log(values);
    console.log(id);
    try {
      await apiService.post(`/api/exam/taketest/${id}`, values)
      message.success('Submit Exam successfully')
      setTimeout(() => {
        // window.location.reload();
        navigate('/examination')
      }, 500)
    } catch (error) {
      message.error(`Failed to update: ${error}`)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size='lg' className='w-full'>
          Submit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
