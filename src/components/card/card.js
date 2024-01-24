import { DivComponent } from "../../common/divComponent";
import "./card.css";
export class Card extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
  }

  render() {
    let subjectItems = "";
    if (this.state.subject) {
      for (let i = 0; i < 1; i++) {
        subjectItems += ` ${this.state.subject[i]}`;
      }
    }

    let tags = subjectItems || "Отсутствует";
    this.element.classList.add("card");
    this.element.innerHTML = `
    <div class="card__img_wrapper">
      <img
        loading="lazy"
        src="https://covers.openlibrary.org/b/id/${this.state.cover_i}-M.jpg" 
        class="card__img"
        alt="Обложка книги"
      />
    </div>
    <div class="card__content">
      <div class="card__content_info">
        <div class="card__tags">
           ${tags}
        </div>
        <div class="card__title">
           ${this.state.title}
        </div>
        <div class="card__author">
           ${this.state.author_name ? this.state.author_name[0] : "Отсутствует"}
        </div>
      </div>
      <button class="card__button">
        <img 
          class="card__button_icon"
          src="src/static/favorites.svg"
        />
      </button>
    </div>
    `;
    return this.element;
  }
}
