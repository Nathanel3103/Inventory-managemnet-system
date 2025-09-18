 
import React from "react";
import { Link } from "@inertiajs/react";

interface PaginationProps {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export default function Pagination({ links }: PaginationProps) {
  if (!links.length) return null;

  return (
    <div className="flex space-x-2 mt-4">
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.url ?? "#"}
          dangerouslySetInnerHTML={{ __html: link.label }}
          className={`px-3 py-1 rounded border transition-colors ${
            link.active
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
