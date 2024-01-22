import { AbstractView } from "../../common/view.js";
import { Header } from "../../components/header/header.js";
import { SearchQuery } from "../../components/search/searchQuery.js";
import onChange from "on-change";
import { CardsList } from "../../components/cardsList/cardsList.js";

export class MainView extends AbstractView {
  state = {
    searchQuery: "",
    booksList: [],
    isLoading: false,
    offset: 0,
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Поиск книг");
  }

  appStateHook(path) {
    console.log(path);
  }

  async stateHook(path) {
    if (path === "isLoading") {
      debugger;
    }
    if (path === "booksList") {
      debugger;
    }
    if (path === "searchQuery") {
      this.state.isLoading = true;
      const books = await this.fetchBooks();
      if (!books) {
        console.log("error");
      }
      this.state.booksList = books;
    }
  }

  async fetchBooks() {
    const booksResponse = await fetch(
      `https://openlibrary.org/search.json?q=${this.state.searchQuery}&offset=${this.state.offset}`
    );
    if (!booksResponse.ok) {
      this.state.isLoading = false;
      console.log("error");
      return;
    }
    const books = await booksResponse.json();
    return books.docs;
  }

  render() {
    const main = document.createElement("div");
    const header = new Header(this.appState).render();
    const searchQuery = new SearchQuery(this.state).render();
    const cardsList = new CardsList(this.state).render();
    main.append(searchQuery);
    main.append(cardsList);
    this.app.innerHTML = "";
    this.app.prepend(header);
    this.app.append(main);
  }
}
