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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuizDeleteButton({ id }: { id: string }) {
  const navigate = useNavigate();

  async function handleDelete() {
    const resp = await fetch(`http://localhost:3000/quizzes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (resp.status == 200) {
      navigate("/dashboard");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="w-full">
          <Trash2Icon />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your quiz
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={"destructive"} onClick={handleDelete}>
              <Trash2Icon />
              <span>Delete</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default QuizDeleteButton;
