import { DivComponent } from "../../common/divComponent";
import "./card.css";
export class Card extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
  }

  render() {
    const active = this.appState.favorites.has(this.state.key);
    const bookCoverImgSrc = this.state.cover_i
      ? `https://covers.openlibrary.org/b/id/${this.state.cover_i}-M.jpg`
      : "src/static/default_book_cover.jpeg";
    let tags = this.state.subject_facet
      ? this.state.subject_facet[0]
      : "Отсутствует";
    this.element.classList.add("card");
    this.element.innerHTML = `
    <div class="card__img_wrapper">
      <img
        loading="lazy"
        src=${bookCoverImgSrc}
        class="card__img"
        alt="Обложка книги"
      />
    </div>
    <div class="card__content">
      <div class="card__content_info">
        <div class="card__tags">
           ${tags}
        </div>
        <div class="card__title" >
          <a id="card_link" href="#bookDetails${this.state.key}">
            ${this.state.title}
          </a>
        </div>
        <div class="card__author">
           ${this.state.author_name ? this.state.author_name[0] : "Отсутствует"}
        </div>
      </div>
      <button id="card_btn" class="card__button ${
        active ? "card_button_active" : ""
      }">
        <img 
          id="card_icon"
          class="card__button_icon"
          src="src/static/${active ? "favorite" : "favorite-white"}.svg"
        />
      </button>
    </div>
    `;
    this.element.setAttribute("data-id", this.state.key);
    return this.element;
  }
}
