"use client";
import { Button } from "@/components/ui/button";
import deletePropertyAction from "../_actions/delete-property";
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
export default function DeletePropertySubmit({
  propertyId,
}: {
  propertyId: string;
}) {
  const router = useRouter();
  async function handleClick() {
    const result = await deletePropertyAction({ propertyId });
    if (result?.success && result?.property?.id) {
      toast.success("Property successfully deleted", {
        position: "top-center",
      });
      router.push("/properties/");
    } else {
      toast.error("Property could not be deleted", { position: "top-center" });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          name="delete-property"
          aria-label="Delete Property"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete property</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this property? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={handleClick}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
