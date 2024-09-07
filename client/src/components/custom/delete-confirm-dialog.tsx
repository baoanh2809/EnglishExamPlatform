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
} from "@/components/ui/alert-dialog"
import apiClient from "@/services/apiClient";
import { message } from "antd";
  
interface DeleteConfirmProps {
  type: 'user' | 'exam' | 'question' | 'document';
  id: string;
}
export function DeleteConfirm({ type, id }: DeleteConfirmProps) {
  const handleDelete = async () => {
    try {
      switch (type) {
        case 'user':
          await apiClient.delete(`/api/admin/user/${id}`);
          break;
        case 'exam':
          await apiClient.delete(`/api/admin/exam/${id}`)
          break;
        case 'question':
          await apiClient.delete(`/api/admin/question/${id}`)
          break;
        case 'document':
          await apiClient.delete(`/api/admin/document/${id}`)
          break;
        default:
          throw new Error('Invalid type');
      }
      message.success(`${type} deleted successfully`);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      message.error(`Failed to delete ${type}: ${error}`);
    }
  };    
  return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <div className="text-sm px-2 py-1.5 rounded-sm hover:bg-accent">Delete</div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this {type}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-400" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  