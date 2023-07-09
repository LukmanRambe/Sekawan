const DrawerInitiator = {
	init({ button, drawer, content }) {
		button.addEventListener("click", (event) => {
			this.toggleDrawer(event, drawer);
		});

		content.addEventListener("click", (event) => {
			this.closeDrawer(event, drawer);
		});

		const drawerChildren = drawer.children;
		const navLogo = document.querySelector(".nav-logo");

		for (const child of drawerChildren) {
			child.addEventListener("click", (event) =>
				this.closeDrawer(event, drawer)
			);
		}

		navLogo.addEventListener("click", (event) =>
			this.closeDrawer(event, drawer)
		);

		if (drawer.classList.contains("open")) {
			button.innerHTML = "&#10006";
		} else {
			button.innerHTML = "&#9776;";
		}
	},

	toggleDrawer(event, drawer) {
		event.stopPropagation();
		drawer.classList.toggle("open");
	},

	closeDrawer(event, drawer) {
		event.stopPropagation();
		drawer.classList.remove("open");
	},
};

export default DrawerInitiator;
