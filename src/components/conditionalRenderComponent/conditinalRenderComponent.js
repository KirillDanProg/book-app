import { Loader } from "../loader/loader";

export class ConditinalRenderComponent {
  constructor(element, isLoading) {
    this.element = element;
    this.isLoading = isLoading;
  }

  render() {
    if (this.isLoading) {
      return new Loader().render();
    }
    return this.element;
  }
}
