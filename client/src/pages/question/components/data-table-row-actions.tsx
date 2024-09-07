import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { DeleteConfirm } from '@/components/custom/delete-confirm-dialog'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <a onClick={() => navigate(`/question/edit/${row.getValue('_id')}`)}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </a>
        <a onClick={() => navigate(`/question/detail/${row.getValue('_id')}`)}>
          <DropdownMenuItem>Details</DropdownMenuItem>
        </a>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteConfirm type='question' id={row.getValue('_id')} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
