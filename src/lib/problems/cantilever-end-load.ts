import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Classic cantilever: fixed at the left end, free at the right end, a single
 * vertical point load applied at the free end.
 */
export const cantileverEndLoad: Problem = {
  slug: "cantilever-end-load",
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
        anchor: AnchorPoint.END,
        offset: 0,
        value: 100,
        angle: 0,
      },
    ],
  },
  content: {
    en: {
      title: "Cantilever Beam Calculator — Point Load at the Free End",
      description:
        "Solve a cantilever beam with a point load at the free end. Free online calculator with deflection, slope and support reactions, plus the closed-form formulas.",
      h1: "Cantilever beam with a load at the free end",
      summary:
        "A beam fixed at one end and loaded at the free end: deflection, slope and reactions, solved online.",
      intro: [
        "A cantilever is a beam that is rigidly fixed at one end and free at the other. It is one of the most common structures you run into in practice: a shelf bracket, a cantilevered balcony, a jib, a sign post or a machine arm all behave like this.",
        "This page solves the textbook case: a single concentrated force acting downward at the free end of the beam. The calculator below is already loaded with this exact setup, so you only need to change the length, the load, the cross section or the material to get your own numbers.",
      ],
      setup: [
        "The left end is rigidly fixed: it can neither move nor rotate.",
        "The right end is free: it carries no support at all.",
        "A vertical point load acts at the free end, pointing down.",
        "The beam is a solid steel rod, 20 mm in diameter and 1000 mm long.",
      ],
      reading: [
        "The largest deflection always appears at the free end, and the slope is largest there as well. Deflection grows with the cube of the length, so doubling the beam length makes it eight times more flexible — this is the single most important thing to keep in mind when sizing a cantilever.",
        "The reactions reported by the calculator are the shear force and the bending moment that the fixed support has to provide. The moment at the fixed end is the design quantity: it is where the beam is most likely to break or to yield.",
      ],
      formulas: [
        {
          expression: "delta_max = F * L^3 / (3 * E * I)",
          meaning:
            "Deflection at the free end. F is the load, L the beam length, E the elastic modulus and I the bending moment of inertia of the cross section.",
        },
        {
          expression: "theta_max = F * L^2 / (2 * E * I)",
          meaning: "Slope at the free end, in radians.",
        },
        {
          expression: "M_max = F * L",
          meaning:
            "Bending moment at the fixed end, the most stressed section of the beam.",
        },
      ],
      faq: [
        {
          question: "Where does a cantilever beam break first?",
          answer:
            "At the fixed end. The bending moment grows linearly along the beam and reaches its maximum F * L at the support, so that is where the stresses are highest.",
        },
        {
          question: "Why does a small extension of a cantilever cause such a large deflection?",
          answer:
            "Because deflection is proportional to the cube of the length. Doubling the free length multiplies the deflection by eight, while the load-carrying capacity only grows linearly.",
        },
        {
          question: "Does the calculator account for shear deformation?",
          answer:
            "Yes. The underlying Frame3DD kernel uses a stiffness formulation that includes shear, so short and stocky beams are reported more accurately than with the pure Euler-Bernoulli formula above.",
        },
        {
          question: "Can I use this page for a shelf bracket or a balcony arm?",
          answer:
            "Yes, as long as the structure really is a single prismatic beam fixed at one end and loaded at the other. Real brackets with gussets or tapered sections are stiffer, so treat the result as a conservative estimate.",
        },
      ],
    },
    ru: {
      title: "Калькулятор консоли — сосредоточенная нагрузка на свободном конце",
      description:
        "Расчёт консоли с точечной нагрузкой на свободном конце. Бесплатный онлайн-калькулятор прогиба, угла поворота и опорных реакций, формулы вида.",
      h1: "Консоль с нагрузкой на свободном конце",
      summary:
        "Балка, жёстко защемлённая с одного конца и нагруженная на другом: прогиб, угол поворота и реакции опор онлайн.",
      intro: [
        "Консоль — это балка, жёстко закреплённая с одного конца и свободная с другого. Это одна из самых распространённых конструкций на практике: кронштейн полки, консольный балкон, стрела, опора указателя или рычаг механизма работают именно так.",
        "На этой странице решается задача из учебника: одна сосредоточенная сила, приложенная вертикально вниз к свободному концу балки. Калькулятор ниже уже настроен на эту схему — достаточно изменить длину, нагрузку, сечение или материал, чтобы получить свои значения.",
      ],
      setup: [
        "Левый конец защемлён: он не может ни смещаться, ни поворачиваться.",
        "Правый конец свободен: опора на нём отсутствует.",
        "В свободный конец приложена вертикальная точечная нагрузка, направленная вниз.",
        "Балка — стальной прут диаметром 20 мм длиной 1000 мм.",
      ],
      reading: [
        "Наибольший прогиб и наибольший угол поворота всегда возникают на свободном конце. Прогиб растёт с кубом длины, поэтому удвоение длины консоли увеличивает её гибкость в восемь раз — это главное, что нужно помнить при подборе консоли.",
        "Реакции, которые выдаёт калькулятор, — это поперечная сила и изгибающий момент, которые должна воспринимать заделка. Момент в заделанном сечении — расчётная величина: именно там балка наиболее вероятно разрушится или получит пластические деформации.",
      ],
      formulas: [
        {
          expression: "delta_max = F * L^3 / (3 * E * I)",
          meaning:
            "Прогиб на свободном конце. F — нагрузка, L — длина балки, E — модуль упругости, I — момент инерции сечения.",
        },
        {
          expression: "theta_max = F * L^2 / (2 * E * I)",
          meaning: "Угол поворота на свободном конце, в радианах.",
        },
        {
          expression: "M_max = F * L",
          meaning:
            "Изгибающий момент в заделке — в самом нагруженном сечении балки.",
        },
      ],
      faq: [
        {
          question: "Где консоль разрушается в первую очередь?",
          answer:
            "В заделке. Изгибающий момент нарастает вдоль балки линейно и достигает максимума F * L у опоры, поэтому там же наибольшие напряжения.",
        },
        {
          question: "Почему небольшое удлинение консоли даёт такой большой прогиб?",
          answer:
            "Потому что прогиб пропорционален кубу длины. Удвоение свободной длины увеличивает прогиб в восемь раз, а моментное сопротивление растёт лишь линейно.",
        },
        {
          question: "Учитывает ли калькулятор деформации от поперечной силы?",
          answer:
            "Да. Ядро Frame3DD использует жёсткостную схему с учётом сдвига, поэтому короткие и массивные балки считаются точнее, чем по формуле Эйлера-Бернулли, приведённой выше.",
        },
        {
          question: "Можно ли использовать страницу для расчёта кронштейна полки или консоли балкона?",
          answer:
            "Да, если конструкция действительно представляет собой однородную балку, защемлённую с одного конца и нагруженную с другого. Реальные кронштейны с накладками или переменным сечением жёстче, поэтому полученный результат стоит считать оценкой с запасом.",
        },
      ],
    },
  },
};
