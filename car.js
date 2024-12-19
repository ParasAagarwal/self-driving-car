class Car {
  constructor(x, y, width, height) {
    // Initialize car properties
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0; //avoiding direct left and right movement of car , instead it will rotate and move
    this.damaged = false;

    this.sensor = new Sensor(this);

    // Create a new Controls object to handle user input
    this.controls = new Controls();
  }

  // Update the car's state
  update(roadBorders) {
    if (!this.damaged) {// we are checking if the car is damaged or not, if it is damaged then we will not move the car
      this.#move();
      this.polygon = this.#createPolygon();
      this.damaged = this.#assessDamage(roadBorders);
    }
    this.sensor.update(roadBorders);
  }

  #assessDamage(roadBorders) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    return false;
  }

  #createPolygon() {
    // this method creates a polygon around the car to detect collision with road borders
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2; //radius from center to any corner of the car
    const alpha = Math.atan2(this.width, this.height); // arc tangent method gives the angle in radians whose tangent is the quotient of two specified numbers
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    }); //top right point
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    }); //top left point
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    }); //bottom right point
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    }); // bottom left point
    return points;
  }

  #move() {
    // increase or decrease the speed by adding or subtracting acceleration based on forward and reverse controls
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    // speed limit for the car
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    // if the speed greater than 0 then apply friction and decrease the speed , if speed is less than 0 then apply friction and increase the speed
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    } // this avoids the car to move even without pressing the key , due to friction

    // Adjust the angle based on left and right controls
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1; //cause the car to rotate left or right based on left or right key press (as in real life) -- flip
      if (this.controls.left) {
        this.angle += 0.03 * flip; //if we go backwards and press left key , car will rotate right , cause flip will be -1
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    // Update the car's position based on speed and angle
    this.x -= Math.sin(this.angle) * this.speed; //basic maths, here we are using sin and cos on angle and then multiplying it with speed so that car moves in the direction of angle
    this.y -= Math.cos(this.angle) * this.speed;
  }

  // Draw the car on the canvas
  draw(ctx) {
    if (this.damaged) {
      ctx.fillStyle = "gray";
    } else {
      ctx.fillStyle = "black";
    } // there is intersection of car with road borders or cars, then color of car will be gray
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    } //drawing the polygon around the car
    ctx.fill();

    this.sensor.draw(ctx);
  }
}
