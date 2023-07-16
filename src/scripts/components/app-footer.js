class AppFooter extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<!-- Start: Footer -->
			<footer id="footer">
				<p class="footer-text">Copyright &copy; 2023 - Sekawan</p>
			</footer>
			<!-- End: Footer -->
		`;
	}
}

customElements.define("app-footer", AppFooter);
