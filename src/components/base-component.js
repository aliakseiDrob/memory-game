export default class BaseComponent {
  constructor(params) {
    this.createElement(params);
  }

  getElement() {
    return this.element;
  }

  createElement(params) {
    this.element = document.createElement(params.tag);
    this.setCssClasses(params.cssClasses);
    this.setTextContent(params.textContent);
    this.setAttributes(params.attributes);
    this.setCallback(params.callback);
  }

  setCssClasses(cssClasses = []) {
    this.element.classList.add(...cssClasses);
  }

  setTextContent(text = "") {
    this.element.textContent = text;
  }

  setAttributes(attributes) {
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        this.element.setAttribute(key, value);
      }
    }
  }

  setCallback(callback) {
    if (typeof callback === "function") {
      this.element.addEventListener("click", (event) => callback(event));
    }
  }

  addInnerElement(element) {
    this.element.append(element);
  }
}