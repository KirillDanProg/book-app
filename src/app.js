import { FavoritesView } from "./views/favorites/favorites.js";
import { MainView } from "./views/main/main.js";
class App {
  routes = [
    { route: "", view: MainView },
    { route: "#favorites", view: FavoritesView },
  ];
  appState = {
    favorites: new Map(),
  };

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }

  route() {
    const view = this.routes.find((r) => r.route === window.location.hash).view;
    if (this.currentView) {
      this.currentView.app.innerHTML = "";
    }
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
