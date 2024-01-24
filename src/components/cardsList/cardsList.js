import { DivComponent } from "../../common/divComponent";
import { Card } from "../card/card";
import "./cardsList.css";

export class CardsList extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
  }

  render() {
    this.element.classList.add("cardsList");
    this.element.innerHTML = `
      <h1 class="cardsList__title">
        Найдено книг: ${this.state.booksList.length}
      </h1>
    `;
    this.state.booksList.forEach((book) => {
      this.element.append(new Card(this.appState, book).render());
    });
    return this.element;
  }
}
