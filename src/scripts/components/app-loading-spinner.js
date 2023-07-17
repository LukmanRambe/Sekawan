class AppLoadingSpinner extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
      <div class="loading-spinner">
        <span class="spinner"></span>
      </div>
		`;
	}
}

customElements.define("app-loading-spinner", AppLoadingSpinner);
