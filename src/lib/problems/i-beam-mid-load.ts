import { AnchorPoint, FixationEnum, ProfileType } from "$lib/model";
import type { Problem } from "./types";

/**
 * Simply supported I-section beam, loaded at midspan. Uses an IPE 120 profile
 * in structural carbon steel.
 */
export const iBeamMidLoad: Problem = {
  slug: "i-beam-mid-load",
  group: "simply-supported",
  preset: {
    length: 3000,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: FixationEnum.PIN,
    lastPoint: FixationEnum.ROLLER,
    profile: {
      profileType: ProfileType.I_BEAM,
      profileData: {
        width: 64,
        depth: 120,
        flangeThickness: 5.2,
        webThickness: 4.4,
      },
    },
    material: "ASTM A36",
    loads: [
      {
        anchor: AnchorPoint.MIDDLE,
        offset: 0,
        value: 2000,
        angle: 0,
      },
    ],
  },
  content: {
    en: {
      title: "I-Beam Calculator — Simply Supported Steel Beam, Load at Midspan",
      description:
        "Calculate deflection and reactions of a simply supported I-beam loaded in the middle. Set the flange and web dimensions of your own profile online.",
      h1: "I-beam on two supports with a load at midspan",
      summary:
        "An IPE 120 steel beam spanning 3 m and loaded at the centre: deflection, moment and reactions for an I-section.",
      intro: [
        "The I-section is the standard answer for beams in buildings and machine frames. Almost all of its material sits far from the neutral axis, in the flanges, where it does the most useful work in bending, while the thin web mainly carries the shear.",
        "This page models an IPE 120 profile in ASTM A36 structural carbon steel, spanning 3 m between a pin and a roller and carrying 2 kN at midspan. That is a realistic small lintel, shelf support or machine frame member.",
        "The calculator takes the flange width, the depth, the flange thickness and the web thickness, so you can replace the profile with any rolled or welded I-section.",
      ],
      setup: [
        "The left support is a pin, the right one a roller.",
        "A vertical point load of 2000 N acts at midspan, pointing down.",
        "The section is an I-profile: 120 mm deep, 64 mm wide flange, 5.2 mm flange thickness and 4.4 mm web thickness.",
        "The span is 3000 mm and the material is ASTM A36 structural carbon steel.",
      ],
      reading: [
        "The beam bends about its strong axis, the one the depth contributes to. The moment of inertia grows with the cube of the depth, so the 120 mm dimension is what makes this profile useful — laying an I-section on its side removes most of its advantage.",
        "Compare the reported deflection with the limits that apply to your structure. For a floor or a shelf a common serviceability target is span divided by 200 to 360, while machine parts usually need much less.",
        "The web does not carry much bending, so the two flanges do the work: check the bending stress in the calculator against the yield strength of your steel grade before trusting the deflection figure.",
        "If the flange becomes thicker than half the depth, or the web becomes as wide as the flange, the section is rejected as geometrically invalid.",
      ],
      formulas: [
        {
          expression: "I_z = (b * d^3 - (b - t_w) * (d - 2 * t_f)^3) / 12",
          meaning:
            "Moment of inertia about the strong axis. b is the flange width, d the depth, t_f the flange thickness and t_w the web thickness.",
        },
        {
          expression: "delta_max = F * L^3 / (48 * E * I_z)",
          meaning: "Deflection at midspan.",
        },
        {
          expression: "M_max = F * L / 4",
          meaning: "Bending moment under the load.",
        },
        {
          expression: "sigma = M_max * (d / 2) / I_z",
          meaning:
            "Bending stress in the outer flange fibre, in MPa when M is in N·mm and I in mm⁴.",
        },
      ],
      faq: [
        {
          question: "What is the difference between IPE and other I-sections?",
          answer:
            "IPE is a European standard beam series with parallel flanges and standardized dimensions. The calculator does not use a catalogue: you enter the dimensions, so it works equally well for HEA, HEB, W-shapes or a welded plate girder.",
        },
        {
          question: "Why is an I-section so much better than a solid bar?",
          answer:
            "Because bending stress is highest at the outer fibres. Moving material into the flanges, away from the neutral axis, raises the moment of inertia enormously while removing the nearly unused material around the neutral axis.",
        },
        {
          question: "Can I load the beam sideways?",
          answer:
            "You can, but the weak axis is far more flexible. An I-section loaded perpendicular to its web is meant to be avoided in real designs unless it is laterally restrained.",
        },
        {
          question: "Does the calculator check buckling?",
          answer:
            "No. This is a linear static analysis: it reports deflections, reactions and internal forces. Lateral torsional buckling and member stability have to be checked separately with the code you follow.",
        },
      ],
    },
    ru: {
      title: "Калькулятор двутавровой балки — шарнирная опора, нагрузка посередине",
      description:
        "Расчёт прогиба и реакций шарнирно-опёртой двутавровой балки с нагрузкой посередине. Задайте размеры полки и стенки своего профиля онлайн.",
      h1: "Двутавровая балка на двух опорах с нагрузкой посередине",
      summary:
        "Двутавр IPE 120 пролётом 3 м с нагрузкой по центру: прогиб, момент и реакции для двутаврового сечения.",
      intro: [
        "Двутавровое сечение — стандартное решение для балок в зданиях и рамах механизмов. Почти весь металл сосредоточен далеко от нейтральной оси, в полках, где он полезнее всего работает на изгиб, а тонкая стенка в основном воспринимает поперечную силу.",
        "На странице смоделирован профиль IPE 120 из конструкционной углеродистой стали ASTM A36, пролётом 3 м между шарнирной и подвижной опорами, с нагрузкой 2 кН посередине пролёта. Это реалистичная небольшая перемычка, опора полки или элемент рамы механизма.",
        "Калькулятор принимает ширину полки, высоту, толщину полки и толщину стенки, поэтому профиль можно подставить любой прокатный или сварной двутавр.",
      ],
      setup: [
        "Левая опора — шарнирная, правая — подвижная.",
        "В середине пролёта приложена вертикальная точечная нагрузка 2000 Н, направленная вниз.",
        "Сечение — двутавр: высота 120 мм, ширина полки 64 мм, толщина полки 5,2 мм, толщина стенки 4,4 мм.",
        "Пролёт составляет 3000 мм, материал — конструкционная углеродистая сталь ASTM A36.",
      ],
      reading: [
        "Балка изгибается вокруг сильной оси, к которой вносит вклад высота. Момент инерции растёт с кубом высоты, поэтому 120 мм и делают профиль полезным: положить двутавр набок — значит потерять почти всё его преимущество.",
        "Сравните полученный прогиб с допусками, применими к вашей конструкции. Для перекрытия или полки обычно ориентируются на пролёт, делённый на 200…360, а элементы механизмов требуют существенно меньших прогибов.",
        "Стенка почти не работает на изгиб, поэтому основную работу ведут полки: сверьте нормальные напряжения изгиба из калькулятора с пределом текучести вашей марки стали, прежде чем доверять значению прогиба.",
        "Если полка окажется толще половины высоты, а ширина стенки — не уже полки, сечение будет признано геометрически некорректным.",
      ],
      formulas: [
        {
          expression: "I_z = (b * d^3 - (b - t_w) * (d - 2 * t_f)^3) / 12",
          meaning:
            "Момент инерции вокруг сильной оси. b — ширина полки, d — высота, t_f — толщина полки, t_w — толщина стенки.",
        },
        {
          expression: "delta_max = F * L^3 / (48 * E * I_z)",
          meaning: "Прогиб посередине пролёта.",
        },
        {
          expression: "M_max = F * L / 4",
          meaning: "Изгибающий момент под нагрузкой.",
        },
        {
          expression: "sigma = M_max * (d / 2) / I_z",
          meaning:
            "Нормальное напряжение изгиба в наружном волокне полки, в МПа при M в Н·мм и I в мм⁴.",
        },
      ],
      faq: [
        {
          question: "Чем IPE отличается от других двутавров?",
          answer:
            "IPE — европейская серия двутавров с параллельными гранями полок и стандартизованными размерами. Калькулятор не использует справочник: размеры вводятся вручную, поэтому одинаково хорошо подходят HEA, HEB, двутавры W или сварная балка.",
        },
        {
          question: "Почему двутавр так сильно лучше сплошной балки?",
          answer:
            "Потому что нормальные напряжения изгиба максимальны у наружных волокон. Перенос металла в полки, подальше от нейтральной оси, резко увеличивает момент инерции и одновременно убирает почти не работающий материал у самой оси.",
        },
        {
          question: "Можно ли нагружать балку боком?",
          answer:
            "Можно, но слабая ось куда гибче. Двутавр, нагруженный перпендикулярно плоскости стенки, в реальных конструкциях стараются не использовать без боковой защемки.",
        },
        {
          question: "Проверяет ли калькулятор устойчивость?",
          answer:
            "Нет. Это линейный статический расчёт: он выдаёт прогибы, реакции и внутренние усилия. Боковой кручительный изгиб и устойчивость элемента проверяются отдельно по нормам, которые вы применяете.",
        },
      ],
    },
  },
};
