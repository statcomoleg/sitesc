import Link from "next/link";
import { Home } from "lucide-react";
import { MeshGradient } from "@/app/components/MeshGradient";

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-dark overflow-hidden">
      <MeshGradient variant="subtle" />

      <div className="relative text-center px-4 z-10">
        <h1 className="font-[family-name:var(--font-heading)] text-8xl font-bold gradient-text">
          404
        </h1>
        <p className="mt-4 text-xl text-text font-[family-name:var(--font-heading)] font-semibold">
          Страница не найдена
        </p>
        <p className="mt-2 text-text-muted">
          К сожалению, запрашиваемая страница не существует
        </p>
        <Link
          href="/"
          className="mt-8 gradient-btn inline-flex items-center gap-2 px-6 py-3"
        >
          <Home size={18} />
          На главную
        </Link>
      </div>
    </section>
  );
}
