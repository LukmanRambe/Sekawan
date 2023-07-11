import DrawerInitiator from "../utils/drawer-initiator";
import UrlParser from "../routes/url-parser";
import routes from "../routes/routes";

class App {
	constructor({ button, drawer, content }) {
		this.button = button;
		this.drawer = drawer;
		this.content = content;

		this.initialAppShell();
	}

	initialAppShell() {
		DrawerInitiator.init({
			button: this.button,
			drawer: this.drawer,
			content: this.content,
		});
	}

	async renderPage() {
		const url = UrlParser.parseActiveUrlWithCombiner();
		const page = routes[url];

		scrollTo({
			top: 0,
		});
		this.content.innerHTML = await page.render();
		await page.afterRender();

		const skipToContent = document.querySelector(".skip-to-content");
		const restaurantList = document.querySelector(
			"#main-content .restaurant-list"
		);
		const restaurantDetail = document.querySelector(
			".restaurant-detail-content"
		);

		skipToContent.addEventListener("click", (event) => {
			event.preventDefault();

			if (url === "/detail/:id") {
				restaurantDetail.scrollIntoView({ behavior: "smooth" });
			} else {
				restaurantList.scrollIntoView({ behavior: "smooth" });
			}

			skipToContent.blur();
		});
	}
}

export default App;
