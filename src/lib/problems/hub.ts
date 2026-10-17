import type { HubContent } from "./types";

/**
 * Localized copy for the `/solve` hub page, which links every problem in the
 * catalog and gives search engines a crawlable index of the whole set.
 */
export const hubContent: Record<"en" | "ru", HubContent> = {
  en: {
    title: "Beam Calculation Examples — Ready-Made Beam Problems",
    description:
      "Pre-configured beam calculators for the standard cases: cantilever, simply supported, propped and built-in beams, pipes and I-beams. Open a case and adjust the numbers.",
    h1: "Beam calculation examples",
    intro: [
      "Every example below opens the calculator already set up for one standard beam problem: the supports, the load, the cross section and the material are pre-filled, so you can change only the numbers that matter to you.",
      "They cover the cases that come up most often in practice — a cantilever arm, a beam on two supports, an eccentric load, a steel pipe, an I-beam, and the two statically indeterminate arrangements where the supports themselves share the load.",
    ],
    groups: {
      cantilever: {
        title: "Cantilever beams",
        description:
          "Beams fixed at one end and free at the other, loaded along the span or at the tip.",
      },
      "simply-supported": {
        title: "Simply supported beams",
        description:
          "Beams on a pin and a roller, with central, eccentric, inclined or multiple loads.",
      },
      indeterminate: {
        title: "Statically indeterminate beams",
        description:
          "Beams where the supports share the load by stiffness: propped cantilevers and built-in beams.",
      },
    },
  },
  ru: {
    title: "Примеры расчёта балок — готовые задачи по балкам",
    description:
      "Заранее настроенные калькуляторы балок для стандартных случаев: консоли, шарнирно-опёртые, односторонне и двухсторонне защемлённые балки, трубы и двутавры. Откройте задачу и подставьте свои числа.",
    h1: "Примеры расчёта балок",
    intro: [
      "Каждый пример ниже открывает калькулятор, уже настроенный на одну стандартную задачу по балке: опоры, нагрузка, сечение и материал заполнены заранее, поэтому изменить нужно только те числа, которые важны вам.",
      "Здесь собраны наиболее частые на практике случаи — консоль, балка на двух опорах, внецентренная нагрузка, стальная труба, двутавр и две схемы со статической неопределимостью, в которых нагрузку распределяют сами опоры.",
    ],
    groups: {
      cantilever: {
        title: "Консоли",
        description:
          "Балки, защемлённые с одного конца и свободные с другого, с нагрузкой по длине или на конце.",
      },
      "simply-supported": {
        title: "Шарнирно-опёртые балки",
        description:
          "Балки на шарнирной и подвижной опорах с центральной, внецентренной, наклонной или несколькими нагрузками.",
      },
      indeterminate: {
        title: "Статически неопределимые балки",
        description:
          "Балки, в которых опоры распределяют нагрузку по жёсткости: односторонне защемлённые и замкнутые с обеих сторон.",
      },
    },
  },
};
