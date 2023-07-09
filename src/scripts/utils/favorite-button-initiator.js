import FavoriteRestaurantsIdb from "../data/favorite-restaurants-idb";
import {
	createFavoriteButtonTemplate,
	createFavoritedButtonTemplate,
} from "../views/templates/template-creator";

const FavoriteButtonInitiator = {
	async init({ favoriteButtonContainer, restaurant }) {
		this.favoriteButtonContainer = favoriteButtonContainer;
		this.restaurant = restaurant;

		await this.renderButton();
	},

	async renderButton() {
		const { id } = this.restaurant;

		if (await this.isRestaurantExist(id)) {
			this.renderFavorited();
		} else {
			this.renderFavorite();
		}
	},

	async isRestaurantExist(id) {
		const restaurant = await FavoriteRestaurantsIdb.getRestaurant(id);

		return !!restaurant;
	},

	renderFavorite() {
		this.favoriteButtonContainer.innerHTML = createFavoriteButtonTemplate();

		const favoriteButton = document.querySelector("#favorite-button");
		favoriteButton.addEventListener("click", async () => {
			await FavoriteRestaurantsIdb.putRestaurant(this.restaurant);
			this.renderButton();
		});
	},

	renderFavorited() {
		this.favoriteButtonContainer.innerHTML = createFavoritedButtonTemplate();

		const favoriteButton = document.querySelector("#favorite-button");
		favoriteButton.addEventListener("click", async () => {
			await FavoriteRestaurantsIdb.deleteRestaurant(this.restaurant.id);
			this.renderButton();
		});
	},
};

export default FavoriteButtonInitiator;
