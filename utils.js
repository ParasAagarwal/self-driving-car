function lerp(A, B, t) {
  // Linear interpolation function that returns a value between A and B based on the value of t
  return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {
  // Calculate the intersection point of two lines AB and CD
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  // Check if lines are not parallel
  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    // Check if the intersection point is within the line segments
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t), // x-coordinate of the intersection point
        y: lerp(A.y, B.y, t), // y-coordinate of the intersection point
        offset: t, // The relative position of the intersection point on line AB
      };
    }
  }

  // Return null if there is no intersection
  return null;
}
