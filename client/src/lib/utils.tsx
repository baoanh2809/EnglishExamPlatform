import { DATE_FORMAT, DATE_TIME_FORMAT } from '@/constants';
import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge'
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, haveTime: boolean = false) {
  const format = haveTime ? DATE_TIME_FORMAT : DATE_FORMAT
  return dayjs(date).format(format)
}

export const formatTime = (seconds: number) => {
  const formattedDuration = dayjs.duration(seconds, 'seconds');
  return `${formattedDuration.minutes().toString().padStart(2, '0')} : ${formattedDuration.seconds().toString().padStart(2, '0')}`;
};