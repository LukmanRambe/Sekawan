class AppNavbar extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<!-- Start: Header -->
			<header>
				<!-- Start: Navbar -->
				<nav id="nav">
					<div class="nav-header">
						<a class="nav-logo" href="#/">Sekawan</a>

						<button aria-label="navbar menu button" class="menu-button">
							&#9776;
						</button>
					</div>

					<ul class="nav-list">
						<li class="nav-item"><a href="#/" class="nav-link">Home</a></li>
						<li class="nav-item">
							<a href="#/favorite-restaurants" class="nav-link">Favorites</a>
						</li>
						<li class="nav-item">
							<a href="https://github.com/LukmanRambe" class="nav-link"
								>About Us</a
							>
						</li>
					</ul>
				</nav>
				<!-- End: Navbar -->
			</header>
			<!-- End: Header -->
		`;
	}
}

customElements.define("app-navbar", AppNavbar);
