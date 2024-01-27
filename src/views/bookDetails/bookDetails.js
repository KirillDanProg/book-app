import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { Loader } from "../../components/loader/loader";
import { Title } from "../../components/title/title";
import { CardDetails } from "../../components/cardDetails/cardDetails";

export class BookDetailsView extends AbstractView {
  state = {
    isLoading: false,
    bookDetails: null,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    const pathHashArr = window.location.hash.split("/");
    const bookKey = `/${pathHashArr[1]}/${pathHashArr[2]}`;
    this.fetchBook(bookKey);
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  async stateHook(path) {
    if (path === "isLoading") {
      this.render();
    }
    if (path === "bookDetails") {
      this.render();
    }
  }

  async fetchBook(bookKey) {
    this.state.isLoading = true;
    const bookResponse = await fetch(
      `https://openlibrary.org${bookKey}.json?fields=key,title,author_name,editions`
    );
    if (!bookResponse.ok) {
      console.log("error");
      this.state.isLoading = false;
      return;
    }
    this.state.bookDetails = await bookResponse.json();
    this.state.isLoading = false;
  }

  render() {
    const bookDetailsPage = this.app;
    const header = new Header(this.appState).render();
    bookDetailsPage.innerHTML = "";
    bookDetailsPage.prepend(header);
    if (this.state.isLoading) {
      bookDetailsPage.append(new Loader().render());
    } else {
      console.log(this.state.bookDetails);
      const title = new Title(this.state.bookDetails.title, null).render();
      const cardDetails = new CardDetails(
        this.appState,
        this.state.bookDetails
      ).render();
      bookDetailsPage.append(title);
      bookDetailsPage.append(cardDetails);
    }
  }
}
