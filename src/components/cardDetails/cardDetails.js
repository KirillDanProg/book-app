import { DivComponent } from "../../common/divComponent";
import "./cardDetails.css";

export class CardDetails extends DivComponent {
  constructor(appState, bookDetails) {
    super();
    this.appState = appState;
    this.bookDetails = bookDetails;
  }

  checkIfFavorites(bookKey) {
    return this.appState.favorites.has(bookKey);
  }

  addBookToFavorites(event) {
    const button = event.target.closest(".card__button");
    if (button) {
      const bookKey = button.getAttribute("data-id");
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

  render() {
    const bookCoverImgSrc = this.bookDetails.covers
      ? `https://covers.openlibrary.org/b/id/${this.bookDetails.covers[0]}-M.jpg`
      : "src/static/default_book_cover.jpeg";
    const category = this.bookDetails.subjects[0];
    const description =
      this.bookDetails.description.value || this.bookDetails.description;
    const publication = this.bookDetails.first_publish_date || "Не указано";
    this.element.classList.add("card__details");
    this.element.innerHTML = `
      <div class="card__details_img-wrapper">
        <img class="card__details_img" src="${bookCoverImgSrc}"/>
      </div>
      <div class="card__details_info">
        <div class="card__details_info-author"></div>
        <div class="card__details_info-category">Категория: ${category}</div>
        <div class="card__details_info-publication">Первая публикация: ${publication}</div>
        <div class="card__details_info-pages"></div>
      </div>
      <div class="card__details_description">
          <strong>Описание:</strong> 
          <p>${description}</p>
        </div>
      <div class="card__details_tags"></div>
    `;
    return this.element;
  }
}
