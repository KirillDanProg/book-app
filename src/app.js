import { MainView } from "./views/main/main.js";
class App {
  routes = [{ route: "", view: MainView }];
  appState = {
    favorites: [],
  };

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }

  route() {
    const view = this.routes.find((r) => r.route === window.location.hash).view;
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
