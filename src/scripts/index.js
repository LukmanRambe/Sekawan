// Libs
import "regenerator-runtime"; /* for async await transpile */
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

// CSS
import "../styles/main.css";
import "../styles/responsive.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";

// Components
import "./components/app-navbar";
import "./components/app-loading-spinner";
import "./components/app-footer";

// JS
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
