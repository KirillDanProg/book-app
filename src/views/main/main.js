import onChange from "on-change";
import { AbstractView } from "../../common/view.js";
import { Header } from "../../components/header/header.js";
import { SearchQuery } from "../../components/search/searchQuery.js";
import { CardsList } from "../../components/cardsList/cardsList.js";
import { Loader } from "../../components/loader/loader.js";
import { Title } from "../../components/title/title.js";
import { Pagination } from "../../components/pagination/pagination.js";

export class MainView extends AbstractView {
  state = {
    searchQuery: "",
    books: {
      list: [],
      numFound: 0,
    },
    isLoading: false,
    offset: 0,
    limit: 8,
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    window.state = this.state;
    this.setTitle("Поиск книг");
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  async stateHook(path) {
    if (path === "searchQuery" || path === "offset") {
      const books = await this.fetchBooks();
      if (!books) {
        console.log("error");
        return;
      }
      this.state.isLoading = false;
      this.state.books.list = books.list;
      this.state.books.numFound = books.numFound;
    }
    if (
      path === "books.list" ||
      path === "isLoading" ||
      path === "books.numFound"
    ) {
      this.render();
    }
  }

  async fetchBooks() {
    this.state.isLoading = true;
    const { offset, limit, searchQuery } = this.state;
    const booksResponse = await fetch(
      `https://openlibrary.org/search.json?q=${searchQuery}&offset=${offset}&limit=${limit}`
    );
    if (!booksResponse.ok) {
      this.state.isLoading = false;
      console.log("error");
      return;
    }
    const books = await booksResponse.json();
    return { list: books.docs, numFound: books.numFound };
  }

  render() {
    const mainPage = document.createElement("div");
    const searchQuery = new SearchQuery(this.state).render();
    const pagination = new Pagination(this.state).render();
    const title = new Title("Найдено книг", this.state.books.numFound).render();
    const cardsList = new CardsList(this.appState, this.state.books.list);
    this.cardsList = cardsList;
    this.app.innerHTML = "";
    this.renderHeader();
    mainPage.append(searchQuery);

    if (this.state.isLoading) {
      mainPage.append(new Loader().render());
    } else {
      mainPage.append(title);
      mainPage.append(cardsList.render());
      this.state.books.numFound && mainPage.append(pagination);
    }

    this.app.append(mainPage);
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
    this.cardsList.destroy();
  }
}
