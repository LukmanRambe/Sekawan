import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import "../styles/responsive.css";
import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const app = new App({
	button: document.querySelector(".menu-button"),
	drawer: document.querySelector(".nav-list"),
	content: document.querySelector("#main-content"),
});

window.addEventListener("hashchange", () => {
	app.renderPage();
});

window.addEventListener("load", async () => {
	app.renderPage();

	await swRegister();
});
