import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MessageCircle, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Кредитные каникулы на срок до 12 месяцев | Стат-Кредит",
  description:
    "Законный способ 2026 года получить кредитные каникулы на срок до 1 года. Подходит каждому гражданину РФ без действующих просрочек.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://stat-credit.ru/kanikuly" },
};

const MAX_URL =
  "https://max.ru/u/f9LHodD0cOJ11pks5l0x3i98PQoxjhHPspPT0dybrKzYGrI5lgHMD6waPqM";
const TG_URL = "https://t.me/olegbanki";

function MessengerBlock() {
  return (
    <div className="relative gradient-border !rounded-3xl overflow-hidden my-12 sm:my-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-sand/[0.04] pointer-events-none" />
      <div className="relative px-6 sm:px-10 py-8 sm:py-10 text-center">
        <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Свяжитесь с нами в мессенджере, чтобы узнать подробнее про условия и
          определить, подходите ли вы под кредитные каникулы
        </p>
        <ChevronDown
          size={24}
          className="mx-auto mt-3 text-primary animate-bounce"
        />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={MAX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-primary/15 border border-primary/30 text-primary font-semibold hover:bg-primary/25 hover:border-primary/50 transition-all duration-200 text-sm sm:text-base"
          >
            <MessageCircle size={20} />
            Написать в MAX
          </a>
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#2AABEE]/15 border border-[#2AABEE]/30 text-[#2AABEE] font-semibold hover:bg-[#2AABEE]/25 hover:border-[#2AABEE]/50 transition-all duration-200 text-sm sm:text-base"
          >
            <Send size={20} />
            Написать в Телеграм
          </a>
        </div>
      </div>
    </div>
  );
}

export default function KanikulyPage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity shrink-0"
          >
            СТАТКРЕДИТ
          </Link>
          <p className="text-text-muted text-sm text-right hidden sm:block">
            Финансовая помощь для граждан РФ
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <article className="relative py-12 sm:py-16 overflow-hidden">
          {/* Decorative background blobs */}
          <div className="pointer-events-none">
            <div className="fixed top-[10%] right-[5%] w-80 h-80 border border-white/[0.03] rounded-full animate-[float_16s_ease-in-out_infinite]" />
            <div className="fixed bottom-[20%] left-[3%] w-96 h-96 border border-white/[0.02] rounded-full animate-[floatSlow_12s_ease-in-out_infinite]" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

            {/* Hero heading */}
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-2 px-5 py-2 glass-card !rounded-full text-sand text-xs sm:text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 bg-sand rounded-full animate-[pulse-glow_2s_ease-in-out_infinite]" />
                Законный способ 2026 года
              </span>
              <h1 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,4vw,2.6rem)] font-bold text-text leading-tight">
                Как получить кредитные каникулы на срок до{" "}
                <span className="gradient-text">12 месяцев</span>, если вы не
                справляетесь с платежами по кредитам, займам, ипотекам и
                автокредитам?
              </h1>

              {/* Badge */}
              <div className="mt-6 inline-block rounded-2xl border border-primary/25 bg-primary/[0.07] px-5 py-3 sm:px-7 sm:py-4 text-sm sm:text-base text-text leading-relaxed max-w-2xl">
                Законный способ 2026 года, который подходит каждому гражданину
                РФ <span className="text-primary font-semibold">без действующих просрочек</span>
              </div>
            </div>

            {/* Intro text */}
            <div className="prose-custom space-y-5 text-text-muted text-sm sm:text-base leading-relaxed">
              <p>
                До сих пор миллионы человек по всей стране не знают о том, что
                имеют право получить кредитные каникулы сроком до 1 года на
                основании{" "}
                <span className="text-text font-medium">
                  102, 353 и 377 ФЗ Российской федерации
                </span>
                .
              </p>
              <p>
                И самое главное, этот закон действует на{" "}
                <span className="text-text font-medium">
                  любой кредит, займ или ипотеку
                </span>{" "}
                в любой банковской или микрофинансовой организации.
              </p>
            </div>

            {/* Section: Что это даёт */}
            <div className="mt-12 sm:mt-16">
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.2rem,3vw,1.7rem)] font-bold text-text mb-4">
                Что это даёт?
              </h2>
              <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed">
                <p>
                  После подключения кредитных каникул вы освобождаетесь от
                  любых платежей по своим долговым обязательствам перед банками
                  и МФО на весь срок отсрочки. При этом{" "}
                  <span className="text-text font-medium">
                    сумма долга не увеличивается, штрафы не начисляются и
                    кредитный рейтинг не меняется
                  </span>
                  .
                </p>
                <p>
                  Кредитные каникулы — это законный способ расслабиться,
                  создать новые источники дохода и по истечению отсрочки с
                  новыми силами заняться решением своих финансовых вопросов.
                </p>
              </div>
            </div>

            {/* Image 1 */}
            <div className="mt-10 rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/kk1.png"
                alt="Кредитные каникулы — результаты клиентов"
                width={900}
                height={600}
                className="w-full h-auto object-cover pointer-events-none select-none"
                sizes="(max-width: 768px) 100vw, 900px"
                draggable={false}
              />
            </div>

            {/* Messenger block 1 */}
            <MessengerBlock />

            {/* Section: Каникулы на все долги */}
            <div className="mt-4">
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.2rem,3vw,1.7rem)] font-bold text-text mb-3">
                Каникулы распространяются на все долги, которые вы выберете сами
              </h2>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                Например, у вас есть ипотека в Сбербанке, кредитная карта в
                Т-банке и 2 микрозайма. Кредитные каникулы можно поставить
                сразу на все эти продукты или выборочно (например, только на
                микрозаймы и кредитную карту).
              </p>
            </div>

            {/* Section: Единственное условие */}
            <div className="mt-12 sm:mt-16">
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.2rem,3vw,1.7rem)] font-bold text-text mb-3">
                Единственное условие получения кредитных каникул на срок до 1 года…
              </h2>
              <h3 className="text-primary font-semibold text-lg sm:text-xl mb-4">
                Отсутствие действующих просрочек
              </h3>
            </div>

            {/* Image 2 */}
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/kk2.png"
                alt="Условие кредитных каникул — отсутствие просрочек"
                width={900}
                height={600}
                className="w-full h-auto object-cover pointer-events-none select-none"
                sizes="(max-width: 768px) 100vw, 900px"
                draggable={false}
              />
            </div>

            {/* Messenger block 2 */}
            <MessengerBlock />

            {/* Section: Просрочки */}
            <div className="mt-4 space-y-4 text-text-muted text-sm sm:text-base leading-relaxed">
              <p>
                Если у вас есть действующие просрочки в банке и продуктах, на
                которые вы хотите взять отсрочку, для начала вам необходимо
                закрыть эту просрочку.
              </p>
              <p>
                Но если, например, у вас в первом банке с кредитом есть
                просрочка, а во втором банке с ипотекой/кредитом просрочки нет,
                то на него можно взять отсрочку. И когда вы закроете просрочку
                в первом банке, вы можете отправить заявление на получение в
                нём кредитных каникул.
              </p>
            </div>

            {/* Section: Самостоятельно */}
            <div className="mt-12 sm:mt-16">
              <h3 className="font-[family-name:var(--font-heading)] text-[clamp(1.1rem,2.5vw,1.5rem)] font-semibold text-text mb-4">
                Можно ли взять кредитные каникулы самостоятельно?
              </h3>
              <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed">
                <p>
                  Да, но так как банковским и финансовым организациям невыгодно
                  следовать закону РФ о кредитных каникулах, процесс оформления
                  отсрочек может занять у вас{" "}
                  <span className="text-text font-medium">
                    несколько недель
                  </span>{" "}
                  и потребует немало терпения, сил и внимательности.
                </p>
                <p>
                  Кредитные каникулы регулируются минимум{" "}
                  <span className="text-text font-medium">
                    5 федеральными законами РФ
                  </span>
                  , в которых предварительно вам нужно досконально разобраться,
                  чтобы подготовить свою заявку на получение отсрочки. При этом
                  будьте готовы, что банк будет навязывать реструктуризацию или
                  рефинансирование, чтобы не «терять прибыль». А из-за частых
                  ошибок в подготовке документов, банки отказывают в каникулах
                  и из-за этого срываются сроки, в которые вы имеете право
                  подать заявку на каникулы и не попасть в просрочку.
                </p>
              </div>
            </div>

            {/* Image 3 */}
            <div className="mt-10 rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/kk3.png"
                alt="Кредитные каникулы — процесс оформления"
                width={900}
                height={600}
                className="w-full h-auto object-cover pointer-events-none select-none"
                sizes="(max-width: 768px) 100vw, 900px"
                draggable={false}
              />
            </div>

            {/* Messenger block 3 */}
            <MessengerBlock />

            {/* Section: Мы поможем */}
            <div className="mt-4">
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.2rem,3vw,1.8rem)] font-bold text-text leading-tight mb-4">
                Но мы можем вам помочь гарантированно получить кредитные
                каникулы на срок до{" "}
                <span className="gradient-text">12 месяцев</span>
              </h2>
              <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed">
                <p>
                  Мы помогли уже десяткам клиентов, чьи результаты вы видите на
                  этой странице. Мы под ключ готовим документы и помогаем вам
                  подать заявку, чтобы со{" "}
                  <span className="text-text font-medium">
                    100% гарантией
                  </span>{" "}
                  вы получили кредитные каникулы.
                </p>
                <p>
                  Вся работа проводится строго по договору с прописанными
                  обязательствами и гарантиями.
                </p>
                <p>
                  Единственное условие: у вас не должно быть действующих
                  просрочек в том банке и продукте, на который вы хотите
                  поставить кредитные каникулы.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-sand/20 bg-sand/[0.05] px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-text text-sm sm:text-base leading-relaxed font-medium">
                  Средняя стоимость нашей услуги в разы меньше, чем ваш
                  ежемесячный платёж. И это даёт вам возможность{" "}
                  <span className="text-sand">
                    не платить по кредитам без последствий в срок до 1 года
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Messenger block 4 */}
            <MessengerBlock />

            {/* Image 4 */}
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/kk4.png"
                alt="Кредитные каникулы — результаты работы Стат-Кредит"
                width={900}
                height={600}
                className="w-full h-auto object-cover pointer-events-none select-none"
                sizes="(max-width: 768px) 100vw, 900px"
                draggable={false}
              />
            </div>

            {/* Final CTA */}
            <MessengerBlock />

          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="text-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-lg font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            СТАТКРЕДИТ
          </Link>
          <p className="mt-2 text-text-muted/50 text-sm">
            &copy; {new Date().getFullYear()} Стат-Кредит
          </p>
        </div>
      </footer>
    </div>
  );
}
