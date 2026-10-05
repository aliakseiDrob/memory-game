import BaseComponent from "./base-component.js";

export default class Modal extends BaseComponent {
  constructor(title, contentElements) {
    super({ tag: "div", cssClasses: ["modal-overlay"] });
    this.modalWindow = new BaseComponent({
      tag: "div",
      cssClasses: ["modal-window"],
    });
    this.header = new BaseComponent({
      tag: "div",
      cssClasses: ["modal-header"],
    });
    this.titleElement = new BaseComponent({
      tag: "h2",
      cssClasses: ["modal-title"],
      textContent: title,
    });
    this.closeButton = new BaseComponent({
      tag: "button",
      cssClasses: ["modal-close"],
      textContent: "×",
    });
    this.header.addInnerElement(this.titleElement.getElement());
    this.header.addInnerElement(this.closeButton.getElement());
    this.body = new BaseComponent({ tag: "div", cssClasses: ["modal-body"] });
    contentElements.forEach((element) => this.body.addInnerElement(element));
    this.modalWindow.addInnerElement(this.header.getElement());
    this.modalWindow.addInnerElement(this.body.getElement());
    this.addInnerElement(this.modalWindow.getElement());

    this.closeCallback = null;
    this.handleEscape = this.handleEscape.bind(this);
    this.setCallback((event) => this.handleOverlayClick(event));
    this.closeButton.setCallback(() => this.close());
  }

  open() {
    document.body.classList.add("modal-open");
    document.body.appendChild(this.element);
    document.addEventListener("keydown", this.handleEscape);
  }

  close() {
    document.body.classList.remove("modal-open");
    this.element.remove();
    document.removeEventListener("keydown", this.handleEscape);
    if (typeof this.closeCallback === "function") {
      this.closeCallback();
    }
  }

  handleEscape(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  handleOverlayClick(event) {
    if (event.target === this.element) {
      this.close();
    }
  }

  onClose(callback) {
    this.closeCallback = callback;
  }
}
