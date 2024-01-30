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

  addBookToFavorites() {
    const bookKey = this.bookDetails.key;
    const book = this.appState.currentBook;
    this.appState.favorites.set(bookKey, book);
  }

  removeBookFromFavorites(bookKey) {
    this.appState.favorites.delete(bookKey);
  }

  generateTags(tagsArr) {
    const cardTags = this.element.querySelector(".card__details_tags");
    if (!tagsArr) {
      cardTags.innerHTML += "Не указано";
      return;
    }
    for (let i = 0; i < 6; i++) {
      const tag = document.createElement("span");
      tag.classList.add("card__details_tag");
      tag.innerHTML = tagsArr[i];
      cardTags.append(tag);
    }
  }

  render() {
    const bookKey = this.bookDetails.key;
    const isBookFavorite = this.checkIfFavorites(bookKey);
    const bookCoverImgSrc = this.bookDetails.covers
      ? `https://covers.openlibrary.org/b/id/${this.bookDetails.covers[0]}-M.jpg`
      : "src/static/default_book_cover.jpeg";
    const category = this.appState.currentBook
      ? this.appState.currentBook.subject_facet[0]
      : "Не указано";
    const description = this.bookDetails.description
      ? this.bookDetails.description.value || this.bookDetails.description
      : "Не указано";
    const publication = this.bookDetails.first_publish_date || "Не указано";
    const authorName = this.appState.currentBook
      ? this.appState.currentBook.author_name[0]
      : "Не указано";
    const pagesNumber = this.appState.currentBook
      ? this.appState.currentBook.number_of_pages_median
      : "Не указано";
    this.element.classList.add("card__details");
    this.element.innerHTML = `
      <div class="card__details_img-wrapper">
        <img class="card__details_img" src="${bookCoverImgSrc}"/>
      </div>
      <div class="card__details_info">
        <div class="card__details_info-author">Автор: <strong>${authorName}</strong></div>
        <div class="card__details_info-category">Категория: <strong>${category}</strong></div>
        <div class="card__details_info-publication">Первая публикация: <strong>${publication}</strong></div>
        <div class="card__details_info-pages">Кол-во страниц: <strong>${pagesNumber}</strong></div>
        <button class="card__details_button">
          ${isBookFavorite ? "Убрать из избранного" : "В избранное"}
        </button>
      </div>
      <div class="card__details_description">
        <strong>Описание:</strong> 
        <p>${description}</p>
      </div>
      <div class="card__details_tags">
        <strong>Теги:</strong> 
      </div>
    `;
    const button = this.element.querySelector(".card__details_button");
    if (isBookFavorite) {
      button.addEventListener(
        "click",
        this.removeBookFromFavorites.bind(this, bookKey)
      );
    } else {
      button.addEventListener("click", this.addBookToFavorites.bind(this));
    }
    this.generateTags(this.bookDetails.subjects);
    return this.element;
  }
}
