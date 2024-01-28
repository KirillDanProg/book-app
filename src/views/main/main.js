import onChange from "on-change";
import { AbstractView } from "../../common/view.js";
import { Header } from "../../components/header/header.js";
import { SearchQuery } from "../../components/search/searchQuery.js";
import { CardsList } from "../../components/cardsList/cardsList.js";
import { Loader } from "../../components/loader/loader.js";
import { Title } from "../../components/title/title.js";

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
    if (path === "favorites") {
      this.render();
    }
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
      `https://openlibrary.org/search.json?q=${this.state.searchQuery}&offset=${this.state.offset}&limit=10`
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
    const mainPage = document.createElement("div");
    const searchQuery = new SearchQuery(this.state).render();
    const title = new Title(
      "Найдено книг",
      this.state.booksList.length
    ).render();
    const cardsList = new CardsList(
      this.appState,
      this.state.booksList
    ).render();

    this.app.innerHTML = "";
    this.renderHeader();
    mainPage.append(searchQuery);

    if (this.state.isLoading) {
      mainPage.append(new Loader().render());
    } else {
      mainPage.append(title);
      mainPage.append(cardsList);
    }

    this.app.append(mainPage);
  }
  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
