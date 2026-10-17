import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Steel pipe spanning between two supports and loaded in the middle — the
 * "will my pipe bend" question, answered with numbers.
 */
export const steelPipeMidLoad: Problem = {
  slug: "steel-pipe-mid-load",
  group: "simply-supported",
  preset: {
    length: 2000,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.PIN,
    lastPoint: FixationEnum.ROLLER,
    profile: {
      profileType: ProfileType.ROUND_TUBE,
      profileData: { outerDiameter: 42.4, innerDiameter: 36 },
    },
    material: "Construction steel",
    loads: [
      {
        anchor: AnchorPoint.MIDDLE,
        offset: 0,
        value: 300,
        angle: 0,
      },
    ],
  },
  content: {
    en: {
      title: "Steel Pipe Deflection Calculator — Load Applied in the Middle",
      description:
        "Will a steel pipe bend under a load in the middle? Calculate pipe deflection and reactions online for a supported steel tube, with formulas.",
      h1: "Steel pipe loaded in the middle",
      summary:
        "A steel pipe on two supports with a load at midspan: how much it bends, and which pipe dimensions actually matter.",
      intro: [
        "\"Will a steel pipe bend if I hang something in the middle of it?\" is one of the most common questions in everyday workshop engineering — for handrails, canopy frames, rack beams, tent structures or a simple improvised support.",
        "The answer always depends on three things: the pipe diameter, the wall thickness and the span. Because the moment of inertia of a tube grows with the fourth power of the outer diameter, a modest increase in diameter helps far more than adding steel to the wall.",
        "This page is pre-set to a DN32 pipe — 42.4 mm outer diameter with a 3.2 mm wall — spanning 2 m between two supports and loaded with 300 N at midspan. Adjust the three numbers to your own pipe.",
      ],
      setup: [
        "The left support is a pin, the right one a roller.",
        "A vertical point load of 300 N acts at midspan, pointing down.",
        "The beam is a hollow round tube: 42.4 mm outer diameter, 36 mm inner diameter, 3.2 mm wall.",
        "The span is 2000 mm and the material is construction steel.",
      ],
      reading: [
        "The reported deflection is what you would measure at midspan with a ruler. In practice, for a handrail or a rack beam people usually want the deflection to stay below roughly one two hundredth of the span; compare your value against whatever limit applies to your structure.",
        "The pipe bends about whichever axis the load acts in, and a circular section has the same moment of inertia in every direction, so a pipe never has a weak bending direction — unlike an I-beam or a rectangular tube.",
        "The reactions tell you what the supports must carry, and the moment under the load tells you the largest bending stress in the pipe wall.",
        "If the wall is too thin relative to the outer diameter, the section is no longer a valid tube and the model is rejected — a reminder that very thin tubes also fail by local buckling long before the material yields.",
      ],
      formulas: [
        {
          expression: "I = pi * (D^4 - d^4) / 64",
          meaning:
            "Moment of inertia of the pipe. D is the outer and d the inner diameter.",
        },
        {
          expression: "delta_max = F * L^3 / (48 * E * I)",
          meaning: "Deflection at midspan.",
        },
        {
          expression: "M_max = F * L / 4",
          meaning: "Bending moment under the load.",
        },
        {
          expression: "sigma = M_max * (D / 2) / I",
          meaning:
            "Bending stress in the outer fibre of the pipe wall, in MPa when M is in N·mm and I in mm⁴.",
        },
      ],
      faq: [
        {
          question: "How much does a steel pipe sag under its own weight?",
          answer:
            "The calculator only includes the loads you enter. Add the pipe mass as an extra load at midspan to include it; for long spans the self weight can be a significant share of the total.",
        },
        {
          question: "Does a thicker wall make a big difference?",
          answer:
            "Less than you would expect. The moment of inertia depends on the fourth power of the diameter but only roughly on the first power of the wall, so up-sizing the diameter is the far more effective lever.",
        },
        {
          question: "What is a good deflection limit for a pipe?",
          answer:
            "There is no single universal limit. Handrails and cosmetic structures are usually held to about L/200, machine components to much tighter values, while a temporary support can tolerate more. Always check the rule that applies to your application.",
        },
        {
          question: "Can I check a pipe resting on three supports?",
          answer:
            "Not with this model. The calculator analyses a single span between two supports; a continuous multi-span beam behaves more stiffly because the intermediate supports also resist rotation.",
        },
      ],
    },
    ru: {
      title: "Калькулятор прогиба стальной трубы — нагрузка посередине",
      description:
        "Прогнётся ли стальная труба под нагрузкой посередине? Онлайн-расчёт прогиба и реакций опёртой стальной трубы, формулы.",
      h1: "Стальная труба с нагрузкой посередине",
      summary:
        "Стальная труба на двух опорах с нагрузкой в середине пролёта: насколько она прогибается и какие размеры трубы действительно важны.",
      intro: [
        "«Прогнётся ли стальная труба, если подвесить на неё что-нибудь посередине?» — один из самых частых вопросов повседневной мастерской: перила, каркасы навесов, балки стеллажей, каркасы шатров или простая самодельная опора.",
        "Ответ всегда зависит от трёх вещей: диаметра трубы, толщины стенки и пролёта. Поскольку момент инерции трубы растёт с четвёртой степенью наружного диаметра, умеренное увеличение диаметра помогает гораздо сильнее, чем добавление металла в стенку.",
        "На странице заранее настроена труба DN32 — наружный диаметр 42,4 мм при толщине стенки 3,2 мм — пролётом 2 м между двумя опорами с нагрузкой 300 Н посередине. Подставьте под свои размеры три нужных значения.",
      ],
      setup: [
        "Левая опора — шарнирная, правая — подвижная.",
        "В середине пролёта приложена вертикальная точечная нагрузка 300 Н, направленная вниз.",
        "Балка — полая круглая труба: наружный диаметр 42,4 мм, внутренний 36 мм, толщина стенки 3,2 мм.",
        "Пролёт составляет 2000 мм, материал — конструкционная сталь.",
      ],
      reading: [
        "Выдаваемый прогиб — это то, что вы измерите линейкой посередине пролёта. На практике для перил или балки стеллажа обычно стремятся удержать прогиб не более примерно одной двухсотой пролёта; сравните своё значение с допуском, применимым к вашей конструкции.",
        "Труба изгибается вокруг оси, вдоль которой направлена нагрузка, а круглое сечение имеет одинаковый момент инерции во всех направлениях, поэтому у трубы нет «слабого» направления изгиба — в отличие от двутавра или прямоугольной трубы.",
        "Реакции показывают, что должны выдержать опоры, а момент под нагрузкой — наибольшие нормальные напряжения изгиба в стенке трубы.",
        "Если стенка слишком тонкая относительно наружного диаметра, сечение перестаёт быть корректной трубой, и модель отклоняется — напоминание о том, что очень тонкие трубы разрушаются местной волной до текучести материала.",
      ],
      formulas: [
        {
          expression: "I = pi * (D^4 - d^4) / 64",
          meaning:
            "Момент инерции трубы. D — наружный, d — внутренний диаметр.",
        },
        {
          expression: "delta_max = F * L^3 / (48 * E * I)",
          meaning: "Прогиб посередине пролёта.",
        },
        {
          expression: "M_max = F * L / 4",
          meaning: "Изгибающий момент под нагрузкой.",
        },
        {
          expression: "sigma = M_max * (D / 2) / I",
          meaning:
            "Нормальное напряжение изгиба в наружном волокне стенки трубы, в МПа при M в Н·мм и I в мм⁴.",
        },
      ],
      faq: [
        {
          question: "Насколько труба прогибается под собственным весом?",
          answer:
            "Калькулятор учитывает только заданные вами нагрузки. Чтобы добавить вес трубы, укажите его отдельной нагрузкой посередине пролёта; на длинных пролётах собственный вес может быть существенной частью суммарной нагрузки.",
        },
        {
          question: "Утолщение стенки сильно помогает?",
          answer:
            "Менее, чем ожидается. Момент инерции зависит от четвёртой степени диаметра и лишь приблизительно от первой — толщины стенки, поэтому увеличение диаметра работает куда эффективнее.",
        },
        {
          question: "Какой допустимый прогиб считать нормальным для трубы?",
          answer:
            "Единого универсального предела нет. Для перил и заметных конструкций обычно держат около L/200, для машинных элементов требования жёстче, а временная опора допускает больше. Всегда проверяйте правило, применимое к вашему случаю.",
        },
        {
          question: "Можно ли проверить трубу на трёх опорах?",
          answer:
            "С этой моделью — нет. Калькулятор анализирует однопролётную балку между двумя опорами; непрерывная многопролётная балка жёстче, поскольку промежуточные опоры также ограничивают поворот.",
        },
      ],
    },
  },
};
