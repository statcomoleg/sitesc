"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { X, Send, ChevronDown } from "lucide-react";
import { visibleServices } from "@/app/data/services";

interface ContactModalContextType {
  openModal: (preselectedService?: string) => void;
}

const ContactModalContext = createContext<ContactModalContextType>({
  openModal: () => {},
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const openModal = useCallback((preselectedService?: string) => {
    if (preselectedService) setSelectedService(preselectedService);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setName("");
    setPhone("");
    setSelectedService("");
    setSubmitted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeModal]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
    
    let formatted = "+7";
    if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ")";
    if (digits.length > 4) formatted += " " + digits.slice(4, 7);
    if (digits.length > 7) formatted += "-" + digits.slice(7, 9);
    if (digits.length > 9) formatted += "-" + digits.slice(9, 11);
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, "");
    if (!digits.startsWith("7")) digits = "7" + digits;
    if (digits.length > 11) digits = digits.slice(0, 11);
    setPhone(formatPhone(digits));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <ContactModalContext.Provider value={{ openModal }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Связаться с нами"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-[fadeIn_200ms_ease-out]"
            onClick={closeModal}
          />

          <div
            ref={modalRef}
            className="relative w-full max-w-md gradient-border animate-[scaleIn_200ms_ease-out] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary to-sand p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white">
                  Связаться с нами
                </h2>
                <button
                  onClick={closeModal}
                  className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Закрыть"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="mt-1 text-white/80 text-sm">
                Оставьте заявку и мы свяжемся с вами
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-dark-card">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-text mb-1.5"
                  >
                    Имя <span className="text-primary">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 border border-white/[0.08] rounded-xl text-text bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-200 placeholder:text-text-muted/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-text mb-1.5"
                  >
                    Телефон <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 border border-white/[0.08] rounded-xl text-text bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-200 placeholder:text-text-muted/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-service"
                    className="block text-sm font-medium text-text mb-1.5"
                  >
                    Услуга{" "}
                    <span className="text-text-muted">(необязательно)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact-service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className={`contact-service-select w-full pl-4 pr-11 py-3 border border-white/[0.1] rounded-xl bg-dark-lighter focus:outline-none focus:ring-2 focus:ring-primary/35 focus:border-primary/35 transition-all duration-200 cursor-pointer appearance-none font-medium ${
                        selectedService ? "gradient-text" : "text-text-muted"
                      }`}
                    >
                      <option value="">Выберите услугу</option>
                      {visibleServices.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.title}
                        </option>
                      ))}
                      <option value="other">Другое</option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/70"
                      aria-hidden
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 gradient-btn px-6 py-3.5 mt-2"
                >
                  <Send size={18} />
                  Отправить заявку
                </button>
              </form>
            ) : (
              <div className="p-8 text-center bg-dark-card">
                <div className="w-16 h-16 mx-auto mb-4 glass-card !rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text">
                  Заявка отправлена!
                </h3>
                <p className="mt-2 text-text-muted text-sm">
                  Мы свяжемся с вами в ближайшее время
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 gradient-btn px-6 py-2.5"
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </ContactModalContext.Provider>
  );
}
