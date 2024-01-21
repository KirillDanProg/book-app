import { AbstractView } from "../../common/view.js";
import { Header } from "../../components/header/header.js";
import { SearchQuery } from "../../components/search/searchQuery.js";
import onChange from "on-change";

export class MainView extends AbstractView {
  state = {
    searchQuery: "",
    list: [],
    isLoading: false,
    offset: 0,
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle("Поиск книг");
  }

  appStateHook(path) {
    console.log(path);
  }

  render() {
    const main = document.createElement("div");
    const header = new Header(this.appState).render();
    const searchQuery = new SearchQuery().render();
    main.append(searchQuery);
    this.app.innerHTML = "";
    this.app.prepend(header);
    this.app.append(main);
    this.appState.favorites.push("12");
  }
}
