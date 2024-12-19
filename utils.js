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

function polysIntersect(poly1, poly2) {
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      const touch = getIntersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]
      );
      if (touch) {
        return true;
      }
    }
  }
  return false;
} //checking the intersection of two polygons i.e. car and road borders or car and car

function getRGBA(value) {
  // red green blue alpha for coloring the weights of the neural network
  const alpha = Math.abs(value); // between -1 and 1 as it is weight after all
  const R = value < 0 ? 0 : 255;
  const G = R; //if the value of alpha is positive then red will be 255 and green will be 255 which will give yellow color on overlaying red and green, if negative then it becomes 0, hence both red and green hides
  const B = value > 0 ? 0 : 255; // for negative value
  return "rgba(" + R + "," + G + "," + B + "," + alpha + ")";
} //function to get the color of the weights of the neural network based on the value of the weight
