import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react';

export default function QuestionCard({ question, setQuestionData }: any) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  // setQuestionData(selectedAnswers);
  const handleAnswerChange = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
    setQuestionData({ ...question, selectedAnswers: { ...selectedAnswers, [questionId]: answerId } });
  };
  // console.log(selectedAnswers)
  return (
    <>
      <div className='w-full px-5 font-medium'>
        {question.text || 'Loading...'}
      </div>
      <div className='w-full p-5'>
        <RadioGroup 
          key={`question-${question._id}`}
          value={selectedAnswers[question._id] || ''}
          onValueChange={(value) => handleAnswerChange(question._id, value)}
        >
          {question?.answers?.map((answer: any, index: any) => (
            <div
              key={`radio-group-item-${index}`}
              className='flex items-center space-x-2'
            >
              <RadioGroupItem
                value={answer?._id}
                id={`option-${answer?._id}`}
              />
              <Label htmlFor={`option-${index}`}>{answer?.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  )
}
