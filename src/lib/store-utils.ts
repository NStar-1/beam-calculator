import {
  AnchorPoint,
  FixationEnum,
  type FixationType,
  type BeamEnd,
  type PointLoad,
} from "./store";

export function shiftNode(el: any) {
  const res = { ...el };
  if (res.id && (res.x !== 0 || res.offset !== 0)) {
    res.id = res.id - 1;
  } else {
    res.node = res.node - 1;
  }
  return res;
}

export function deg2rad(d: number) {
  return (d * Math.PI) / 180;
}

export function rad2deg(d: number) {
  return (d * 180) / Math.PI;
}

export const convertLoads = (loads: PointLoad[]) => {
  return loads.map((l) => ({
    axial: [Math.cos(l.angle) * l.value, Math.sin(l.angle) * l.value, 0],
    //id: l.node,
    number: 1,
    rotational: [0, 0, 0],
  }));
};

/**
 * Tells if the `point` is placed at one of the beam ends
 * Returns the beam point or false
 */
//export function isBeamPoint(
//  [start, end]: Array<BeamEnd>,
//  point: BeamEnd
//): BeamEnd | false {
//  // Check if the point is exactly the same beam point
//  if (point === start || point === end) return point;
//  else if (point.x === start.x) return start;
//  else if (point.x === end.x) return end;
//  return false;
//}

/**
 * Similar to `isBeamPoint`. Check if the point load is applied to an
 * existing beam point
 */
//export function isBeamEndForce(
//  [start, end]: Array<BeamEnd>,
//  pointLoad: PointLoad
//): BeamEnd | false {
//  if (pointLoad.anchor === AnchorPoint.START && pointLoad.offset === 0)
//    return start;
//  else if (pointLoad.anchor === AnchorPoint.START && pointLoad.offset === end.x)
//    return end;
//  else if (pointLoad.anchor === AnchorPoint.END && pointLoad.offset === 0)
//    return end;
//  else if (pointLoad.anchor === AnchorPoint.END && pointLoad.offset === end.x)
//    return start;
//  return false;
//}

export function getLoadAbsPos(load: PointLoad, length: number) {
  const { anchor, offset } = load;
  if (anchor === AnchorPoint.MIDDLE) return length / 2;
  else if (anchor === AnchorPoint.START) return offset;
  else if (anchor === AnchorPoint.END) return length - offset;
  // Will never happen / TS bug?
  return 0;
}

/**
 * Creates new points on the beam for the point loads if they do not exist
 */
//export const processPointLoads = (
//  firstPoint: BeamEnd,
//  lastPoint: BeamEnd,
//  points: BeamEnd[],
//  pointLoads: PointLoad[],
//  length: number
//): { points: BeamEnd[]; loads: PointLoad[] } => {
//  const resultFramePoints: BeamEnd[] = [firstPoint, lastPoint];
//  const resultPointLoads: PointLoad[] = [];
//  const beam = [firstPoint, lastPoint];
//
//  pointLoads.map((d) => {
//    const beamPoint = isBeamEndForce(beam, d);
//    if (beamPoint !== false) {
//      // Use beam point
//      resultPointLoads.push({ ...d, node: beamPoint.id });
//    } else {
//      // Create new point for the point load
//      const newNodeID = resultFramePoints.length + 1;
//      resultFramePoints.push({
//        id: newNodeID,
//        isFixed: FixationEnum.NONE,
//        x: realPosition(beam, d.anchor, d.offset),
//        y: 0,
//        z: 0,
//      });
//      resultPointLoads.push({
//        ...d,
//        node: newNodeID,
//      });
//    }
//  });
//  return { points: resultFramePoints, loads: resultPointLoads };
//
//  let pointsRes: BeamEnd[] = [firstPoint, ...points];
//  let loadsRes: PointLoad[] = [...pointLoads];
//  if (points[0].x === 0) {
//    pointsRes = [firstPoint, ...points.slice(1).map(shiftNode)];
//    loadsRes = pointLoads.map(shiftNode);
//  }
//  const lastPtIdx = points.length - 1;
//  if (points[lastPtIdx].x === length) {
//    if (lastPtIdx > 0) {
//      pointsRes[lastPtIdx] = {
//        ...pointsRes[lastPtIdx],
//        isFixed: lastPoint.isFixed,
//      };
//    }
//  } else {
//    pointsRes.push({
//      ...lastPoint,
//      id: points[lastPtIdx].id + 1,
//    });
//  }
//
//  return {
//    points: pointsRes,
//    loads: loadsRes,
//  };
//};
