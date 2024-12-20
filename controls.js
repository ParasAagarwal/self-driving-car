class Controls {
  constructor(type) {
    // Initialize control states
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    switch (
      type //switch case to check the type of control dummy or keys car(main)
    ) {
      case "KEYS":
        this.#addKeyboardListeners();
        break;
      case "DUMMY":
        this.forward = true;
        break;
    }
  }

  // Private method to add keyboard event listeners
  #addKeyboardListeners() {
    // Handle keydown events
    document.onkeydown = (event) => {
      //having arrow function allows to point this keyword to main class
      switch (event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
      }
    };

    // Handle keyup events
    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
      }
    };
  }
}
