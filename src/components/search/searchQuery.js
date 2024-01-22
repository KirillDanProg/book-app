import { DivComponent } from "../../common/divComponent";
import "./searchQuery.css";

export class SearchQuery extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  searchHandler() {
    const value = this.element.querySelector(".search__input").value;
    this.state.searchQuery = value;
  }

  render() {
    this.element.classList.add("search");
    this.element.innerHTML = `
      <div class="search__input_wrapper">
         <input 
            value="${this.state.searchQuery}"
            class="search__input"
            placeholder="Найти книгу или автора..."  
          />
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

    const searchInput = this.element.querySelector(".search__input");
    const searchButton = this.element.querySelector(".search__button");

    searchButton.addEventListener("click", this.searchHandler.bind(this));
    searchInput.addEventListener("keydown", (event) => {
      if (event.code === "Enter") {
        this.searchHandler();
      }
    });

    return this.element;
  }
}
