"use client";

import { Button } from "@/components/ui/button";
import deleteBookAction from "../_actions/delete-book";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";

export default function DeleteBookSubmit({ bookId }: { bookId: string }) {
  const router = useRouter();

  async function handleClick() {
    const result = await deleteBookAction({ bookId });
    if (result?.success && result?.book?.id) {
      toast.success("Book successfully deleted", { position: "top-center" });
      router.push("/books/");
    } else {
      toast.error("Book could not be deleted", { position: "top-center" });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          name="delete-book"
          aria-label="Delete Book"
        >
          <Trash2 />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure you want to delete this book?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your book
            and remove it from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              name="close-delete-dialog"
              aria-label="Close Delete Dialog"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleClick}
            variant="destructive"
            name="confirm-delete"
            aria-label="Confirm Delete Book"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
