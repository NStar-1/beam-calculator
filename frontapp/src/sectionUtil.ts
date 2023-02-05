import type {
  CylindricalProfile,
  HollowRectangularProfile,
  IBeamProfile,
  ProfileDescription,
  RectangularProfile,
  RoundTubeProfile,
} from "./store";

// From http://svn.code.sourceforge.net/p/frame3dd/code/trunk/doc/Frame3DD-manual.html
export function roundTube({
  innerRadius: ri,
  outerRadius: ro,
}: RoundTubeProfile): ProfileDescription {
  const Ax = Math.PI * (ro * ro - ri * ri);
  const rio = ri / ro;
  const Asy = Ax / (0.54414 + 2.97294 * rio - 1.51899 * rio * rio);
  const Asz = Asy;
  const Jx = (Math.PI * (ro ** 4 - ri ** 4)) / 2;
  const Iy = Jx / 2;
  const Iz = Iy;

  return { Ax, Asy, Asz, Jx, Iy, Iz };
}

// From http://svn.code.sourceforge.net/p/frame3dd/code/trunk/doc/Frame3DD-manual.html
export function cylindrical({
  outerRadius: ro,
}: CylindricalProfile): ProfileDescription {
  const Ax = Math.PI * ro * ro;
  const Asy = Ax;
  const Asz = Asy;
  const Jx = (Math.PI * ro ** 4) / 2;
  const Iy = Jx / 2;
  const Iz = Iy;

  return { Ax, Asy, Asz, Jx, Iy, Iz };
}

// From http://svn.code.sourceforge.net/p/frame3dd/code/trunk/doc/Frame3DD-manual.html
export function rectangular({
  width: a, height: b,
}: RectangularProfile): ProfileDescription {
  const Ax = a * b;
  // FIXME: 'v' is stands for Poisson ratio, need to research how to pick correct value, see http://svn.code.sourceforge.net/p/frame3dd/code/trunk/doc/Frame3DD-manual.html#structuralmodeling
  const v = 0.25;
  const Asy = Ax * (5 + 5 * v) / (6 + 5 * v);
  const Asz = Asy;
  // BUG: yeah yeah, I know that I studied math for 5 years... 
  const Jx = Math.pow(a, 2) * Math.pow(b, 2) / (a + b);
  const Iy = (1 / 12) * (a * Math.pow(b, 3) - a);
  const Iz = (1 / 12) * (b * Math.pow(a, 3) - b);

  return { Ax, Asy, Asz, Jx, Iy, Iz };
}

// From http://svn.code.sourceforge.net/p/frame3dd/code/trunk/doc/Frame3DD-manual.html
export function rectangularTube({
  width: a, height: b, thickness: t,
}: HollowRectangularProfile): ProfileDescription {
  const Ax = a * b - (a - 2 * t) * (b - 2 * t);
  if (a === b) {
    const Asy = Ax / (2.39573 - 0.25009 * (t / b) - 7.89675 * Math.pow(t / b, 2));
    const Asz = Asy;
    const Jx = Math.pow(b - t, 3) * t;
    const Iy = (1 / 12) * (Math.pow(b, 4) - Math.pow(b - 2 * t, 4));
    const Iz = Iy;
    return { Ax, Asy, Asz, Jx, Iy, Iz };
  }

  const c1 = 0.93498;
  const c2 = 1.28084;
  const c3 = 1.36441;
  const c4 = 0.00295;
  const c5 = 0.25797;
  const c6 = 1.63544;
  const c7 = 8.34935;
  const c8 = 0.60125;
  const c9 = 0.41403;
  const c10 = 4.95373;
  const Asy = Ax / (a > b
    ? c1 - c2 * (t / b) + c3 * (b / a) + c4 * (Math.pow(a / b, 2)) + c5 * (t * a / Math.pow(b, 2))
    : c6 - c7 * (t / a) + c8 * (b / a) + c9 * (Math.pow(b / a, 2)) + c10 * (t * b / Math.pow(a, 2)));
  const Asz = Ax / (a > b 
    ? c6 - c7 * (t / b) + c8 * (a / b) + c9 * (Math.pow(a / b, 2)) + c10 * (t * a / Math.pow(b, 2))
    : c1 - c2 * (t / a) + c3 * (a / b) + c4 * (Math.pow(b / a, 2)) + c5 * (t * b / Math.pow(a, 2)));

  const Jx = 2 * t * Math.pow(a - t, 2) * Math.pow(b - t, 2) / (a + b - 2 * t);
  const Iy = (1 / 12) * (a * Math.pow(b, 3) - (a - 2 * t) * Math.pow(b - 2 * t, 3));
  const Iz = (1 / 12) * (b * Math.pow(a, 3) - (b - 2 * t) * Math.pow(a - 2 * t, 3));

  return { Ax, Asy, Asz, Jx, Iy, Iz };
}

// From http://svn.code.sourceforge.net/p/frame3dd/code/trunk/doc/Frame3DD-manual.html
export function iBeam({
  depth: d, width: b, flangeThickness: t, webThickness: w,
}: IBeamProfile): ProfileDescription {
  console.log(d, b, t, w);
  const Ax = b * d - (d - 2 * t) * (b - w);
  const Asy = 1.64 * b * t;
  const Asz = d * w;
  const Jx = (1 / 3) * (2 * b * Math.pow(t, 3) + d * Math.pow(w, 3));
  const Iy = (1 / 12) * (b * Math.pow(d, 3) - (b - w) * Math.pow(d - 2 * t, 3));
  const Iz = (1 / 12) * (2 * t * Math.pow(b, 3) + (d - 2 * t) * Math.pow(w, 3));

  return { Ax, Asy, Asz, Jx, Iy, Iz };
}
