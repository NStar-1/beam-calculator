import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Simply supported beam with a load applied at an angle to the vertical, so it
 * has both a bending and an axial component.
 */
export const simplySupportedInclinedLoad: Problem = {
  slug: "simply-supported-inclined-load",
  group: "simply-supported",
  preset: {
    length: 1500,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.PIN,
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
        value: 300,
        angle: 30,
      },
    ],
  },
  content: {
    en: {
      title: "Beam with an Inclined Load Calculator — Angled Force on a Span",
      description:
        "Calculate a simply supported beam loaded at an angle. Bending and axial components of an inclined force, deflection and reactions, with formulas.",
      h1: "Simply supported beam with an inclined load",
      summary:
        "A force pushing at an angle onto a supported beam: split it into bending and axial parts, and only the first one visibly bends the beam.",
      intro: [
        "Real forces are rarely perfectly vertical. A stay rod, a guy wire, a bracing diagonal or a belt tension pulls at an angle, and the resulting deformation is a combination of bending and axial compression or tension.",
        "The simplest way to handle it is to split the force into components: the component across the beam causes bending, the component along the beam causes axial load. For slender beams the axial part produces displacements that are orders of magnitude smaller, so bending usually dominates the result.",
        "This page models a 30 mm steel rod over a 1500 mm span, loaded at midspan with 300 N applied at 30 degrees from the vertical.",
      ],
      setup: [
        "The left support is a pin, the right one a roller.",
        "A point load of 300 N acts at midspan, tilted 30 degrees away from the vertical.",
        "The angle is measured from the vertical direction: 0 degrees is a load pointing straight down, 90 degrees is a horizontal pull along the beam.",
        "The beam is a solid steel rod, 30 mm in diameter and 1500 mm long.",
      ],
      reading: [
        "Only the perpendicular component bends the beam. Here that is 300 N times the cosine of 30 degrees, so the bending part is smaller than the full 300 N and the deflection is correspondingly smaller than for a vertical load of the same magnitude.",
        "The parallel component pulls the beam axially. Because one support is a roller, that axial force is not resisted along the span — it produces a small elongation instead of a large stress build-up, which is precisely the reason one of the two supports is modelled as a roller.",
        "The reactions combine both effects: the supports react against the vertical component directly, and the pin takes the horizontal component.",
      ],
      formulas: [
        {
          expression: "F_perp = F * cos(alpha)",
          meaning:
            "Component perpendicular to the beam axis; it causes bending and deflection.",
        },
        {
          expression: "F_axial = F * sin(alpha)",
          meaning:
            "Component along the beam axis; it causes tension or compression rather than bending.",
        },
        {
          expression: "delta_max = F_perp * L^3 / (48 * E * I)",
          meaning:
            "Midspan deflection, using only the perpendicular component.",
        },
        {
          expression: "M_max = F_perp * L / 4",
          meaning: "Bending moment under the load.",
        },
      ],
      faq: [
        {
          question: "Does the axial part of the load contribute to the deflection?",
          answer:
            "Only through second-order effects, which this small-deflection analysis does not model. For a slender beam the contribution is negligible compared with bending.",
        },
        {
          question: "How do I enter a horizontal force?",
          answer:
            "Set the load angle to 90 degrees. The load then acts entirely along the beam axis, and with a roller at one end the model reports almost no bending at all.",
        },
        {
          question: "Why is the angle measured from the vertical?",
          answer:
            "Because that keeps the common case simple: a straight downward load stays at 0 degrees, and the angle grows as the force tips over towards the beam axis.",
        },
        {
          question: "What changes if both supports were fixed instead?",
          answer:
            "The beam would resist the axial component as well, building up real axial force, and the bending deflection would drop because both ends would also restrict the rotation.",
        },
      ],
    },
    ru: {
      title: "Калькулятор балки с наклонной нагрузкой — сила под углом к пролёту",
      description:
        "Расчёт шарнирно-опёртой балки с нагрузкой под углом. Изгибающая и продольная составляющие наклонной силы, прогиб и реакции, формулы.",
      h1: "Шарнирно-опёртая балка с наклонной нагрузкой",
      summary:
        "Сила, давящая под углом на опёртую балку: разложите её на изгибающую и продольную составляющие — гнёт балку только первая.",
      intro: [
        "На практике нагрузки редко бывают строго вертикальными. Оттяжка, растяжка, раскос или натяжение ремня тянут под углом, и деформация оказывается сочетанием изгиба и продольного растяжения или сжатия.",
        "Проще всего разложить силу на составляющие: составляющая поперёк оси балки вызывает изгиб, вдоль оси — продольную нагрузку. Для стройных балок продольная часть даёт смещения на порядки меньшие, поэтому в результате обычно доминирует изгиб.",
        "На этой странице смоделирован стальной прут диаметром 30 мм пролётом 1500 мм с нагрузкой 300 Н в середине пролёта, приложенной под углом 30° к вертикали.",
      ],
      setup: [
        "Левая опора — шарнирная, правая — подвижная.",
        "В середине пролёта приложена точечная нагрузка 300 Н, отклонённая от вертикали на 30 градусов.",
        "Угол отсчитывается от вертикального направления: 0° — нагрузка строго вниз, 90° — горизонтальная тяга вдоль балки.",
        "Балка — стальной прут диаметром 30 мм длиной 1500 мм.",
      ],
      reading: [
        "Балку гнёт только перпендикулярная составляющая. Здесь это 300 Н, умноженные на косинус 30°, поэтому изгибающая часть меньше полных 300 Н, и прогиб соответственно меньше, чем при вертикальной нагрузке той же величины.",
        "Параллельная составляющая растягивает балку вдоль оси. Поскольку одна опора подвижная, продольная сила вдоль пролёта не воспринимается — вместо больших напряжений возникает небольшое удлинение; именно для этого одна из двух опор и моделируется как подвижная.",
        "Реакции объединяют оба эффекта: опоры воспринимают перпендикулярную составляющую, а горизонтальную принимает шарнирная опора.",
      ],
      formulas: [
        {
          expression: "F_perp = F * cos(alpha)",
          meaning:
            "Составляющая перпендикулярно оси балки; она вызывает изгиб и прогиб.",
        },
        {
          expression: "F_axial = F * sin(alpha)",
          meaning:
            "Составляющая вдоль оси балки; она вызывает растяжение или сжатие, а не изгиб.",
        },
        {
          expression: "delta_max = F_perp * L^3 / (48 * E * I)",
          meaning: "Прогиб посередине пролёта с учётом только перпендикулярной составляющей.",
        },
        {
          expression: "M_max = F_perp * L / 4",
          meaning: "Изгибающий момент под нагрузкой.",
        },
      ],
      faq: [
        {
          question: "Продольная составляющая нагрузки влияет на прогиб?",
          answer:
            "Только через эффекты второго порядка, которые в этом анализе малых прогибов не учитываются. Для стройной балки её вклад пренебрежимо мал по сравнению с изгибом.",
        },
        {
          question: "Как задать горизонтальную нагрузку?",
          answer:
            "Установите угол нагрузки 90°. Тогда сила действует вдоль оси балки, и при подвижной опоре модель практически не покажет изгиба.",
        },
        {
          question: "Почему угол отсчитывается от вертикали?",
          answer:
            "Чтобы простой случай оставался простым: нагрузка строго вниз соответствует 0°, а угол растёт по мере наклона силы к оси балки.",
        },
        {
          question: "Что изменится, если обе опоры будут жёсткими?",
          answer:
            "Балка станет воспринимать и продольную составляющую, в ней возникнет настоящая продольная сила, а изгибовой прогиб уменьшится, поскольку оба конца будут ещё и ограничивать поворот.",
        },
      ],
    },
  },
};
