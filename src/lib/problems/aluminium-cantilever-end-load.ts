import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Aluminium cantilever arm. Same geometry as a steel rod, but the elastic
 * modulus of aluminium is roughly a third of steel, so stiffness is the
 * governing criterion rather than strength.
 */
export const aluminiumCantileverEndLoad: Problem = {
  slug: "aluminium-cantilever-end-load",
  group: "cantilever",
  preset: {
    length: 800,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.FIXED,
    lastPoint: FixationEnum.NONE,
    profile: {
      profileType: ProfileType.CYLINDRICAL,
      profileData: { outerDiameter: 16 },
    },
    material: "Aluminum",
    loads: [
      {
        anchor: AnchorPoint.END,
        offset: 0,
        value: 50,
        angle: 0,
      },
    ],
  },
  content: {
    en: {
      title: "Aluminium Cantilever Calculator — Deflection of an Aluminium Arm",
      description:
        "Calculate deflection and reactions of an aluminium cantilever arm. Compare aluminium and steel stiffness for the same cross section, online.",
      h1: "Aluminium cantilever arm",
      summary:
        "An aluminium rod fixed at one end and loaded at the other: why aluminium arms sag, and how to size one that does not.",
      intro: [
        "Aluminium is attractive for cantilevers because it is light and easy to machine, but it is roughly three times less stiff than steel. The elastic modulus of common aluminium alloys is around 69 000 MPa, against about 200 000 MPa for steel, and strength does not compensate for that: an aluminium arm will usually bend visibly long before it breaks.",
        "That is why aluminium cantilevers are normally sized by stiffness, not by strength. The calculator below is pre-set to a 16 mm aluminium rod over an 800 mm cantilever carrying 50 N at the tip — change the numbers to match your part.",
      ],
      setup: [
        "The left end is rigidly fixed.",
        "The right end is free.",
        "A vertical point load of 50 N acts at the free end, pointing down.",
        "The beam is a solid aluminium rod, 16 mm in diameter and 800 mm long.",
      ],
      reading: [
        "Compare this setup with a steel rod of the same diameter: the aluminium arm deflects close to three times more, because deflection is inversely proportional to the elastic modulus.",
        "To bring the aluminium arm back to the steel deflection you need a stiffer section — roughly three times the moment of inertia, which for a solid rod means about 32 percent more diameter.",
        "The reaction values also give you the support moment, which is what the clamp or weld has to carry. For aluminium, check that the bearing stress under the clamp is acceptable, since aluminium creeps under sustained load.",
      ],
      formulas: [
        {
          expression: "I = pi * d^4 / 64",
          meaning: "Moment of inertia of a solid circular section.",
        },
        {
          expression: "delta_max = F * L^3 / (3 * E * I)",
          meaning:
            "Deflection at the free end. E is the elastic modulus of the aluminium alloy.",
        },
        {
          expression: "delta_aluminium / delta_steel = E_steel / E_aluminium",
          meaning:
            "For identical geometry, deflection scales inversely with stiffness.",
        },
      ],
      faq: [
        {
          question: "Is aluminium really three times more flexible than steel?",
          answer:
            "For the same geometry, yes: deflection is inversely proportional to the elastic modulus, and common aluminium alloys have an elastic modulus of about 69 000 MPa against roughly 200 000 MPa for steel.",
        },
        {
          question: "Why not simply use a higher-strength aluminium alloy?",
          answer:
            "Because elastic modulus is a property of the base metal, not of the temper. Heat treatment and alloying change the strength substantially, but the stiffness of aluminium stays almost the same.",
        },
        {
          question: "How much thicker does an aluminium arm need to be?",
          answer:
            "For a solid round rod, to match a steel deflection you need about 32 percent more diameter, since the moment of inertia of a circle grows with the fourth power of the diameter.",
        },
        {
          question: "Should I worry about creep?",
          answer:
            "For a short-term load, no. Under a sustained load at room temperature aluminium can slowly deform, so keep service stresses low and avoid long thin arms that work close to their deflection limit all the time.",
        },
      ],
    },
    ru: {
      title: "Калькулятор алюминиевой консоли — прогиб алюминиевого рычага",
      description:
        "Расчёт прогиба и реакций алюминиевой консоли. Сравнение жёсткости алюминия и стали для одного сечения в онлайн-калькуляторе.",
      h1: "Алюминиевый рычаг-консоль",
      summary:
        "Алюминиевый прут, защемлённый с одного конца и нагруженный на другом: почему алюминиевые консоли провисают и как подобрать рычаг, который не будет.",
      intro: [
        "Алюминий привлекателен для консолей как лёгкий и легко обрабатываемый материал, но он примерно втрое менее жёсткий, чем сталь. Модуль упругости распространённых алюминиевых сплавов около 69 000 МПа, тогда как у стали — порядка 200 000 МПа, и прочность это не компенсирует: алюминиевый рычаг обычно заметно прогибается задолго до разрушения.",
        "Поэтому алюминиевые консоли подбирают по жёсткости, а не по прочности. Калькулятор ниже настроен на алюминиевый прут диаметром 16 мм, консолью 800 мм, нагруженный 50 Н на конце — измените значения под свою деталь.",
      ],
      setup: [
        "Левый конец защемлён.",
        "Правый конец свободен.",
        "В свободный конец вертикально вниз приложена точечная нагрузка 50 Н.",
        "Балка — сплошной алюминиевый прут диаметром 16 мм длиной 800 мм.",
      ],
      reading: [
        "Сравните эту схему со стальным прутом того же диаметра: алюминиевый рычаг прогибается почти втрое больше, так как прогиб обратно пропорционален модулю упругости.",
        "Чтобы вернуть алюминиевому рычагу прогиб стального, нужно увеличить момент инерции сечения примерно втрое, а для сплошного прута это около 32 процентов дополнительного диаметра.",
        "Реакции дают также момент в заделке, который должен выдержать зажим или шов. Для алюминия проверьте удельное давление под зажимом: при длительной нагрузке алюминий ползёт.",
      ],
      formulas: [
        {
          expression: "I = pi * d^4 / 64",
          meaning: "Момент инерции сплошного круглого сечения.",
        },
        {
          expression: "delta_max = F * L^3 / (3 * E * I)",
          meaning:
            "Прогиб на свободном конце. E — модуль упругости алюминиевого сплава.",
        },
        {
          expression: "delta_aluminium / delta_steel = E_steel / E_aluminium",
          meaning:
            "При одинаковой геометрии прогиб обратно пропорционален жёсткости.",
        },
      ],
      faq: [
        {
          question: "Алюминий действительно втрое гибче стали?",
          answer:
            "Для одинаковой геометрии — да: прогиб обратно пропорционален модулю упругости, а у распространённых алюминиевых сплавов он около 69 000 МПа против примерно 200 000 МПа у стали.",
        },
        {
          question: "Почему не взять просто более прочный алюминиевый сплав?",
          answer:
            "Потому что модуль упругости — свойство основного металла, а не состояния закалки. Легирование и термообработка заметно меняют прочность, но жёсткость алюминия почти не изменяется.",
        },
        {
          question: "Насколько должен быть толще алюминиевый рычаг?",
          answer:
            "Для сплошного круглого прута, чтобы сравняться со стальным по прогибу, нужен примерно на 32 процента больший диаметр, так как момент инерции круга растёт с четвёртой степенью диаметра.",
        },
        {
          question: "Нужно ли беспокоиться о ползучести?",
          answer:
            "Для кратковременной нагрузки — нет. При длительной нагрузке при комнатной температуре алюминий может медленно деформироваться, поэтому держите рабочие напряжения низкими и избегайте длинных тонких рычагов, постоянно работающих у предела прогиба.",
        },
      ],
    },
  },
};
