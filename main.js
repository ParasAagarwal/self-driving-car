// Get the canvas element and set its width
const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// Get the 2D drawing context of the canvas
const ctx = canvas.getContext("2d");

// Create a new Car object with initial position and size
const car = new Car(100, 100, 30, 50);

animate();
// Function to update and redraw the car
function animate() {
  // Update the car's position and state
  car.update();
  canvas.height = window.innerHeight; // Set the canvas height to the window's inner height to clear the canvas
  car.draw(ctx); // Draw the car on the canvas
  // Request the next frame to keep the animation loop running
  requestAnimationFrame(animate); //this is a recursive function, calls the animate function again and again making it look like an animation
}
