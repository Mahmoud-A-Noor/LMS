"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

interface DeleteButtonProps {
  action: (formData: FormData) => void;
  data: string;
}

const DeleteButton = ({ action, data }: DeleteButtonProps) => {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={data} />
      <Button type="submit">
        <Trash2Icon />
      </Button>
    </form>
  );
};

export default DeleteButton;