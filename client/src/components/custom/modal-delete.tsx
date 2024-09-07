import React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
} from '../ui/alert-dialog';

const DeleteConfirmationDialog = () => {
  const handleDelete = () => {
    // Logic to handle the deletion
    console.log('Item deleted');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <a>Delete</a>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this item? This action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogAction onClick={handleDelete}>Yes, Delete</AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;