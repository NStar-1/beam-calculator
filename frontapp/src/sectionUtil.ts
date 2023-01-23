import type {
  CylindricalProfile,
  ProfileDescription,
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
  const Jx = (Math.PI * (ro ** 4)) / 2;
  const Iy = Jx / 2;
  const Iz = Iy;

  return { Ax, Asy, Asz, Jx, Iy, Iz };
}
