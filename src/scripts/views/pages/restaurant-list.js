import TheRestaurantSource from "../../data/restaurants";
import {
	createRestaurantItemTemplate,
	createItemSkeletonLoadingTemplate,
} from "../templates/template-creator";

const RestaurantList = {
	async render() {
		return `
		<!-- Start: Hero -->
		<section id="hero">
			<article class="hero-copywrite">
				<h1 class="hero-copywrite-title">
					The Authentic <br />
					Fine Dining Experience
				</h1>

				<p class="hero-copywrite-subtitle">
					We are here to satisfy your cravings for any kind of cuisine all
					around the world <br />
					Cooked into perfection by our expert chefs
				</p>

				<a class="cta-button hero-cta" href="#restaurant-list">
					Find Restaurant
				</a>
			</article>
		</section>
		<!-- End: Hero -->

		<!-- Start: About Us -->
		<section class="about-us">
			<h2 class="section-title about-us-title">About Us</h2>

			<article class="about-us-content">
				<figure class="about-us-image">
					<img
						src="/images/abous-us/about-us-1.jpg"
						alt="Plating process by a chef" />
				</figure>

				<article class="about-us-copywrite">
					<h3 class="about-us-copywrite-title">
						Your Unforgetable <br />
						Moments Starts Here
					</h3>

					<p class="about-us-copywrite-subtitle">
						Founded in 2020 by 3 young men. The idea of "Sekawan" comes to
						serve people by giving them exquisite dishes made with the
						freshest ingredients and ensuring that your visit is both
						enjoyable and memorable
					</p>

					<a class="cta-button" href="https://github.com/LukmanRambe">
						Read Our Full Story
					</a>
				</article>
			</article>
		</section>
		<!-- Start: About Us -->

		<!-- Start: Restaurant List -->
		<section id="restaurant-list" class="restaurant-list">
			<h2 class="section-title restaurant-list-title">Our Restaurants</h2>

			<article class="restaurant-list-content">
				${createItemSkeletonLoadingTemplate(3)}
			</article>
		</section>
		<!-- End: Restaurant List -->
    `;
	},

	async afterRender() {
		const restaurantsData = await TheRestaurantSource.restaurantList();
		const restaurants = restaurantsData?.restaurants;
		const restaurantsContainer = document.querySelector(
			".restaurant-list-content"
		);

		restaurantsContainer.innerHTML = "";
		restaurants?.forEach((restaurant) => {
			restaurantsContainer.innerHTML +=
				createRestaurantItemTemplate(restaurant);
		});
	},
};

export default RestaurantList;
