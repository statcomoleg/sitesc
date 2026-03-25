"use client";

import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/app/components/ContactModal";

export function CaseContactButton() {
  const { openModal } = useContactModal();

  return (
    <button
      onClick={() => openModal()}
      className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg"
    >
      Получить такой же результат
      <ArrowRight size={18} />
    </button>
  );
}
