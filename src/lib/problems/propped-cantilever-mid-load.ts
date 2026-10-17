import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Propped cantilever: fixed at the left end, supported by a roller at the
 * right one, loaded at midspan. Statically indeterminate, so the reactions
 * depend on the stiffness distribution rather than on equilibrium alone.
 */
export const proppedCantileverMidLoad: Problem = {
  slug: "propped-cantilever-mid-load",
  group: "indeterminate",
  preset: {
    length: 2000,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.FIXED,
    lastPoint: FixationEnum.ROLLER,
    profile: {
      profileType: ProfileType.CYLINDRICAL,
      profileData: { outerDiameter: 30 },
    },
    material: "Construction steel",
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
      title: "Propped Cantilever Calculator — Fixed and Roller Support, Mid Load",
      description:
        "Solve a propped cantilever beam: fixed at one end, roller at the other, load at midspan. Reactions, moments and deflection with formulas.",
      h1: "Propped cantilever with a load at midspan",
      summary:
        "A beam clamped at one end and propped by a roller at the other: the classic first step beyond statically determinate beams.",
      intro: [
        "A propped cantilever is a beam that is fixed at one end and simply supported at the other. It is the natural next step after the pin-and-roller beam, because equilibrium alone is no longer enough: the structure is statically indeterminate, and the load split between the two supports depends on how stiff the beam is.",
        "This arrangement is everywhere in practice — a shelf bracket with an added stay, a machine shaft clamped at one end and carried by a bearing at the other, a wall-mounted arm with an end stop.",
        "The calculator below is set to a 30 mm steel rod over 2000 mm, fixed at the left end, roller-supported at the right one, with 400 N at midspan.",
      ],
      setup: [
        "The left end is rigidly fixed: it carries vertical force, horizontal force and a bending moment.",
        "The right end rests on a roller: it carries vertical force only and permits rotation and axial movement.",
        "A vertical point load of 400 N acts at midspan, pointing down.",
        "The beam is a solid steel rod, 30 mm in diameter and 2000 mm long.",
      ],
      reading: [
        "The fixed end does most of the work: it takes eleven sixteenths of the load, while the roller takes only five sixteenths. The split is not equal, and it is not the simple lever rule either, because the fixed end also carries a moment.",
        "The bending moment changes sign along the beam. It is negative — hogging, pulling the top fibres apart — at the fixed end, and positive — sagging — under the load. Both magnitudes matter for a real beam, since the steel has to cope with both.",
        "Deflection is much smaller than for the same beam on two simple supports, and the maximum no longer sits exactly at midspan: it shifts slightly towards the roller, because the fixed end suppresses the rotation there.",
        "Because the solution depends on stiffness, it also depends on the cross section and the elastic modulus: unlike a pin-and-roller beam, this one cannot be solved from geometry alone.",
      ],
      formulas: [
        {
          expression: "R_roller = 5 * F / 16, R_fixed = 11 * F / 16",
          meaning:
            "Support reactions. The fixed end carries the larger share.",
        },
        {
          expression: "M_fixed = -3 * F * L / 16",
          meaning:
            "Bending moment at the fixed end, negative because it hogs.",
        },
        {
          expression: "M_mid = 5 * F * L / 32",
          meaning: "Bending moment under the load at midspan.",
        },
        {
          expression: "delta_mid = 7 * F * L^3 / (768 * E * I)",
          meaning:
            "Deflection under the load. The true maximum is about two percent larger and sits just past midspan.",
        },
      ],
      faq: [
        {
          question: "Why is this beam statically indeterminate?",
          answer:
            "Because there are more support reactions than equilibrium equations can determine: a vertical force and a moment at the fixed end plus a vertical reaction at the roller cannot be found from force and moment balance alone, so the deformation of the beam has to be used as an extra condition.",
        },
        {
          question: "Why does the fixed end carry more than half the load?",
          answer:
            "Because it is also the stiffer end: it restrains rotation, so the beam leans on it more heavily than a simple lever rule would suggest.",
        },
        {
          question: "What happens if I remove the roller?",
          answer:
            "You get a plain cantilever, and the deflection under the same midspan load increases several-fold: the beam loses both the end support and the rotation restraint that went with it.",
        },
        {
          question: "Is the maximum deflection at midspan?",
          answer:
            "No. It is about two percent larger than the midspan value and sits slightly towards the roller side, where the beam is less restrained.",
        },
      ],
    },
    ru: {
      title: "Калькулятор односторонне защемлённой балки — нагрузка посередине",
      description:
        "Расчёт односторонне защемлённой балки: защемление с одного конца, подвижная опора с другого, нагрузка посередине. Реакции, моменты и прогиб, формулы.",
      h1: "Односторонне защемлённая балка с нагрузкой посередине",
      summary:
        "Балка, защемлённая с одного конца и опертая на подвижный шарнир с другого: классический шаг за пределы статически определимых схем.",
      intro: [
        "Односторонне защемлённая балка — это балка, жёстко закреплённая с одного конца и шарнирно опертая с другого. Это естественный следующий шаг после схемы «шарнир — подвижный шарнир», потому что одних уравнений равновесия уже недостаточно: конструкция статически неопределима, а распределение нагрузки между опорами зависит от жёсткости балки.",
        "Такая схема на практике встречается повсюду — полка с дополнительной оттяжкой, вал механизма, зажатый с одного конца и лежащий на подшипнике с другого, консоль на стене с упором.",
        "Калькулятор ниже настроен на стальной прут диаметром 30 мм длиной 2000 мм, защемлённый слева и опёртый на подвижный шарнир справа, с нагрузкой 400 Н посередине пролёта.",
      ],
      setup: [
        "Левый конец жёстко защемлён: он воспринимает вертикальную и горизонтальную силы, а также изгибающий момент.",
        "Правый конец опирается на подвижный шарнир: он воспринимает только вертикальную силу и допускает поворот и продольное перемещение.",
        "В середине пролёта приложена вертикальная точечная нагрузка 400 Н, направленная вниз.",
        "Балка — стальной прут диаметром 30 мм длиной 2000 мм.",
      ],
      reading: [
        "Основную работу ведёт защемлённый конец: он принимает одиннадцать шестнадцатых нагрузки, а подвижная опора — лишь пять шестнадцатых. Разделение не равное и не подчиняется простому правилу рычага, поскольку заделка ещё и воспринимает момент.",
        "Изгибающий момент меняет знак вдоль балки. У защемления он отрицательный — выгиб, растягивающий верхние волокна, — а под нагрузкой положительный — провисание. Оба значения важны для реальной балки, ведь стали приходится работать и так, и так.",
        "Прогиб значительно меньше, чем у той же балки на двух шарнирных опорах, а максимум больше не приходится точно на середину пролёта: он смещается к подвижной опоре, поскольку заделка подавляет поворот.",
        "Поскольку решение зависит от жёсткости, оно зависит и от сечения и модуля упругости: в отличие от балки «шарнир — подвижный шарнир», эту задачу нельзя решить одной только геометрией.",
      ],
      formulas: [
        {
          expression: "R_roller = 5 * F / 16, R_fixed = 11 * F / 16",
          meaning: "Реакции опор. Защемлённый конец нагружен сильнее.",
        },
        {
          expression: "M_fixed = -3 * F * L / 16",
          meaning:
            "Изгибающий момент в заделке; он отрицательный, так как балка выгибается вверх.",
        },
        {
          expression: "M_mid = 5 * F * L / 32",
          meaning: "Изгибающий момент под нагрузкой в середине пролёта.",
        },
        {
          expression: "delta_mid = 7 * F * L^3 / (768 * E * I)",
          meaning:
            "Прогиб под нагрузкой. Наибольший прогиб примерно на два процента больше и расположен чуть правее середины пролёта.",
        },
      ],
      faq: [
        {
          question: "Почему эта балка статически неопределима?",
          answer:
            "Потому что опорных реакций больше, чем позволяет определить равновесие: вертикальная сила и момент в заделке плюс вертикальная реакция подвижной опоры не находятся из условий равновесия сил и моментов, поэтому привлекается условие деформации балки.",
        },
        {
          question: "Почему защёмленный конец несёт больше половины нагрузки?",
          answer:
            "Потому что это более жёсткий конец: он не даёт балке повернуться, поэтому опирается на него сильнее, чем подсказывало бы простое правило рычага.",
        },
        {
          question: "Что произойдёт, если убрать подвижную опору?",
          answer:
            "Получится обычная консоль, и прогиб под той же центральной нагрузкой вырастет в несколько раз: балка лишается и концевой опоры, и ограничения поворота, которое она давала.",
        },
        {
          question: "Наибольший прогиб приходится на середину пролёта?",
          answer:
            "Нет. Он примерно на два процента больше значения посередине и расположен чуть ближе к подвижной опоре, где балка меньше стеснена.",
        },
      ],
    },
  },
};
