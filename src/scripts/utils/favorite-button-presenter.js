import {
	createFavoriteButtonTemplate,
	createFavoritedButtonTemplate,
} from "../views/templates/template-creator";

const FavoriteButtonPresenter = {
	async init({ favoriteButtonContainer, favoriteRestaurants, restaurant }) {
		this.favoriteButtonContainer = favoriteButtonContainer;
		this.restaurant = restaurant;
		this.favoriteRestaurants = favoriteRestaurants;

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
		const restaurant = await this.favoriteRestaurants.getRestaurant(id);

		return !!restaurant;
	},

	renderFavorite() {
		this.favoriteButtonContainer.innerHTML = createFavoriteButtonTemplate();

		const favoriteButton = document.querySelector("#favorite-button");
		favoriteButton.addEventListener("click", async () => {
			await this.favoriteRestaurants.putRestaurant(this.restaurant);
			this.renderButton();
		});
	},

	renderFavorited() {
		this.favoriteButtonContainer.innerHTML = createFavoritedButtonTemplate();

		const favoriteButton = document.querySelector("#favorite-button");
		favoriteButton.addEventListener("click", async () => {
			await this.favoriteRestaurants.deleteRestaurant(this.restaurant.id);
			this.renderButton();
		});
	},
};

export default FavoriteButtonPresenter;
