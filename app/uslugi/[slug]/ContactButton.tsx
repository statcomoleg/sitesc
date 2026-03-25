"use client";

import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/app/components/ContactModal";

export function ContactButton({ serviceSlug }: { serviceSlug: string }) {
  const { openModal } = useContactModal();

  return (
    <button
      onClick={() => openModal(serviceSlug)}
      className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg"
    >
      Оставить заявку
      <ArrowRight size={18} />
    </button>
  );
}
