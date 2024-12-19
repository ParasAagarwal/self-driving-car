// Get the canvas element and set its width
const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// Get the 2D drawing context of the canvas
const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9);

const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI"); //getLaneCenter is a method of road class, it returns the x position of the lane

const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)];

animate();
// Function to update and redraw the car
function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []); //empty array as we are not considering the intersection of traffic cars among themselves
  } // assigning the borders of the road to the traffic cars

  // Update the car's position and state and takes borders of the road as argument
  car.update(road.borders, traffic);

  canvas.height = window.innerHeight; // Set the canvas height to the window's inner height to clear the canvas

  ctx.save(); // Save the canvas context before clearing it
  ctx.translate(0, -car.y + window.innerHeight / 2); // Translate the canvas to follow the car on the y-axis

  road.draw(ctx); // Draw the road on the canvas
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "red");
  } // Draw the traffic cars on the canvas
  car.draw(ctx, "blue"); // Draw the car on the canvas
  // Request the next frame to keep the animation loop running

  ctx.restore(); // Restore the canvas context after drawing the car
  requestAnimationFrame(animate); //this is a recursive function, calls the animate function again and again making it look like an animation
}
