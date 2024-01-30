import { DivComponent } from "../../common/divComponent";
import { Card } from "../card/card";
import "./cardsList.css";

export class CardsList extends DivComponent {
  constructor(appState, booksList) {
    super();
    this.appState = appState;
    this.booksList = booksList;
  }

  checkIfFavorites(bookKey) {
    return this.appState.favorites.has(bookKey);
  }

  addBookToFavorites(event) {
    const card = event.target.closest(".card");
    const isButton =
      card &&
      (event.target.id === "card_btn" || event.target.id === "card_icon");
    if (isButton) {
      const bookKey = card.getAttribute("data-id");
      const book = this.booksList.find((book) => book.key === bookKey);
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

  saveBookInfoToState(event) {
    const card = event.target.closest(".card");
    if (card && event.target.id === "card_link") {
      const bookKey = card.getAttribute("data-id");
      const book = this.booksList.find((book) => book.key === bookKey);
      this.appState.currentBook = book;
    }
  }

  render() {
    this.element.classList.add("cardsList");
    this.booksList.forEach((book) => {
      this.element.append(new Card(this.appState, book).render());
    });
    this.element.addEventListener("click", this.addBookToFavorites.bind(this));
    this.element.addEventListener("click", this.saveBookInfoToState.bind(this));
    return this.element;
  }

  destroy() {
    this.element.removeEventListener("click", this.saveBookInfoToState);
    this.element.removeEventListener("click", this.addBookToFavorites);
  }
}
