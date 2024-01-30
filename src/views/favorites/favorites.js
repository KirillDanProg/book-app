import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { CardsList } from "../../components/cardsList/cardsList";
import { Header } from "../../components/header/header";
import { Title } from "../../components/title/title";

export class FavoritesView extends AbstractView {
  booksList = [];
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle("Избранное");
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  render() {
    const favoritesPage = document.createElement("div");
    this.booksList = [...this.appState.favorites.values()];
    const header = new Header(this.appState).render();
    const favoritesCardsList = new CardsList(
      this.appState,
      this.booksList
    ).render();
    const title = new Title(
      "Избранные книги",
      this.appState.favorites.size
    ).render();
    this.app.innerHTML = "";
    favoritesPage.prepend(header);
    favoritesPage.append(title);
    favoritesPage.append(favoritesCardsList);
    this.app.append(favoritesPage);
  }
  destroy() {
    onChange.unsubscribe(this.appState);
  }
}
