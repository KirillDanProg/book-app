import { DivComponent } from "../../common/divComponent";
import "./header.css";

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
    this.element.classList.add("header");
  }

  render() {
    this.element.innerHTML = `
      <div class="header__logo_wrapper">
        <img src="src/static/logo.svg" alt="logo" class="header__logo"/>
      </div>
      <nav class="menu">
        <a class="menu__item" href="">
          <img src="src/static/search.svg" alt="logo"/>
          Поиск книг
        </a>
        <a class="menu__item" href="#favorites">
          <img src="src/static/favorite.svg" alt="logo"/>
          Избранное
          <span class="menu__item_amount">${this.appState.favorites.size}</span>
        </a>
      </nav>
    `;
    return this.element;
  }
}
