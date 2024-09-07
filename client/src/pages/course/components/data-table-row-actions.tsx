import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuRadioGroup,
  // DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// import { labels } from '../data/data'
// import { taskSchema } from '../data/schema'
import { labels } from '../data/data'
import { taskSchema } from '@/data/admin-schema'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import DeleteConfirmationDialog from '@/components/custom/modal-delete'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>(
  {
    // row,
  }: DataTableRowActionsProps<TData>
) {
  // const task = taskSchema.parse(row.original)

  const navigate = useNavigate()

  function handleComingSoon() {
    navigate('/coming-soon')
  }

  function handleEdit() {
    navigate('/administrators/edit')
  }

  function handleDetails() {
    navigate('/coming-soon')
  }

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
        <a onClick={handleEdit}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </a>
        <a onClick={handleDetails}>
          <DropdownMenuItem>Details</DropdownMenuItem>
        </a>
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
        <DropdownMenuSeparator />
          {/* <a onClick={handleComingSoon}> */}
            <DropdownMenuItem>
              {/* Delete */}
              <DeleteConfirmationDialog />
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          {/* </a> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
