import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Cantilever loaded at midspan: the load is applied in the middle of the beam
 * instead of at the free end, so the unloaded half only follows it.
 */
export const cantileverMidLoad: Problem = {
  slug: "cantilever-mid-load",
  group: "cantilever",
  preset: {
    length: 1000,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.FIXED,
    lastPoint: FixationEnum.NONE,
    profile: {
      profileType: ProfileType.CYLINDRICAL,
      profileData: { outerDiameter: 20 },
    },
    material: "Construction steel",
    loads: [
      {
        anchor: AnchorPoint.MIDDLE,
        offset: 0,
        value: 100,
        angle: 0,
      },
    ],
  },
  content: {
    en: {
      title: "Cantilever Beam Calculator — Load Applied in the Middle",
      description:
        "Solve a cantilever beam with a point load applied at midspan. Free calculator for deflection, slope and reactions, with the closed-form formulas.",
      h1: "Cantilever beam with a load in the middle",
      summary:
        "A beam fixed at one end and loaded at midspan: where the load sits changes the deflection, and this page shows by how much.",
      intro: [
        "Moving the load away from the free end and into the middle of a cantilever makes the structure noticeably stiffer. The half of the beam beyond the load no longer bends on its own: it just follows the slope reached at the loading point.",
        "This is a common real situation — a bracket loaded by a bolt somewhere along its length, a handrail post loaded by a fitting, or a machine arm carrying a tool at mid travel. The calculator below is pre-set to this exact case.",
      ],
      setup: [
        "The left end is rigidly fixed.",
        "The right end is free.",
        "A vertical point load acts at midspan, halfway along the beam, pointing down.",
        "The beam is a solid steel rod, 20 mm in diameter and 1000 mm long.",
      ],
      reading: [
        "The load point sinks, and the section beyond it continues as a straight line tangent to the deflected shape, so the free end still shows the largest displacement even though the load is not there.",
        "Compared with the same load applied at the free end, the midspan case deflects much less and puts a much smaller moment into the fixed end. Compare it directly with the end-loaded cantilever to see the difference.",
        "The reactions at the fixed support are unchanged: the support still carries the full load and the full moment arm, which now ends at the loading point.",
      ],
      formulas: [
        {
          expression: "a = L / 2",
          meaning: "Distance from the fixed end to the load.",
        },
        {
          expression: "delta_load = F * a^3 / (3 * E * I)",
          meaning: "Deflection at the point where the load is applied.",
        },
        {
          expression: "delta_max = F * a^2 * (3 * L - a) / (6 * E * I)",
          meaning: "Deflection at the free end, which is the largest one.",
        },
        {
          expression: "M_max = F * a",
          meaning: "Bending moment at the fixed end.",
        },
      ],
      faq: [
        {
          question: "Why is a cantilever loaded in the middle stiffer than one loaded at the tip?",
          answer:
            "Because only the loaded part of the beam stores bending energy. The span beyond the load stays straight and simply follows the slope, so the effective flexural length is the distance from the support to the load rather than the full beam length.",
        },
        {
          question: "Where is the maximum deflection of this beam?",
          answer:
            "At the free end, not at the loading point. The deflected shape keeps curving up to the load and then continues as a straight tangent line, so the largest displacement is at the tip.",
        },
        {
          question: "Can I move the load to any position?",
          answer:
            "Yes. Set the load type to a side-anchored load in the calculator and use the offset to place it anywhere along the beam; the formula above works for any distance a from the fixed end.",
        },
        {
          question: "Does the result include self weight?",
          answer:
            "No. Only the loads you define are analysed, so add the beam weight as an extra load if it matters for your structure.",
        },
      ],
    },
    ru: {
      title: "Калькулятор консоли — нагрузка, приложенная посередине",
      description:
        "Расчёт консоли с точечной нагрузкой в середине пролёта. Бесплатный калькулятор прогиба, угла поворота и реакций с формулами вида.",
      h1: "Консоль с нагрузкой в середине",
      summary:
        "Балка, защемлённая с одного конца, с нагрузкой посередине: от положения нагрузки зависит прогиб, и на этой странице видно, во сколько раз.",
      intro: [
        "Если перенести нагрузку с свободного конца в середину консоли, конструкция заметно жёстче. Участок балки за точкой нагружения сам по себе уже не изгибается — он лишь следует углу наклона, достигнутому в месте приложения нагрузки.",
        "На практике так бывает часто: кронштейн, нагруженный болтом где-то по длине, стойка перил с креплением, рычаг механизма с инструментом в среднем положении. Калькулятор ниже заранее настроен именно на этот случай.",
      ],
      setup: [
        "Левый конец защемлён.",
        "Правый конец свободен.",
        "В середине пролёта, посередине балки, приложена вертикальная точечная нагрузка, направленная вниз.",
        "Балка — стальной прут диаметром 20 мм длиной 1000 мм.",
      ],
      reading: [
        "Точка нагружения проседает, а участок балки за ней продолжается по прямой, касательной к схеме прогиба, поэтому наибольшее смещение всё равно показывает свободный конец, хотя нагрузка к нему не приложена.",
        "По сравнению с той же нагрузкой на свободном конце прогиб в этом случае значительно меньше, а момент в заделке — заметно меньше. Сравните с задачей о консоли, нагруженной на свободном конце.",
        "Реакции заделки не меняются: опора по-прежнему воспринимает всю нагрузку, а плечо момента теперь заканчивается в точке нагружения.",
      ],
      formulas: [
        {
          expression: "a = L / 2",
          meaning: "Расстояние от заделки до точки нагружения.",
        },
        {
          expression: "delta_load = F * a^3 / (3 * E * I)",
          meaning: "Прогиб в точке приложения нагрузки.",
        },
        {
          expression: "delta_max = F * a^2 * (3 * L - a) / (6 * E * I)",
          meaning: "Прогиб на свободном конце — наибольший прогиб.",
        },
        {
          expression: "M_max = F * a",
          meaning: "Изгибающий момент в заделке.",
        },
      ],
      faq: [
        {
          question: "Почему консоль, нагруженная посередине, жёстче, чем нагруженная на конце?",
          answer:
            "Потому что энергию изгиба накапливает только нагруженная часть балки. Участок за точкой нагружения остаётся прямым и лишь следует углу наклона, поэтому эффективная длина изгиба — расстояние от опоры до нагрузки, а не вся длина балки.",
        },
        {
          question: "Где у этой балки наибольший прогиб?",
          answer:
            "На свободном конце, а не в точке нагружения. Схема прогиба продолжает искривляться до нагрузки, а дальше идёт по прямой-касательной, поэтому наибольшее смещение оказывается на конце.",
        },
        {
          question: "Можно ли поставить нагрузку в любое место?",
          answer:
            "Да. В калькуляторе выберите нагрузку, якоренную к стороне, и с помощью отступа разместите её в любой точке балки; формула выше работает для любого расстояния a от заделки.",
        },
        {
          question: "Учитывается ли в расчёте собственный вес балки?",
          answer:
            "Нет. Анализируются только заданные вами нагрузки, поэтому при необходимости добавьте вес балки отдельной нагрузкой.",
        },
      ],
    },
  },
};
