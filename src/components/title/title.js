import { DivComponent } from "../../common/divComponent";
import "./title.css";

export class Title extends DivComponent {
  constructor(title, booksLength) {
    super();
    this.title = title;
    this.booksLength = booksLength ?? "";
  }
  render() {
    this.element.innerHTML = `
    <h1 class="title">
      ${this.title}: ${this.booksLength}
    </h1>
  `;
    return this.element;
  }
}
