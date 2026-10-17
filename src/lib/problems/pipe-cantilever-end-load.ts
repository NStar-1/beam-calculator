import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Cantilever made of a hollow round tube — a steel pipe clamped at one end and
 * loaded at the other. Hollow sections are the common choice for arms, rails
 * and frames because they carry bending in every direction.
 */
export const pipeCantileverEndLoad: Problem = {
  slug: "pipe-cantilever-end-load",
  group: "cantilever",
  preset: {
    length: 1500,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.FIXED,
    lastPoint: FixationEnum.NONE,
    profile: {
      profileType: ProfileType.ROUND_TUBE,
      profileData: { outerDiameter: 42.4, innerDiameter: 36 },
    },
    material: "Construction steel",
    loads: [
      {
        anchor: AnchorPoint.END,
        offset: 0,
        value: 150,
        angle: 0,
      },
    ],
  },
  content: {
    en: {
      title: "Steel Pipe Cantilever Calculator — Deflection of a Clamped Tube",
      description:
        "Calculate the deflection of a steel pipe fixed at one end and loaded at the free end. Online calculator for a hollow round section, with formulas.",
      h1: "Steel pipe as a cantilever",
      summary:
        "A clamped steel pipe loaded at its free end: deflection and reactions for a hollow circular section.",
      intro: [
        "Steel pipe is a very efficient cantilever material. A hollow circular section resists bending in every direction equally well, is easy to clamp, and carries far more load per kilogram than a solid bar of the same weight.",
        "Typical examples are handrail posts, sensor arms, exhaust hangers, rack outriggers and scaffolding tubes. The calculator below is set to a DN32 pipe — 42.4 mm outer diameter with a 3.2 mm wall — clamped over a 1.5 m cantilever and loaded at the tip.",
      ],
      setup: [
        "The left end is rigidly fixed, as if the pipe were clamped in a socket or welded to a frame.",
        "The right end is free.",
        "A vertical point load acts at the free end, pointing down.",
        "The section is a hollow round tube: 42.4 mm outer diameter, 36 mm inner diameter, so the wall is 3.2 mm.",
      ],
      reading: [
        "For a pipe, the whole game is the wall thickness. The moment of inertia of a hollow circle grows with the fourth power of the outer diameter, but only with the first power of the wall, so a slightly larger pipe with a thin wall beats a smaller thick one by a wide margin.",
        "Watch the wall thickness when you change the dimensions: if it becomes half the outer diameter or more, the section stops being a tube and the model is rejected.",
        "The reported reactions are the shear force and the bending moment the clamp has to resist. In practice the clamp and its fasteners, not the pipe itself, are usually what limits a cantilever like this.",
      ],
      formulas: [
        {
          expression: "I = pi * (D^4 - d^4) / 64",
          meaning:
            "Bending moment of inertia of a hollow circular section. D is the outer and d the inner diameter.",
        },
        {
          expression: "delta_max = F * L^3 / (3 * E * I)",
          meaning: "Deflection at the free end.",
        },
        {
          expression: "M_max = F * L",
          meaning: "Bending moment at the clamped end.",
        },
      ],
      faq: [
        {
          question: "How do I model a pipe that is welded instead of clamped?",
          answer:
            "Use the same fixed support. A full-penetration weld into a stiff frame behaves almost like a clamp; if the weld sits on a thin plate, the real structure will be more flexible than the model, so treat the result as an upper bound on stiffness.",
        },
        {
          question: "Why is the pipe so much lighter than a solid rod of the same stiffness?",
          answer:
            "Because bending stresses are largest at the outside of the section. Material near the neutral axis contributes very little to the moment of inertia, so removing it saves weight with almost no loss of stiffness.",
        },
        {
          question: "Does this work for other pipe standards?",
          answer:
            "Yes. Enter the actual outer diameter and wall thickness of your pipe; nominal diameters such as DN32 or 1 1/4 inch are only labels and differ between standards.",
        },
        {
          question: "Can I check a horizontal pipe loaded sideways?",
          answer:
            "Yes. The angle parameter rotates the load; for a pipe lying horizontally and pushed sideways, the section is equally stiff in every direction, so only the load component perpendicular to the pipe matters for deflection.",
        },
      ],
    },
    ru: {
      title: "Калькулятор консоли из стальной трубы — прогиб защемлённой трубы",
      description:
        "Расчёт прогиба стальной трубы, защемлённой с одного конца и нагруженной на свободном конце. Онлайн-калькулятор для полого круглого сечения с формулами.",
      h1: "Стальная труба в качестве консоли",
      summary:
        "Защемлённая стальная труба с нагрузкой на свободном конце: прогиб и реакции для полого круглого сечения.",
      intro: [
        "Стальная труба — очень эффективный материал для консоли. Площой круглого сечения одинаково хорошо сопротивляется изгибу во всех направлениях, его легко защемить, а нагрузку на килограмм веса труба выдерживает значительно выше, чем сплошной прут того же веса.",
        "Типичные примеры — стойки перил, датчики-выносы, кронштейны выхлопной системы, консоли стеллажей и трубные леса. Калькулятор ниже настроен на трубу условного прохода DN32 — наружный диаметр 42,4 мм при толщине стенки 3,2 мм — защемлённую консолью 1,5 м и нагруженную на конце.",
      ],
      setup: [
        "Левый конец защемлён, как если бы труба была зажата в патроне или приварена к раме.",
        "Правый конец свободен.",
        "В свободный конец приложена вертикальная точечная нагрузка, направленная вниз.",
        "Сечение — полая круглая труба: наружный диаметр 42,4 мм, внутренний 36 мм, то есть толщина стенки 3,2 мм.",
      ],
      reading: [
        "Для трубы решающую роль играет толщина стенки. Момент инерции полого круга растёт с четвёртой степенью наружного диаметра, но лишь с первой — толщины стенки, поэтому чуть более крупная труба с тонкой стенкой заметно выигрывает у меньшей толстостенной.",
        "Следите за толщиной стенки при изменении размеров: если она станет не меньше половины наружного диаметра, сечение перестанет быть трубой, и модель будет отклонена.",
        "Выдаваемые реакции — это поперечная сила и изгибающий момент, которые должен выдержать зажим. На практике пределом прочности такой консоли обычно служит сам зажим и его крепёж, а не труба.",
      ],
      formulas: [
        {
          expression: "I = pi * (D^4 - d^4) / 64",
          meaning:
            "Момент инерции полого круглого сечения. D — наружный, d — внутренний диаметр.",
        },
        {
          expression: "delta_max = F * L^3 / (3 * E * I)",
          meaning: "Прогиб на свободном конце.",
        },
        {
          expression: "M_max = F * L",
          meaning: "Изгибающий момент в защемлённом сечении.",
        },
      ],
      faq: [
        {
          question: "Как смоделировать трубу, приваренную, а не зажатую?",
          answer:
            "Используйте то же жёсткое закрепление. Проплавной шов в массивной раме работает почти как заделка; если шов опирается на тонкую пластину, реальная конструкция окажется мягче модели, поэтому считайте результат верхней оценкой жёсткости.",
        },
        {
          question: "Почему труба намного легче сплошного прута той же жёсткости?",
          answer:
            "Потому что нормальные напряжения изгиба максимальны у наружных волокон сечения. Материал у нейтральной оси почти не вносит вклада в момент инерции, поэтому его удаление даёт экономию веса почти без потери жёсткости.",
        },
        {
          question: "Подойдёт ли расчёт для труб других стандартов?",
          answer:
            "Да. Укажите фактические наружный диаметр и толщину стенки вашей трубы; обозначения вроде DN32 или 1 1/4\" — это лишь условные названия, и они различаются в разных стандартах.",
        },
        {
          question: "Можно ли проверить горизонтальную трубу, нагруженную сбоку?",
          answer:
            "Да. Параметр угла поворачивает нагрузку; для горизонтальной трубы, расталкиваемой вбок, сечение одинаково жёстко во всех направлениях, поэтому на прогиб влияет только составляющая нагрузки, перпендикулярная оси трубы.",
        },
      ],
    },
  },
};
