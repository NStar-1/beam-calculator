import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Built-in beam: fixed at both ends, loaded at midspan. Statically
 * indeterminate to the third degree, and the stiffest way to span a gap with
 * a single member.
 */
export const fixedFixedMidLoad: Problem = {
  slug: "fixed-fixed-mid-load",
  group: "indeterminate",
  preset: {
    length: 2000,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.FIXED,
    lastPoint: FixationEnum.FIXED,
    profile: {
      profileType: ProfileType.RECTANGULAR_TUBE,
      profileData: { width: 40, height: 40, thickness: 2.5 },
    },
    material: "Stainless steel",
    loads: [
      {
        anchor: AnchorPoint.MIDDLE,
        offset: 0,
        value: 400,
        angle: 0,
      },
    ],
  },
  content: {
    en: {
      title: "Fixed-Fixed Beam Calculator — Built-In Beam, Load at Midspan",
      description:
        "Calculate a beam fixed at both ends and loaded in the middle. Support moments, reactions and midspan deflection for a built-in beam, with formulas.",
      h1: "Beam fixed at both ends with a load at midspan",
      summary:
        "A built-in beam clamped at both supports: the stiffest single-span arrangement, and the one with the highest end moments.",
      intro: [
        "When both ends of a beam are built in, the structure becomes the stiffest possible single span: neither end may move or rotate, so the beam carries the load with a fraction of the deflection a simply supported beam would show.",
        "This is how real steel frames, machine housings and welded structures behave, and it is also what a beam embedded in concrete effectively looks like. The price is paid at the supports: they develop bending moments of their own, which the connection has to carry.",
        "The calculator below models a stainless steel square tube, 40 mm across with a 2.5 mm wall, spanning 2000 mm between two fixed ends and loaded with 400 N at midspan.",
      ],
      setup: [
        "Both ends are rigidly fixed: neither translation nor rotation is allowed at either support.",
        "A vertical point load of 400 N acts at midspan, pointing down.",
        "The section is a square hollow tube: 40 mm by 40 mm with a 2.5 mm wall.",
        "The span is 2000 mm and the material is stainless steel.",
      ],
      reading: [
        "The midspan deflection is a quarter of what the same beam would show on simple supports — a fixed-fixed beam is four times stiffer in service, which is the whole reason structures are built in rather than simply supported.",
        "The bending moment changes sign along the beam: it hogs over the supports and sags under the load. For a central point load on a uniform beam both magnitudes happen to be equal, F L / 8, which is a handy rule of thumb.",
        "Each support carries half of the load, and since both ends are fixed the axial restraint is fully effective: a temperature change or a load applied along the beam axis will build up real axial force here, unlike in the pin-and-roller case.",
        "Check the connection before trusting the numbers: the model assumes perfectly rigid fixings, and a real welded or bolted joint always rotates a little, which increases the deflection.",
      ],
      formulas: [
        {
          expression: "R_left = R_right = F / 2",
          meaning: "Support reactions; symmetry splits the load evenly.",
        },
        {
          expression: "M_support = -F * L / 8",
          meaning: "Bending moment at each fixed end, hogging.",
        },
        {
          expression: "M_mid = F * L / 8",
          meaning: "Bending moment under the load, sagging.",
        },
        {
          expression: "delta_max = F * L^3 / (192 * E * I)",
          meaning: "Deflection at midspan, the largest one.",
        },
      ],
      faq: [
        {
          question: "How much stiffer is a built-in beam than a simply supported one?",
          answer:
            "Four times for a central point load: the midspan deflection is F L³ over 192 E I instead of F L³ over 48 E I.",
        },
        {
          question: "Why is the support moment negative?",
          answer:
            "By convention the beam sags under the load and hogs over the supports. At the fixed ends the curvature reverses, so the bending moment changes sign; the connection has to be designed for that moment, not only for the vertical reaction.",
        },
        {
          question: "Why are the support and midspan moments equal?",
          answer:
            "For a single central point load on a prismatic beam they both work out to F L / 8. With any other load pattern the two differ, so treat the equality as a special case rather than a rule.",
        },
        {
          question: "What if the real supports rotate a little?",
          answer:
            "Then the beam behaves somewhere between the fixed-fixed and the simply supported cases. Since the deflection of the fixed-fixed model is the lower bound, the real deflection will be larger — a useful conservative check is to compare both models.",
        },
      ],
    },
    ru: {
      title: "Калькулятор балки, защемлённой с обоих концов — нагрузка посередине",
      description:
        "Расчёт балки, защемлённой с двух концов, с нагрузкой посередине. Моменты в опорах, реакции и прогиб по центру, формулы.",
      h1: "Балка, защемлённая с обоих концов, с нагрузкой посередине",
      summary:
        "Замкнутая балка с жёсткими заделками на обоих опорах: самая жёсткая однопролётная схема и одновременно с самыми большими опорными моментами.",
      intro: [
        "Когда оба конца балки заделаны, конструкция становится максимально жёстким однопролётным пролётом: ни один из концов не может ни сдвинуться, ни повернуться, поэтому балка воспринимает нагрузку с долей прогиба, которую показала бы шарнирно-опёртая балка.",
        "Именно так работают сварные рамы, корпуса механизмов и металлоконструкции, и именно так ведёт себя балка, заделанная в бетон. Платой служат опоры: в них возникают собственные изгибающие моменты, которые должен воспринимать узел крепления.",
        "Калькулятор ниже моделирует квадратную нержавеющую трубу 40×40 мм со стенкой 2,5 мм пролётом 2000 мм между двумя заделками с нагрузкой 400 Н посередине пролёта.",
      ],
      setup: [
        "Оба конца жёстко защемлены: ни смещения, ни поворота ни на одной из опор.",
        "В середине пролёта приложена вертикальная точечная нагрузка 400 Н, направленная вниз.",
        "Сечение — квадратная полая труба: 40 на 40 мм при толщине стенки 2,5 мм.",
        "Пролёт составляет 2000 мм, материал — нержавеющая сталь.",
      ],
      reading: [
        "Прогиб посередине пролёта в четыре раза меньше, чем показала бы та же балка на шарнирных опорах: в работе балка с заделками жёстче вчетверо, ради этого конструкции и делают замкнутыми.",
        "Изгибающий момент меняет знак вдоль балки: над опорами он выгибной, под нагрузкой — провисающий. Для одиночной центральной точки на однородной балке оба значения равны F L / 8 — удобное правило для ориентировочной оценки.",
        "Каждая опора воспринимает половину нагрузки, а поскольку оба конца заделаны, продольная связь работает полностью: при изменении температуры или нагрузке вдоль оси балки здесь возникает настоящая продольная сила, в отличие от схемы «шарнир — подвижный шарнир».",
        "Прежде чем доверять числам, проверьте узел: модель считает идеально жёсткую заделку, а реальный сварной или болтовой узел всегда поворачивается немного, и от этого прогиб возрастает.",
      ],
      formulas: [
        {
          expression: "R_left = R_right = F / 2",
          meaning: "Реакции опор; симметрия делит нагрузку поровну.",
        },
        {
          expression: "M_support = -F * L / 8",
          meaning: "Изгибающий момент в каждой заделке, выгибной.",
        },
        {
          expression: "M_mid = F * L / 8",
          meaning: "Изгибающий момент под нагрузкой, провисающий.",
        },
        {
          expression: "delta_max = F * L^3 / (192 * E * I)",
          meaning: "Прогиб посередине пролёта — наибольший.",
        },
      ],
      faq: [
        {
          question: "Насколько жёстче балка с заделками по сравнению с шарнирно-опёртой?",
          answer:
            "В четыре раза при центральной точечной нагрузке: прогиб посередине равен F L³ / (192 E I) вместо F L³ / (48 E I).",
        },
        {
          question: "Почему момент в опоре отрицательный?",
          answer:
            "По принятым обозначениям балка под нагрузкой провисает, а над опорами выгибается. В заделках искривление меняет знак, поэтому изгибающий момент меняет знак; узел крепления нужно рассчитывать именно на этот момент, а не только на вертикальную реакцию.",
        },
        {
          question: "Почему моменты в опоре и посередине равны?",
          answer:
            "Для одиночной центральной точечной нагрузки на однородной балке оба значения равны F L / 8. При любой другой схеме нагружения они различаются, поэтому равенство — частный случай, а не правило.",
        },
        {
          question: "Что будет, если реальные опоры поворачиваются немного?",
          answer:
            "Тогда балка окажется где-то между схемой с заделками и шарнирно-опёртой. Поскольку прогиб в модели с заделками является нижней границей, реальный прогиб будет больше; полезной проверкой будет сравнить обе схемы.",
        },
      ],
    },
  },
};
