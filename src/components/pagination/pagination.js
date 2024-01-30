import { DivComponent } from "../../common/divComponent";
import "./pagination.css";

export class Pagination extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  changeOffset(event) {
    const { books, limit, offset } = this.state;
    const disableNextBtn = books.numFound <= offset + limit;
    const disabledPrevBtn = offset === 0;
    const isPrevButton = event.currentTarget.id === "pagination-prev";
    if (isPrevButton && !disabledPrevBtn) {
      this.state.offset -= limit;
      return;
    }
    if (!disableNextBtn) {
      this.state.offset += limit;
    }
  }

  render() {
    const { books, limit, offset } = this.state;
    const disableNextBtn = books.numFound <= offset + limit;
    const disabledPrevBtn = offset === 0;
    // const pagesAmount = Math.ceil(this.state.books.numFound / this.state.limit);
    this.element.classList.add("pagination");
    this.element.innerHTML = `
        <button
          id="pagination-prev" 
          class="pagination__button pagination__button_prev ${
            disabledPrevBtn ? "pagination__button_disabled" : ""
          }"
          >
           < Предыдущая страница
         </button>

        <button
          id="pagination-next" 
          class="pagination__button pagination__button_next ${
            disableNextBtn ? "pagination__button_disabled" : ""
          }"
          >
           Следующая страница>
         </button>
    `;
    const paginationButtons = this.element.querySelectorAll(
      ".pagination__button"
    );
    paginationButtons.forEach((btn) =>
      btn.addEventListener("click", this.changeOffset.bind(this))
    );
    return this.element;
  }
}
