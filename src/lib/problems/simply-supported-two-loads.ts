import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Two symmetric point loads on a simply supported hollow section. The region
 * between the loads is in pure bending, which is the four-point test setup.
 */
export const simplySupportedTwoLoads: Problem = {
  slug: "simply-supported-two-loads",
  group: "simply-supported",
  preset: {
    length: 2400,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.PIN,
    lastPoint: FixationEnum.ROLLER,
    profile: {
      profileType: ProfileType.ROUND_TUBE,
      profileData: { outerDiameter: 60.3, innerDiameter: 52.5 },
    },
    material: "Construction steel",
    loads: [
      {
        anchor: AnchorPoint.START,
        offset: 600,
        value: 400,
        angle: 0,
      },
      {
        anchor: AnchorPoint.END,
        offset: 600,
        value: 400,
        angle: 0,
      },
    ],
  },
  content: {
    en: {
      title: "Beam with Two Point Loads Calculator — Symmetric Loading",
      description:
        "Calculate a simply supported beam carrying two symmetric point loads. Deflection, constant moment region and reactions, with formulas.",
      h1: "Simply supported beam with two point loads",
      summary:
        "A steel tube on two supports carrying two equal loads: the middle section bends without shear, exactly like a four-point test.",
      intro: [
        "Two equal loads placed symmetrically on a supported beam create something useful: between them the bending moment is constant and the shear force is zero. That middle region is in pure bending, which is why this arrangement is the basis of the four-point bending test.",
        "It also describes plenty of real structures — a beam picked up by two clamps, a shelf loaded by two brackets, a shaft carried on two bearings with two pulleys, or a truss chord panel.",
        "The calculator below is set to a DN50 steel tube spanning 2400 mm, loaded with 400 N at 600 mm from each support.",
      ],
      setup: [
        "The left support is a pin, the right one a roller.",
        "Two equal vertical loads of 400 N act at 600 mm from the ends, measured from the left and from the right respectively.",
        "The beam is a hollow round tube: 60.3 mm outer diameter, 52.5 mm inner diameter.",
        "The span is 2400 mm and the material is construction steel.",
      ],
      reading: [
        "Each support carries exactly one load, so the reactions are simply 400 N each.",
        "The bending moment diagram rises linearly from the supports and stays flat between the two loads, at a value of F * a. That flat plateau is the pure bending region, and it is also where the beam is most heavily stressed.",
        "The maximum deflection is at midspan and is smaller than for a single load of the same total magnitude placed at the centre — spreading the load over two points is a cheap way to reduce bending.",
        "Because the section is a tube, the beam is equally stiff in both lateral directions, so the same numbers apply if the loads are applied sideways.",
      ],
      formulas: [
        {
          expression: "a = 600 mm",
          meaning: "Distance from each support to the nearest load.",
        },
        {
          expression: "M_max = F * a",
          meaning:
            "Bending moment, constant across the region between the two loads.",
        },
        {
          expression: "delta_mid = F * a * (3 * L^2 - 4 * a^2) / (24 * E * I)",
          meaning: "Deflection at midspan, the largest one.",
        },
        {
          expression: "R_left = R_right = F",
          meaning: "Support reactions; each support carries one of the loads.",
        },
      ],
      faq: [
        {
          question: "Why put two loads instead of one in the middle?",
          answer:
            "It reduces the maximum bending moment and the deflection for the same total load, and it creates a region of constant moment that is much easier to measure or to inspect than a single peak.",
        },
        {
          question: "What exactly is pure bending?",
          answer:
            "A state where the bending moment is constant and the shear force is zero, so the section only rotates and does not slide. Material tests use it because shear would otherwise distort the measurement.",
        },
        {
          question: "Is the deflection really smaller than with one central load?",
          answer:
            "Yes. For the same total load applied at one point in the middle, the midspan deflection would be higher; moving the material out towards the supports shortens the effective bending span.",
        },
        {
          question: "Can I use unequal loads?",
          answer:
            "Yes, set a different value for each load in the calculator. The pure bending region then disappears, and the moment diagram becomes a trapezoid instead of a flat plateau.",
        },
      ],
    },
    ru: {
      title: "Калькулятор балки с двумя точечными нагрузками",
      description:
        "Расчёт шарнирно-опёртой балки с двумя симметричными точечными нагрузками. Прогиб, участок постоянного момента и реакции опор, формулы.",
      h1: "Шарнирно-опёртая балка с двумя точечными нагрузками",
      summary:
        "Стальная труба на двух опорах с двумя равными нагрузками: средний участок изгибается без поперечной силы, как в испытании по четырём точкам.",
      intro: [
        "Две равные нагрузки, расположенные симметрично на опёртой балке, дают полезный результат: между ними изгибающий момент постоянен, а поперечная сила равна нуля. Этот участок работает на чистый изгиб, поэтому такую схему и используют в испытании на изгиб по четырём точкам.",
        "Она же описывает множество реальных конструкций — балку, подхватываемую двумя захватами, полку с двумя кронштейнами, вал на двух подшипниках с двумя шкивами или панель пояса фермы.",
        "Калькулятор ниже настроен на стальную трубу условного прохода DN50 пролётом 2400 мм с нагрузкой по 400 Н в 600 мм от каждой опоры.",
      ],
      setup: [
        "Левая опора — шарнирная, правая — подвижная.",
        "Две равные вертикальные нагрузки по 400 Н приложены в 600 мм от концов, отсчитывая слева и справа соответственно.",
        "Балка — полая круглая труба: наружный диаметр 60,3 мм, внутренний 52,5 мм.",
        "Пролёт составляет 2400 мм, материал — конструкционная сталь.",
      ],
      reading: [
        "Каждая опора воспринимает ровно одну нагрузку, поэтому реакции опор равны 400 Н.",
        "Эпюра изгибающего момента нарастает от опор и держится постоянной между нагрузками на уровне F * a. Этот участок и есть область чистого изгиба, и именно там балка нагружена сильнее всего.",
        "Наибольший прогиб приходится на середину пролёта, и он меньше, чем при той же суммарной нагрузке, приложенной в одной точке по центру: распределение нагрузки на два пункта — простой способ уменьшить изгиб.",
        "Поскольку сечение — труба, балка одинаково жёстка в обоих поперечных направлениях, поэтому те же значения справедливы и при боковой нагрузке.",
      ],
      formulas: [
        {
          expression: "a = 600 мм",
          meaning: "Расстояние от каждой опоры до ближайшей нагрузки.",
        },
        {
          expression: "M_max = F * a",
          meaning:
            "Изгибающий момент, постоянный на участке между двумя нагрузками.",
        },
        {
          expression: "delta_mid = F * a * (3 * L^2 - 4 * a^2) / (24 * E * I)",
          meaning: "Прогиб посередине пролёта — наибольший.",
        },
        {
          expression: "R_left = R_right = F",
          meaning: "Реакции опор; каждая опора несёт одну из нагрузок.",
        },
      ],
      faq: [
        {
          question: "Зачем две нагрузки вместо одной по центру?",
          answer:
            "Это уменьшает наибольший изгибающий момент и прогиб при той же суммарной нагрузке и создаёт участок постоянного момента, который заметно проще измерить или осмотреть, чем единичный пик.",
        },
        {
          question: "Что такое чистый изгиб?",
          answer:
            "Состояние, при котором изгибающий момент постоянен, а поперечная сила равна нулю, поэтому сечение только поворачивается, а не срезается. В испытаниях материалов используют именно его, так как сдвиг искажает измерения.",
        },
        {
          question: "Прогиб действительно меньше, чем при одной центральной нагрузке?",
          answer:
            "Да. При той же суммарной нагрузке, приложенной в одной точке посередине, прогиб в центре пролёта был бы больше; перенос нагружения к опорам укорачивает эффективную длину изгиба.",
        },
        {
          question: "Можно ли задать неравные нагрузки?",
          answer:
            "Да, укажите для каждой нагрузки своё значение в калькуляторе. Участок чистого изгиба при этом исчезнет, а эпюра момента станет трапецией вместо ровного участка.",
        },
      ],
    },
  },
};
