import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * The textbook simply supported beam: pin at the left end, roller at the right
 * one, a single point load at midspan.
 */
export const simplySupportedMidLoad: Problem = {
  slug: "simply-supported-mid-load",
  group: "simply-supported",
  preset: {
    length: 2000,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.PIN,
    lastPoint: FixationEnum.ROLLER,
    profile: {
      profileType: ProfileType.CYLINDRICAL,
      profileData: { outerDiameter: 25 },
    },
    material: "Construction steel",
    loads: [
      {
        anchor: AnchorPoint.MIDDLE,
        offset: 0,
        value: 500,
        angle: 0,
      },
    ],
  },
  content: {
    en: {
      title: "Simply Supported Beam Calculator — Point Load at Midspan",
      description:
        "Free calculator for a simply supported beam with a point load in the middle: deflection, bending moment and support reactions, with formulas.",
      h1: "Simply supported beam with a load in the middle",
      summary:
        "The classic pin-and-roller beam loaded at midspan: deflection, moment and reactions, solved online.",
      intro: [
        "This is the most widely used model in structural engineering. A beam resting on two supports — one pin, one roller — with a concentrated load at midspan describes a floor joist, a bridge segment, a machine bed, a shelf between two uprights or a shaft on two bearings.",
        "Because the beam is supported at both ends it is far stiffer than a cantilever of the same length: the midspan deflection formula carries a factor of 48 instead of 3, so the same load produces roughly sixteen times less deflection.",
        "The calculator below is pre-set to this exact case with a 25 mm steel rod over a 2 m span carrying 500 N at the centre.",
      ],
      setup: [
        "The left support is a pin: it stops both translation and rotation.",
        "The right support is a roller: it stops vertical movement but allows the beam to lengthen and to rotate.",
        "A vertical point load acts at midspan, pointing down.",
        "The beam is a solid steel rod, 25 mm in diameter and 2000 mm long.",
      ],
      reading: [
        "The largest deflection appears at midspan, right under the load, and the bending moment peaks there too — for a central load the maximum moment is F * L / 4.",
        "Each support carries half of the load. Because the roller is free to move, the thermal expansion of the beam does not create axial force — this is exactly why real beams are built this way instead of being clamped at both ends.",
        "If you move the load off centre, the maximum deflection moves with it and the larger support reaction follows the load. The closed-form formulas below cover any load position along the span.",
      ],
      formulas: [
        {
          expression: "delta_max = F * L^3 / (48 * E * I)",
          meaning: "Deflection under the load at midspan.",
        },
        {
          expression: "M_max = F * L / 4",
          meaning: "Bending moment under the load.",
        },
        {
          expression: "R_left = R_right = F / 2",
          meaning: "Support reactions for a central load.",
        },
        {
          expression: "delta_load = F * a^2 * b^2 / (3 * E * I * L)",
          meaning:
            "Deflection at the load point when it sits at distance a from the left support and b from the right one. For a central load this is also the largest deflection.",
        },
      ],
      faq: [
        {
          question: "What is the difference between a pin and a roller support?",
          answer:
            "A pin blocks translation in both directions and rotation, a roller blocks only vertical movement. Using one of each makes the beam statically determinate and lets it expand with temperature without building up axial force.",
        },
        {
          question: "How much load does each support carry?",
          answer:
            "For a central load, half each. For an off-centre load, each support carries the share inversely proportional to its distance from the load, so the support nearer to the load is the heavily loaded one.",
        },
        {
          question: "Is the bending moment diagram a triangle?",
          answer:
            "For a single central load it is: it rises linearly from zero at the supports to F * L / 4 under the load. With several loads it is the superposition of the individual triangles.",
        },
        {
          question: "Does the calculator include the beam's own weight?",
          answer:
            "No, only the loads you enter. For long or heavy beams add the self weight as an extra load to keep the result realistic.",
        },
      ],
    },
    ru: {
      title: "Калькулятор шарнирно-опёртой балки — нагрузка в середине пролёта",
      description:
        "Бесплатный расчёт шарнирно-опёртой балки с точечной нагрузкой посередине: прогиб, изгибающий момент и реакции опор, формулы.",
      h1: "Шарнирно-опёртая балка с нагрузкой в середине",
      summary:
        "Классическая балка на двух опорах с нагрузкой посередине пролёта: прогиб, момент и реакции опор онлайн.",
      intro: [
        "Это самая широко используемая модель в строительной механике. Балка, лежащая на двух опорах — шарнирной и подвижной, — с сосредоточенной нагрузкой посередине пролёта описывает балку перекрытия, элемент моста, станину станка, полку между стойками или вал на двух подшипниках.",
        "Поскольку балка оперта с обеих сторон, она намного жёстче консоли той же длины: в формуле прогиба посередине стоит множитель 48 вместо 3, поэтому та же нагрузка даёт примерно в шестнадцать раз меньший прогиб.",
        "Калькулятор ниже заранее настроен именно на этот случай: стальной прут диаметром 25 мм, пролёт 2 м, нагрузка 500 Н по центру.",
      ],
      setup: [
        "Левая опора — шарнир: она не допускает ни смещений, ни поворота.",
        "Правая опора — подвижный шарнир: она не допускает вертикальных смещений, но позволяет балке удлиняться и поворачиваться.",
        "В середине пролёта приложена вертикальная точечная нагрузка, направленная вниз.",
        "Балка — стальной прут диаметром 25 мм длиной 2000 мм.",
      ],
      reading: [
        "Наибольший прогиб возникает посередине пролёта, прямо под нагрузкой, и там же достигает максимума изгибающий момент — для центральной нагрузки M_max = F * L / 4.",
        "Каждая опора воспринимает половину нагрузки. Поскольку подвижная опора свободно перемещается, нагрев балки не создаёт продольной силы — именно поэтому реальные балки делают так, а не защёлкивают с обеих сторон.",
        "Если сместить нагрузку от центра, максимум прогиба переместится вместе с ней, а большая реакция опоры окажется со стороны нагрузки. Приведённые ниже формулы работают для любого положения нагрузки в пролёте.",
      ],
      formulas: [
        {
          expression: "delta_max = F * L^3 / (48 * E * I)",
          meaning: "Прогиб под нагрузкой в середине пролёта.",
        },
        {
          expression: "M_max = F * L / 4",
          meaning: "Изгибающий момент под нагрузкой.",
        },
        {
          expression: "R_left = R_right = F / 2",
          meaning: "Реакции опор при центральной нагрузке.",
        },
        {
          expression: "delta_load = F * a^2 * b^2 / (3 * E * I * L)",
          meaning:
            "Прогиб в точке приложения нагрузки, если она приложена на расстоянии a от левой опоры и b от правой. При центральной нагрузке это же значение является и наибольшим прогибом.",
        },
      ],
      faq: [
        {
          question: "Чем шарнирная опора отличается от подвижной?",
          answer:
            "Шарнирная опора не допускает смещений ни в одном направлении и поворота, подвижная — только вертикальных смещений. Применение одной и другой делает балку статически определимой и позволяет ей удлиняться при нагреве без возникновения продольной силы.",
        },
        {
          question: "Какую нагрузку воспринимает каждая опора?",
          answer:
            "При центральной нагрузке — по половине. При нагрузке вне центра доля каждой опоры обратно пропорциональна её расстоянию до нагрузки, поэтому нагружена сильнее опора, ближайшая к нагрузке.",
        },
        {
          question: "Эпюра изгибающего момента имеет вид треугольника?",
          answer:
            "Для одиночной центральной нагрузки — да: она нарастает линейно от нуля у опор до F * L / 4 под нагрузкой. При нескольких нагрузках эпюра складывается из соответствующих треугольников.",
        },
        {
          question: "Учитывается ли собственный вес балки?",
          answer:
            "Нет, учитываются только введённые вами нагрузки. Для длинных или тяжёлых балок добавьте собственный вес отдельной нагрузкой, чтобы результат был реалистичным.",
        },
      ],
    },
  },
};
