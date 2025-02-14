import { EditIcon } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import QuizDeleteButton from "./QuizDeleteButton";

interface CardProps extends React.ComponentProps<typeof Card> {
  title: string;
  created_at: Date;
  description: string;
  quizId: string;
}

export function QuizCard({
  title,
  created_at,
  description,
  quizId,
  className,
  ...props
}: CardProps) {
  return (
    <Card className={cn("w-full md:max-w-[280px]", className)} {...props}>
      <CardHeader>
        <CardTitle>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {title}
          </h4>
        </CardTitle>
        <CardDescription>
          <span>
            Created on <span>{formatDate(created_at)}</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="-mt-4 text-wrap text-secondary">
        <div className="font-medium">{description}</div>
      </CardContent>
      <CardFooter className="gap-4">
        <Button className="w-full" asChild>
          <Link to={`/edit-quiz/${quizId}`}>
            <EditIcon />
            <span>Edit</span>
          </Link>
        </Button>
        <QuizDeleteButton id={quizId} />
      </CardFooter>
    </Card>
  );
}

export default QuizCard;
