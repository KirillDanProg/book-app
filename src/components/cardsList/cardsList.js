import { DivComponent } from "../../common/divComponent";

export class CardsList extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  render() {
    this.element.classList.add("cardsList");
    this.element.innerHTML = `
      <h1>
        Найдено книг: ${this.state.booksList.length}
      </h1>
    `;
    return this.element;
  }
}
