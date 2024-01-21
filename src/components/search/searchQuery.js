import { DivComponent } from "../../common/divComponent";
import "./searchQuery.css";

export class SearchQuery extends DivComponent {
  constructor() {
    super();
  }

  render() {
    this.element.classList.add("search");
    this.element.innerHTML = `
      <div class="search__input_wrapper">
         <input class="search__input"/>
         <img
            src="src/static/search.svg"
            class="search_icon search__input_icon"
            alt="search"
         />
      </div>
      <button class="search__button">
        <img
          src="src/static/search-white.svg"
          class="search_icon search__button_icon"
          alt="search"
          />
      </button>
    `;
    return this.element;
  }
}
