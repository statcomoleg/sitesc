import type { Metadata } from "next";
import { MeshGradient } from "@/app/components/MeshGradient";
import { ReviewGallery } from "@/app/components/ReviewGallery";

export const metadata: Metadata = {
  title: "История Михаила: 5 млн из-за границы",
  description:
    "Личный кейс: как получить одобрение почти на 5 млн рублей в банках РФ, находясь в 10 000+ километров от России.",
  alternates: { canonical: "https://stat-credit.ru/mexico" },
};

const mexicoLifeImages = ["/mexico/kr1.jpg", "/mexico/kr2.jpg", "/mexico/kr3.jpg"];
const resultImages = ["/reviews/ot2.png", "/reviews/ot22.png", "/reviews/ot222.png", "/reviews/ot2222.png"];

export default function MexicoStoryPage() {
  return (
    <article className="relative py-20 sm:py-28 bg-dark overflow-hidden">
      <MeshGradient variant="subtle" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <h1 className="font-[family-name:var(--font-heading)] text-[clamp(1.9rem,4.5vw,3.2rem)] leading-tight font-bold text-text">
          Как я получил кредит 5 млн рублей в банках РФ, находясь в 10 000+ километров от России.
          <span className="block gradient-text mt-2">История и надежда для тех, кто эмигрировал</span>
        </h1>

        <div className="mt-10 gradient-border p-8 sm:p-10">
          <div className="bg-dark-card rounded-2xl text-text-muted leading-relaxed space-y-5 text-[15px] sm:text-base">
            <p>
              Меня зовут Михаил. В прошлой и нынешней жизни я IT-шник. Сменил уже несколько компаний, но
              благо сейчас меня все устраивает и я начал пускать корни. Мой сумасшедший трип начался в 2022
              году, когда я, как и многие, решил посмотреть другие страны для жизни.
            </p>

            <p>
              Сначала Грузия, потом Азия и вот, спустя почти год, я оказываюсь в Мексике вместе с женой и
              годовалым ребенком. Скажете, откуда у меня деньги на такую поездку? Я откладывал. Но вся
              заначка закончилась на второй месяц проживания в созвучном городе Мехико.
            </p>

            <div className="rounded-2xl border border-primary/25 bg-primary/5 px-5 py-4">
              <p className="text-text">
                Вот такая тут красота, оно точно того стоило:
              </p>
            </div>

            <ReviewGallery images={mexicoLifeImages} />

            <p>Но тут случилось два взаимосвязанных события:</p>
            <ol className="list-decimal pl-5 space-y-2 text-text">
              <li>Я жестко разругался с начальником отдела и меня попросили покинуть дружеский коллектив.</li>
              <li>
                Мне срочно понадобилась крупная сумма денег, чтобы решить вопрос с постоянным жильем и
                получением гражданства.
              </li>
            </ol>

            <p>
              Итог: денег нет, а пока я найду новое место для работы, пройдет достаточно времени. До этого у
              меня было предварительное одобрение от банка на 500 000 рублей, когда я жил в России, но после
              переезда банки решили мне отказать даже в этой сумме, несмотря на хорошую кредитную историю.
              Позже я выяснил, что это было связано с изменением моего геоположения.
            </p>

            <p>
              И тут мне на глаза попалась реклама людей, которые помогают получать кредиты в банке даже в
              сложных ситуациях, как у меня. Я уже слышал о кредитных брокерах, но решил рискнуть.
            </p>

            <p>
              Мы связались с менеджером, я передал свои кредитные отчеты, они изучали все несколько дней и
              сказали: <span className="text-text font-semibold">«Да, поможем».</span> Ключевым фактором для
              меня было отсутствие предоплат. Подписали договор, удаленно пожали руки и начали работу.
            </p>

            <div className="rounded-2xl border border-sand/30 bg-sand/8 px-5 py-4">
              <p className="font-[family-name:var(--font-heading)] text-lg gradient-text">
                Полтора месяца работы с января по март принесли мне почти 5 млн рублей, которые я смог
                успешно вложить в свою новую жизнь за границей.
              </p>
            </div>

            <ReviewGallery images={resultImages} />

            <p>
              Скрины из переписки с менеджером, который сопровождал меня удаленно и начислял мне суммы в
              приложении (лететь в банки не пришлось). Суммарно мне начислили 3 кредитных продукта в двух
              банках.
            </p>

            <p>
              Да, я понимаю, что это кредитные деньги, но с учетом того, что мы не планируем возвращаться —
              это отличное решение, чтобы начать жизнь с чистого листа.
            </p>

            <p>
              А за работу их команды я заплатил комиссию от суммы. Справедливая трата для тех, кому банки
              отказывают или не одобряют ту сумму, которая действительно необходима.
            </p>

            <div className="pt-3">
              <a
                href="https://t.me/olegbanki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex gradient-btn px-8 py-3.5 text-sm sm:text-base"
              >
                НАПИСАТЬ В TELEGRAM
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
