import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Simply supported beam with an off-centre load at the third point, made of a
 * solid rectangular bar loaded in the strong direction.
 */
export const simplySupportedThirdPointLoad: Problem = {
  slug: "simply-supported-third-point-load",
  group: "simply-supported",
  preset: {
    length: 1800,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.PIN,
    lastPoint: FixationEnum.ROLLER,
    profile: {
      profileType: ProfileType.RECTANGLE,
      profileData: { width: 10, height: 60 },
    },
    material: "Construction steel",
    loads: [
      {
        anchor: AnchorPoint.START,
        offset: 600,
        value: 400,
        angle: 0,
      },
    ],
  },
  content: {
    en: {
      title: "Beam with an Eccentric Point Load Calculator — Third-Point Loading",
      description:
        "Calculate a simply supported beam loaded at one third of its span. Deflection, maximum moment and unequal support reactions, with formulas.",
      h1: "Simply supported beam with an eccentric load",
      summary:
        "A rectangular steel bar supported at both ends and loaded at the third point: where the load sits decides which support works harder.",
      intro: [
        "Loads rarely sit exactly in the middle. A bracket bolted to one side, a wheel passing along a beam, or a machine hanging off centre all produce an eccentric point load, and the first thing that changes is how the two supports share the load.",
        "This page models that case: a solid rectangular steel bar, 10 mm thick and 60 mm deep, spanning 1800 mm between a pin and a roller, with a 400 N load applied 600 mm from the left support.",
        "Loading at the third point is also the standard arrangement of a four-point bending test, where the middle section is left in pure bending and can be measured without shear interference.",
      ],
      setup: [
        "The left support is a pin, the right one a roller.",
        "A vertical point load of 400 N acts 600 mm from the left support, which is one third of the span.",
        "The beam is a solid rectangular bar: 10 mm wide and 60 mm deep, so it bends about its strong axis.",
        "The span is 1800 mm and the material is construction steel.",
      ],
      reading: [
        "The support closer to the load carries more of it: the left reaction is twice the right one here, because the load sits at one third of the span.",
        "The bending moment peaks under the load rather than at midspan, and its value is F * a * b / L — with a shorter loaded side, the peak grows.",
        "The deflection maximum no longer sits under the load exactly; it shifts slightly towards midspan. The formula below gives the deflection at the load itself, and the calculator reports the deflection at every node, so you can see the whole shape and read off the peak.",
        "Because the bar is loaded in its strong direction, the section is deep rather than wide: laying it flat instead would make the beam 36 times more flexible.",
      ],
      formulas: [
        {
          expression: "a = 600 mm, b = 1200 mm",
          meaning:
            "Distances from the load to the left and right supports, with a + b = L.",
        },
        {
          expression: "M_max = F * a * b / L",
          meaning: "Maximum bending moment, located under the load.",
        },
        {
          expression: "R_left = F * b / L, R_right = F * a / L",
          meaning: "Support reactions; the nearer support takes the larger share.",
        },
        {
          expression: "delta_load = F * a^2 * b^2 / (3 * E * I * L)",
          meaning:
            "Deflection at the load point. The maximum is a little larger and sits slightly towards midspan.",
        },
      ],
      faq: [
        {
          question: "Which support is more loaded?",
          answer:
            "The one closer to the load. The reactions split inversely to the distance from the load, so at the third point the near support carries twice the far one.",
        },
        {
          question: "Why is the flat bar placed on edge?",
          answer:
            "Because the moment of inertia of a rectangle grows with the cube of the depth. Standing the 10 mm bar up to a 60 mm depth makes it 36 times stiffer in bending than laying it flat, since the width shrinks at the same time.",
        },
        {
          question: "Where does the maximum bending moment occur?",
          answer:
            "Directly under the load, not at midspan. For an eccentric point load the moment diagram is a triangle that peaks at the loading point.",
        },
        {
          question: "How is this related to a four-point bending test?",
          answer:
            "In a four-point test two symmetric loads create a region of constant bending moment between them, which lets you measure material properties without shear stresses. Moving the load to a third point is the same family of arrangement.",
        },
      ],
    },
    ru: {
      title: "Калькулятор балки с внецентренной точечной нагрузкой",
      description:
        "Расчёт шарнирно-опёртой балки с нагрузкой в трети пролёта. Прогиб, наибольший момент и неравные реакции опор, формулы.",
      h1: "Шарнирно-опёртая балка с внецентренной нагрузкой",
      summary:
        "Прямоугольная стальная балка на двух опорах с нагрузкой в трети пролёта: положение нагрузки определяет, какая опора нагружена сильнее.",
      intro: [
        "Нагрузки редко приходятся точно посередине. Кронштейн, привинченный сбоку, колесо, проезжающее по балке, или механизм, подвешенный вне центра, — всё это даёт внецентренную точечную нагрузку, и первое, что меняется, — распределение усилий между опорами.",
        "На этой странице смоделирован именно такой случай: сплошная стальная пластина толщиной 10 мм и высотой 60 мм пролётом 1800 мм между шарнирной и подвижной опорами, с нагрузкой 400 Н на расстоянии 600 мм от левой опоры.",
        "Загрузка в трети пролёта — это также стандартная схема испытания на изгиб по четырёгам точкам, когда средний участок работает на чистый изгиб и его можно измерять без влияния поперечной силы.",
      ],
      setup: [
        "Левая опора — шарнирная, правая — подвижная.",
        "В 600 мм от левой опоры, то есть в трети пролёта, приложена вертикальная точечная нагрузка 400 Н.",
        "Балка — сплошная прямоугольная пластина: ширина 10 мм, высота 60 мм, то есть изгиб идёт вокруг сильной оси.",
        "Пролёт составляет 1800 мм, материал — конструкционная сталь.",
      ],
      reading: [
        "Опора, ближайшая к нагрузке, воспринимает большую её часть: здесь левая реакция вдвое больше правой, поскольку нагрузка стоит в трети пролёта.",
        "Изгибающий момент достигает максимума под нагрузкой, а не посередине пролёта, и равен F * a * b / L — при уменьшении меньшего плеча момент растёт.",
        "Максимум прогиба приходится уже не точно под нагрузкой; он смещается к середине пролёта. Формула ниже даёт прогиб в точке нагружения, а калькулятор выдаёт прогиб в каждом узле, поэтому по схеме деформации виден весь изгиб и по нему можно найти максимум.",
        "Поскольку пластина нагружена по сильной оси, сечение высокое, а не широкое: уложить её плашмя — значит сделать балку в 36 раз гибче.",
      ],
      formulas: [
        {
          expression: "a = 600 мм, b = 1200 мм",
          meaning:
            "Расстояния от нагрузки до левой и правой опор, при этом a + b = L.",
        },
        {
          expression: "M_max = F * a * b / L",
          meaning: "Наибольший изгибающий момент в точке нагружения.",
        },
        {
          expression: "R_left = F * b / L, R_right = F * a / L",
          meaning:
            "Реакции опор; ближайшая к нагрузке опора нагружена сильнее.",
        },
        {
          expression: "delta_load = F * a^2 * b^2 / (3 * E * I * L)",
          meaning:
            "Прогиб в точке приложения нагрузки. Наибольший прогиб чуть больше и приходится немного ближе к середине пролёта.",
        },
      ],
      faq: [
        {
          question: "Какая опора нагружена сильнее?",
          answer:
            "Та, что ближе к нагрузке. Реакции распределяются обратно пропорционально расстоянию до нагрузки, поэтому в трети пролёта ближняя опора несёт вдвое большую нагрузку.",
        },
        {
          question: "Почему пластина поставлена на ребро?",
          answer:
            "Потому что момент инерции прямоугольника растёт с кубом высоты. Пластина толщиной 10 мм, поставленная на ребро высотой 60 мм, в 36 раз жёстче при изгибе, чем лежащая плашмя, поскольку ширина при этом уменьшается.",
        },
        {
          question: "Где возникает наибольший изгибающий момент?",
          answer:
            "Непосредственно под нагрузкой, а не посередине пролёта. Для внецентренной точечной нагрузки эпюра момента имеет вид треугольника с вершиной в точке нагружения.",
        },
        {
          question: "Как это связано с испытанием на изгиб по четырём точкам?",
          answer:
            "В таком испытании две симметричные нагрузки создают участок постоянного изгибающего момента, что позволяет измерять свойства материала без влияния поперечных напряжений. Загрузка в трети пролёта — та же семья схем.",
        },
      ],
    },
  },
};
