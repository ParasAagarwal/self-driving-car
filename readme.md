# Self-Driving Car Simulation

## Description
This project simulates a self-driving car using a neural network. The car uses sensors to detect obstacles and makes decisions based on the neural network's outputs. Initially, the car might not perform well, but through trial and error, you can train the model to improve its performance. The project allows users to interact with the simulation by adjusting various parameters and observing the car's behavior.

## Thought Process
The goal of this project is to create a self-driving car simulation that can navigate through a road with traffic. The car uses a neural network to make decisions based on sensor inputs. The project is designed to be interactive, allowing users to adjust parameters such as the number of cars, weight variation, and lane count to see how the car adapts to different conditions.

## Motivation
The motivation behind this project was to challenge myself to create an out-of-the-box project using skills that I might not have fully mastered. I wanted to see how well I could interact with Generative AI to make this project better and complete. Additionally, I aimed to accomplish this project using only three technologies: HTML, CSS, and JavaScript. This project also served as an opportunity to learn and implement neural networks, which were initially out of my domain. I wanted to understand how mathematics plays a crucial role in making complex parts of the project successful and efficient.

## Main Components
1. **Car**: Represents the self-driving car. It has properties such as position, speed, and angle, and methods to update its state and draw itself on the canvas.
3. **Road**: Represents the road on which the car drives. It has properties such as lane count and methods to draw itself on the canvas.
4. **Sensor**: Represents the car's sensors. It has methods to cast rays, detect obstacles, and update sensor readings.
5. **Neural Network**: Represents the neural network used by the car to make decisions. It has methods for feedforward propagation and mutation.
6. **Visualizer**: Draws the neural network on the canvas, showing the connections and activations of neurons.

## Tech Stack
- **HTML**: For structuring the web page.
- **CSS**: For styling the web page.
- **Vanilla JavaScript**: For implementing the simulation logic and neural network (No Libraries).

## Features
- **Adjustable Parameters**: Users can adjust the number of cars, weight variation, and lane count.
- **Save and Load Best Car**: Users can save the best car's brain to local storage and load it later.
- **Add Traffic**: Users can add more traffic cars to test the self-driving car's ability to navigate through obstacles.
- **Reset Simulation**: Users can reset the simulation if the car crashes or gets stuck.
- **Neural Network Visualization**: The neural network's structure and activations are visualized on the canvas.

## Use of Canvas
### Aim
The aim of using the HTML5 Canvas element in this project was to create a dynamic and interactive simulation environment. Canvas allows for efficient rendering of graphics and animations, making it ideal for visualizing the self-driving car's movements and the neural network's structure.

### How It Works
The Canvas element provides a 2D drawing context that can be used to draw shapes, text, images, and other objects. In this project, we use the Canvas API to:
- Draw the road and lanes.
- Render the self-driving car and traffic cars.
- Visualize the car's sensors.
- Display the neural network's structure and activations.

### Achievements
By using Canvas, we achieve:
- **Smooth Animations**: The Canvas API allows for smooth and efficient rendering of animations, making the simulation visually appealing.
- **Real-Time Updates**: We can update the car's position, angle, and sensor readings in real-time, providing an interactive experience.
- **Visualization of Complex Data**: The neural network's structure and activations are visualized on the canvas, helping users understand how the network processes sensor inputs and makes decisions.

## Use of AI/ML
### Neural Network
The neural network is used to make decisions based on sensor inputs. It consists of multiple levels, each with a set of neurons. The network is trained using a simple mutation algorithm.

#### Structure
The neural network has an input layer, a hidden layer, and an output layer. The input layer receives sensor readings, the hidden layer processes the inputs, and the output layer produces the car's actions.

#### Feedforward Propagation
The feedforward propagation method propagates inputs through the network to produce outputs. Each neuron in a layer receives inputs from the previous layer, applies weights and biases, and passes the result through an activation function to produce an output.

1. **Inputs**: The inputs to the neural network are derived from the car's sensors. These sensors detect obstacles and provide readings that indicate the distance to the nearest obstacle. The sensor readings are normalized to a range between 0 and 1 by taking the `1 - offset` value of the sensor readings. The `offset` represents the distance to the obstacle, so `1 - offset` gives a value that is higher when the obstacle is closer.

2. **Weights and Biases**: Each input is multiplied by a weight and summed up for each neuron in the next layer. A bias is added to the sum for each neuron. The weights and biases are initially randomized, allowing the neural network to explore a wide range of behaviors.

3. **Activation Function**: An activation function (in this case, a simple threshold function) determines the output of each neuron. If the sum is greater than the bias, the output is 1; otherwise, it is 0.

#### Mutation and Learning
The neural network's performance is evaluated based on how well the car navigates the environment. After each simulation run, the neural network of the best-performing car is saved. The neural networks of other cars are mutated by slightly altering their weights and biases. This mutation introduces small changes that allow the network to explore new behaviors. The mutation is controlled by a parameter that determines the extent of the changes.

1. **Mutation**: The `mutate` method randomly adjusts the weights and biases of the network to explore different behaviors. This is done by adding a small random value to each weight and bias, allowing the network to learn and adapt over time.

2. **Selection**: The user can observe which sets of weights and biases result in better performance. By saving the best-performing neural network and mutating others, the simulation iteratively improves the car's ability to navigate the environment.

### Flow of Neural Network Processing

1. **Initialization**:
   - The neural network is initialized with a specific structure, including an input layer, hidden layer(s), and an output layer.
   - Weights and biases are randomized to allow the network to explore a wide range of behaviors.

2. **Sensor Input**:
   - The car's sensors detect obstacles and provide readings.
   - These sensor readings are normalized to a range between 0 and 1 by taking the `1 - offset` value.

3. **Feedforward Propagation**:
   - The normalized sensor readings are fed into the input layer of the neural network.
   - Each input is multiplied by a weight and summed up for each neuron in the next layer.
   - A bias is added to the sum for each neuron.
   - An activation function determines the output of each neuron.
   - This process continues through all layers of the network until the final outputs are produced.

4. **Decision Making**:
   - The outputs of the neural network determine the car's actions (e.g., move forward, turn left, turn right, reverse).
   - These actions are based on the processed sensor inputs and the current state of the network's weights and biases.

5. **Evaluation**:
   - The car's performance is evaluated based on how well it navigates the environment.
   - The best-performing car's neural network is saved for future use.

6. **Mutation**:
   - The neural networks of other cars are mutated by slightly altering their weights and biases.
   - This mutation introduces small changes that allow the network to explore new behaviors.
   - The extent of the mutation is controlled by a parameter.

7. **Iteration**:
   - The simulation runs iteratively, with each generation of cars using the mutated neural networks.
   - Over time, the neural network evolves to make better decisions based on the sensor inputs, leading to improved performance in navigating the environment.

### Summary
- **Inputs**: Sensor readings normalized to a range between 0 and 1.
- **Weights and Biases**: Initially randomized and adjusted through mutation.
- **Feedforward Propagation**: Inputs are processed through the network to produce outputs that control the car's actions.
- **Mutation and Selection**: The best-performing networks are saved and used to generate new networks through mutation, allowing the model to learn and improve over time.

This detailed flow explanation provides a clear understanding of how the neural network processes inputs, applies weights and biases, and how mutation and selection help improve the model over time. It complements the existing sections on feedforward propagation and mutation, providing a comprehensive overview of the neural network's role in the self-driving car simulation.

## Use of Mathematics
### Linear Interpolation (Lerp)
Linear interpolation is used to calculate intermediate values between two points. It is used in various parts of the project, such as calculating the position of lanes and the weights of the neural network. The formula for linear interpolation is:

```javascript
function lerp(A, B, t) {
  return A + (B - A) * t;
}
```

Where:
- \( A \) is the starting value.
- \( B \) is the ending value.
- \( t \) is the interpolation factor, typically between 0 and 1.

### Intersection Detection
Intersection detection is used to determine if the car has collided with road borders or other cars.  
-- Use of Calculus.  
The intersection point of two line segments is calculated using the following formula:

```javascript
function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      };
    }
  }
  return null;
}
```

Where:
- \( A \), \( B \), \( C \), and \( D \) are the endpoints of the two line segments.
- \( t \) and \( u \) are the parameters that determine the intersection point.

Purpose:
- The purpose of calculating tTop, uTop, and bottom is to determine the relative positions of the intersection point along the two line segments. These calculations are based on the parametric equations of the line segments.

Parametric Equations:
- The parametric equations for the line segments are:
- For line segment AB: [ P = A + t(B - A) ] Where 0 <= t <= 1.
- For line segment CD: [ Q = C + u(D - C) ] Where 0 <= u <= 1.

Intersection Condition:
- The intersection point occurs when: [ A + t(B - A) = C + u(D - C) ]
- This can be broken down into two equations (one for x-coordinates and one for y-coordinates): [ A.x + t(B.x - A.x) = C.x + u(D.x - C.x) ] [ A.y + t(B.y - A.y) = C.y + u(D.y - C.y) ]

Solving for t and u:
- To solve for t and u, we rearrange the equations: [ t(B.x - A.x) - u(D.x - C.x) = C.x - A.x ] [ t(B.y - A.y) - u(D.y - C.y) = C.y - A.y ]

We can represent these equations in matrix form and solve using determinants

Calculating t and u:
- Finally, we calculate t and u: [ t = \frac{tTop}{bottom} ] [ u = \frac{uTop}{bottom} ]

Intersection Check:
- If 0 <= t <= 1 and 0 <= u <= 1, the line segments intersect within their lengths. The intersection point is then calculated using linear interpolation (lerp).

Summary:
- tTop and uTop are used to determine the relative positions of the intersection point along the line segments.
- bottom is the determinant that helps solve the parametric equations.
- The function checks if the line segments intersect within their lengths and returns the intersection point if they do.


### Polygon Intersection
Polygon intersection is used to check if the car has collided with road borders or other cars. The algorithm checks if any of the edges of one polygon intersect with any of the edges of another polygon. This is done by iterating through all the edges of both polygons and using the intersection detection formula.

### Rotating Angles for Smooth Turning
To mimic the actual scenario of a car turning smoothly, we need to calculate the rotating angles for the car and its sensors. This involves adjusting the car's angle based on its speed and the user's input (left or right).

### Calculation of Rotating Angles
The car's angle is adjusted based on its speed and the direction of the turn. The angle is updated using trigonometric functions to ensure smooth turning.  
-- Use of Trigonometry

```javascript
function updateAngle() {
  if (this.speed != 0) {
    const flip = this.speed > 0 ? 1 : -1;
    if (this.controls.left) {
      this.angle += 0.03 * flip;
    }
    if (this.controls.right) {
      this.angle -= 0.03 * flip;
    }
  }
}
```

Explanation:
- The flip variable is used to determine the direction of the turn. If the car is moving forward, flip is 1. If the car is moving backward, flip is -1.
- The angle is adjusted by a small value (0.03) to ensure smooth turning. This value can be tweaked to achieve the desired turning behavior.
- The angle is increased for a left turn and decreased for a right turn.

Usage:
```javascript
function update() {
  this.updateAngle();
  this.x -= Math.sin(this.angle) * this.speed;
  this.y -= Math.cos(this.angle) * this.speed;
}
```
- In this, the car's position is updated based on its angle and speed. The Math.sin and Math.cos functions are used to calculate the new position, ensuring smooth turning.

## Getting Started
To get started with the project, simply open the `index.html` file in a web browser. You can interact with the simulation using the controls provided on the page.

## Conclusion
This self-driving car simulation project demonstrates the use of a neural network to control a car's behavior based on sensor inputs. By adjusting various parameters and observing the car's performance, users can gain insights into how neural networks can be used for autonomous driving. The project also highlights the importance of trial and error in training machine learning models.
