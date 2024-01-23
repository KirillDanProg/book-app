import onChange from "on-change";
import { AbstractView } from "../../common/view.js";
import { Header } from "../../components/header/header.js";
import { SearchQuery } from "../../components/search/searchQuery.js";
import { CardsList } from "../../components/cardsList/cardsList.js";
import { ConditinalRenderComponent } from "../../components/conditionalRenderComponent/conditinalRenderComponent.js";

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
    if (path === "searchQuery") {
      const books = await this.fetchBooks();
      if (!books) {
        console.log("error");
        return;
      }
      this.state.isLoading = false;
      this.state.booksList = books;
    }
    if (path === "booksList" || path === "isLoading") {
      this.render();
    }
  }

  async fetchBooks() {
    this.state.isLoading = true;
    const booksResponse = await fetch(
      `https://openlibrary.org/search.json?q=${this.state.searchQuery}&offset=${this.state.offset}&page=1`
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
    console.log("render");
    const main = document.createElement("div");
    const header = new Header(this.appState).render();
    const searchQuery = new SearchQuery(this.state).render();
    const cardsList = new CardsList(this.state).render();
    const conditionalRenderComponent = new ConditinalRenderComponent(
      cardsList,
      this.state.isLoading
    ).render();
    main.append(searchQuery);
    main.append(conditionalRenderComponent);
    this.app.innerHTML = "";
    this.app.prepend(header);
    this.app.append(main);
  }
}
