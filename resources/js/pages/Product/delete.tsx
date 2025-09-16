import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Delete({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
     
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setIsDeleting(true);

    router.delete(`/products/${id}`, {
      onSuccess: () => {
        setIsDeleting(false);
      },
      onError: () => {
        setIsDeleting(false);
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="destructive"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}
