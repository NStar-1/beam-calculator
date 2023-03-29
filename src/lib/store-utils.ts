import type { FixationType, Point, PointLoad } from "./store";

export function shiftNode(el: any) {
  const res = { ...el };
  if (res.id && (res.x !== 0 || res.offset !== 0)) {
    res.id = res.id - 1;
  } else {
    res.node = res.node - 1;
  }
  return res;
}

export const convertFixation = (fixation: FixationType): 0 | 1 => {
  switch (fixation) {
    case "NONE":
      return 0;
    case "FIXED":
    case "PIN":
    case "ROLLER":
      return 1;
  }
};

export const convertLoads = (loads: PointLoad[]) => {
  return loads.map((l) => ({
    axial: [Math.cos(l.angle) * l.load, Math.sin(l.angle) * l.load, 0],
    id: l.node,
    number: 1,
    rotational: [0, 0, 0],
  }));
};

export const processPointLoads = (
  firstPoint: Point,
  lastPoint: Point,
  points: Point[],
  loads: PointLoad[],
  length: number
): { points: Point[]; loads: PointLoad[] } => {
  let pointsRes: Point[] = [firstPoint, ...points];
  let loadsRes: PointLoad[] = [...loads];
  if (points[0].x === 0) {
    pointsRes = [firstPoint, ...points.slice(1).map(shiftNode)];
    loadsRes = loads.map(shiftNode);
  }
  const lastPtIdx = points.length - 1;
  if (points[lastPtIdx].x === length) {
    pointsRes[lastPtIdx] = {
      ...pointsRes[lastPtIdx],
      isFixed: lastPoint.isFixed,
    };
  } else {
    pointsRes.push({
      ...lastPoint,
      id: points[lastPtIdx].id + 1,
    });
  }

  return {
    points: pointsRes,
    loads: loadsRes,
  };
};
