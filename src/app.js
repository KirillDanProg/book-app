import { BookDetailsView } from "./views/bookDetails/bookDetails.js";
import { FavoritesView } from "./views/favorites/favorites.js";
import { MainView } from "./views/main/main.js";
class App {
  routes = [
    { path: "", view: MainView },
    { path: "#favorites", view: FavoritesView },
    { path: "#bookDetails", view: BookDetailsView },
  ];
  appState = {
    favorites: new Map(),
  };

  constructor() {
    window.state = this.appState;
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }

  route() {
    const view = this.routes.find((route) => {
      const mainHashURI = window.location.hash.split("/")[0] ?? "";
      return route.path === mainHashURI;
    }).view;
    if (this.currentView) {
      this.currentView.app.innerHTML = "";
    }
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
