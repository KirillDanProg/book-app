import { DivComponent } from "../../common/divComponent";
import { Card } from "../card/card";
import "./cardsList.css";

export class CardsList extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
  }

  checkIfFavorites(bookKey) {
    return this.appState.favorites.has(bookKey);
  }

  addBookToFavorites(event) {
    const button = event.target.closest(".card__button");
    if (button) {
      const bookKey = button.getAttribute("data-id");
      const book = this.state.booksList.find((book) => book.key === bookKey);
      const isAlreadyFavorite = this.checkIfFavorites(bookKey);
      if (isAlreadyFavorite) {
        this.removeBookFromFavorites(bookKey);
        return;
      }
      this.appState.favorites.set(bookKey, book);
    }
  }

  removeBookFromFavorites(bookKey) {
    this.appState.favorites.delete(bookKey);
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
    this.element.addEventListener("click", this.addBookToFavorites.bind(this));
    return this.element;
  }
}
