class Car {
  constructor(
    x,
    y,
    width,
    height,
    controlType,
    maxSpeed = 3.35,
    color = "blue"
  ) {
    // Initialize car properties
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed;
    this.friction = 0.05;
    this.angle = 0; //avoiding direct left and right movement of car , instead it will rotate and move
    this.damaged = false;

    this.useBrain = controlType === "AI"; //if the control type is AI then only we will use the brain

    if (controlType != "DUMMY") {
      this.sensor = new Sensor(this);
      this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]); //creating a neural network with 2 levels, 6 hidden, 4 outputs (left, right, forward, reverse)
    } //if the control type is not dummy then only we will create a sensor object for the car

    // Create a new Controls object to handle user input
    this.controls = new Controls(controlType);

    this.img = new Image();
    this.img.src = "car.png";

    this.mask = document.createElement("canvas"); //creating a canvas element for the mask
    this.mask.width = width;
    this.mask.height = height;

    const maskCtx = this.mask.getContext("2d");
    this.img.onload = () => {
      maskCtx.fillStyle = color;
      maskCtx.rect(0, 0, this.width, this.height);
      maskCtx.fill();

      maskCtx.globalCompositeOperation = "destination-atop";
      maskCtx.drawImage(this.img, 0, 0, this.width, this.height);
    };
  }

  // Update the car's state
  update(roadBorders, traffic) {
    if (!this.damaged) {
      // we are checking if the car is damaged or not, if it is damaged then we will not move the car
      this.#move();
      this.polygon = this.#createPolygon();
      this.damaged = this.#assessDamage(roadBorders, traffic);
    }
    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
      const offsets = this.sensor.readings.map((e) =>
        e == null ? 0 : 1 - e.offset
      );

      const outputs = NeuralNetwork.feedForward(offsets, this.brain);

      if (this.useBrain) {
        this.controls.forward = outputs[0];
        this.controls.left = outputs[1];
        this.controls.right = outputs[2];
        this.controls.reverse = outputs[3];
      }
    } //if the sensor exists then only we will update the sensor
  }

  #assessDamage(roadBorders, traffic) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    } //checking the intersection of car with road borders

    for (let i = 0; i < traffic.length; i++) {
      if (polysIntersect(this.polygon, traffic[i].polygon)) {
        return true;
      }
    } //checking the intersection of car with traffic cars
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
  draw(ctx, color, drawSensor = false) {
    if (this.sensor && drawSensor) {
      this.sensor.draw(ctx);
    } //if the sensor exists then only we will draw the sensor

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    if (!this.damaged) {
      ctx.drawImage(
        this.mask,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
      ctx.globalCompositeOperation = "multiply";
    }
    ctx.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
