// Get the canvas element and set its width
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

// Get the 2D drawing context of the canvas
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

let N = 1;
let cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.1);
    } //mutating the brain of the cars except the first car which will be the best car stored in the local storage
  }
} //getting the best car from the local storage

const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -1100, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -1100, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -1300, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -1300, 30, 50, "DUMMY", 2, getRandomColor()),
];

let animationFrameId;

// Function to update and redraw the car
function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []); //empty array as we are not considering the intersection of traffic cars among themselves
  } // assigning the borders of the road to the traffic cars

  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y))); //always finding the best car based on the y-coordinate

  carCanvas.height = window.innerHeight; // Set the canvas height to the window's inner height to clear the canvas
  networkCanvas.height = window.innerHeight;

  carCtx.save(); // Save the canvas context before clearing it
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7); // Translate the canvas to follow the car on the y-axis

  road.draw(carCtx); // Draw the road on the canvas
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  } // Draw the traffic cars on the canvas
  carCtx.globalAlpha = 0.2; //making them semi transparent
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, "blue");
  } // Draw the car on the canvas
  carCtx.globalAlpha = 1; //making them opaque
  bestCar.draw(carCtx, "blue", true); // always drawing the best car in blue color

  carCtx.restore(); // Restore the canvas context after drawing the car

  networkCtx.lineDashOffset = -time / 50; // time is a parameter of the animate function, it is the time elapsed since the page loaded and is passed to the animate function by the requestAnimationFrame function
  Visualizer.drawNetwork(networkCtx, bestCar.brain); //drawing the neural network of the car
  animationFrameId = requestAnimationFrame(animate); // Recursive call to animate
}

// Start the animation
animationFrameId = requestAnimationFrame(animate);

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
} //setting the best car in localstorage

function discard() {
  localStorage.removeItem("bestBrain");
}

function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
  }
  return cars;
}

function updateCarCount() {
  const carCountInput = document.getElementById("carCount");
  N = parseInt(carCountInput.value);
  cars = generateCars(N);
  bestCar = cars[0];
  if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
      cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
      if (i != 0) {
        NeuralNetwork.mutate(cars[i].brain, 0.1);
      }
    }
  }
  // Reset the traffic to the predefined traffic
  traffic.length = 0;
  traffic.push(
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -1100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -1100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -1300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -1300, 30, 50, "DUMMY", 2, getRandomColor())
  );
  cancelAnimationFrame(animationFrameId); // Cancel the previous animation frame
  animationFrameId = requestAnimationFrame(animate); // Restart the animation with the new car count and predefined traffic
}

function resetSimulation() {
  cars = generateCars(N);
  bestCar = cars[0];
  if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
      cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
      if (i != 0) {
        NeuralNetwork.mutate(cars[i].brain, 0.1);
      }
    }
  }
  // Reset the traffic to the predefined traffic
  traffic.length = 0;
  traffic.push(
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -1100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -1100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -1300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -1300, 30, 50, "DUMMY", 2, getRandomColor())
  );
  cancelAnimationFrame(animationFrameId); // Cancel the previous animation frame
  animationFrameId = requestAnimationFrame(animate); // Restart the animation with the new car count and predefined traffic
}

function addTraffic() {
  console.log("Add Traffic button clicked");
  const lanes = [0, 1, 2]; // Assuming 3 lanes
  const newTraffic = [];
  const yPositions = traffic.map((car) => car.y); // Get current y positions of traffic cars

  console.log("Current y positions:", yPositions);

  const y = Math.min(...yPositions) - 200; // Ensure new cars are at least -200 y+ from the current traffic
  console.log(`New y position for new cars: ${y}`);

  // Check if there are less than 2 cars at the same y position across all lanes
  const carsAtSameY = traffic.filter((car) => car.y === y).length;
  console.log(`Cars at y position ${y}: ${carsAtSameY}`);

  if (carsAtSameY < 2) {
    // Randomly decide to add 1 or 2 cars
    const numCarsToAdd = Math.random() < 0.5 ? 1 : 2;
    console.log(`Number of cars to add: ${numCarsToAdd}`);

    // Shuffle lanes array to randomize lane selection
    const shuffledLanes = lanes.sort(() => Math.random() - 0.5);

    for (let i = 0; i < numCarsToAdd; i++) {
      const laneIndex = shuffledLanes[i];
      const carsInLaneAtSameY = traffic.filter(
        (car) => car.x === road.getLaneCenter(laneIndex) && car.y === y
      ).length;
      console.log(
        `Cars in lane ${laneIndex} at y position ${y}: ${carsInLaneAtSameY}`
      );

      if (carsInLaneAtSameY < 1) {
        newTraffic.push(
          new Car(
            road.getLaneCenter(laneIndex),
            y,
            30,
            50,
            "DUMMY",
            2,
            getRandomColor()
          )
        );
        console.log(`New car added in lane ${laneIndex} at y: ${y}`);
      }
    }
  }

  traffic.push(...newTraffic);
  console.log("New traffic added:", newTraffic);
}
