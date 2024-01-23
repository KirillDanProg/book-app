import { DivComponent } from "../../common/divComponent";
import "./loader.css";

export class Loader extends DivComponent {
  constructor() {
    super();
  }
  render() {
    this.element.classList.add("loaderWrapper");
    this.element.innerHTML = `
        <span class="loader"></span>
    `;

    return this.element;
  }
}
