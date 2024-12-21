// Get the canvas element and set its width
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

// Get the 2D drawing context of the canvas
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

let laneCount = 3;
let road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

let N = 1;
let weightVariation = 0.1;

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

let traffic = generateTraffic();

let animationFrameId;

// Function to update and redraw the car
function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  }
  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, "blue");
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, "blue", true);

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  animationFrameId = requestAnimationFrame(animate);
}

// Start the animation
animationFrameId = requestAnimationFrame(animate);

function generateTraffic() {
  const traffic = [];
  for (let i = 0; i < 10; i++) {
    const numCarsToAdd = Math.floor(Math.random() * (laneCount - 1)) + 1; // Randomly decide to add 1 to laneCount - 1 cars
    const y = -100 - i * 200;
    const lanes = Array.from({ length: laneCount }, (_, i) => i);
    const shuffledLanes = lanes.sort(() => Math.random() - 0.5);

    for (let j = 0; j < numCarsToAdd; j++) {
      const laneIndex = shuffledLanes[j];
      traffic.push(
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
    }
  }
  return traffic;
}

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
  const weightVariationInput = document.getElementById("weightVariation");
  N = parseInt(carCountInput.value);
  weightVariation = parseFloat(weightVariationInput.value);
  cars = generateCars(N);
  bestCar = cars[0];
  if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
      cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
      if (i != 0) {
        NeuralNetwork.mutate(cars[i].brain, weightVariation);
      }
    }
  }
  traffic = generateTraffic();
  cancelAnimationFrame(animationFrameId); // Cancel the previous animation frame
  animationFrameId = requestAnimationFrame(animate); // Restart the animation with the new car count and predefined traffic
}

function updateLaneCount() {
  const laneCountInput = document.getElementById("laneCount");
  laneCount = parseInt(laneCountInput.value);
  road = new Road(carCanvas.width / 2, carCanvas.width * 0.9, laneCount);
  traffic = generateTraffic();
  cars = generateCars(N);
  bestCar = cars[0];
  if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
      cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
      if (i != 0) {
        NeuralNetwork.mutate(cars[i].brain, weightVariation);
      }
    }
  }
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
  traffic = generateTraffic();
  cancelAnimationFrame(animationFrameId);
  animationFrameId = requestAnimationFrame(animate);
}

function addTraffic() {
  console.log("Add Traffic button clicked");
  const lanes = Array.from({ length: laneCount }, (_, i) => i);
  const newTraffic = [];
  const yPositions = traffic.map((car) => car.y);

  console.log("Current y positions:", yPositions);

  const y = Math.min(...yPositions) - 200; // Ensure new cars are at least -200 y+ from the current traffic
  console.log(`New y position for new cars: ${y}`);

  // Check if there are less than laneCount - 1 cars at the same y position across all lanes
  const carsAtSameY = traffic.filter((car) => car.y === y).length;
  console.log(`Cars at y position ${y}: ${carsAtSameY}`);

  if (carsAtSameY < laneCount - 1) {
    // Randomly decide to add 1 to laneCount - 1 cars
    const numCarsToAdd = Math.floor(Math.random() * (laneCount - 1)) + 1;
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

  console.log("New traffic added:", newTraffic);
  traffic.push(...newTraffic);
}
