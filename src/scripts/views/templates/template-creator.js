const createRestaurantItemTemplate = (restaurant) => `
	<article class="restaurant-card">
		<figure class="restaurant-card-header">
			<img
				src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}"
				alt="Foto ${restaurant.name}" />
		</figure>

		<article class="restaurant-card-body">
			<h3 class="restaurant-card-title">${restaurant.name}</h3>

			<div class="restaurant-card-subtitle">
				<h4 class="restaurant-card-city">${restaurant.city}</h4>
				<span> - </span>
				<div class="restaurant-card-rating">
					<img
						class="star-icon"
						src="/images/restaurant-card/star-icon.png"
						alt="Logo Bintang atau Rating" />
					<p>${restaurant.rating}</p>
				</div>
			</div>

			<p class="restaurant-card-description">
				${restaurant.description?.slice(0, 150)}...
			</p>
		</article>

		<a href="/#/detail/${restaurant.id}" class="restaurant-card-overlay">
			${restaurant.name}
		</a>
	</article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
	<article class="restaurant-detail-hero">
		<section class="restaurant-detail-image">
			<figure>
				<img
					src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}"
					alt="Foto ${restaurant.name}" />
			</figure>
		</section>

		<section class="restaurant-detail-copywrite">
			<h2 class="restaurant-detail-name">${restaurant.name}</h2>

			<section class="restaurant-detail-overview">
				<section class="restaurant-detail-rating">
					${new Array(Math.round(restaurant.rating))
						?.fill("")
						?.map(() => {
							return `
								<img
									class="star-icon detail-star-icon"
									src="/images/restaurant-card/star-icon.png"
									alt="Logo Bintang atau Rating" />
							`;
						})
						?.join("")}
				</section>

				<p class="restaurant-detail-address">
					${restaurant.city}, ${restaurant.address}
				</p>
				<p class="restaurant-detail-categories">
					Categories :
					${restaurant.categories?.map((category) => category.name).join(", ")}
				</p>

				<p class="restaurant-detail-description">${restaurant.description}</p>
			</section>
		</section>
	</article>

	<article class="restaurant-detail-menus">
		<h2 class="section-title restaurant-detail-menus-title">Menus</h2>

		<section class="menus-list">
			<section class="foods-list">
				<h3 class="foods-list-title">Foods</h3>

				<ul class="foods">
					${restaurant.menus.foods
						.map((food) => {
							return `<li>${food.name}</li>`;
						})
						.join("")}
				</ul>
			</section>

			<section class="drinks-list">
				<h3 class="drinks-list-title">Drinks</h3>

				<ul class="drinks">
					${restaurant.menus.drinks
						.map((drink) => {
							return `<li>${drink.name}</li>`;
						})
						.join("")}
				</ul>
			</section>
		</section>
	</article>

	<article class="customer-reviews">
		<h3 class="section-title">Reviews</h3>

		<article class="customer-review-cards">
			${restaurant.customerReviews
				.map((customerReview) => {
					return `
					<article class="customer-review-card">
						<section class="customer-review-card-header">
							<h4 class="customer-review-name">${customerReview.name}</h4>
							<p class="customer-review-date">${customerReview.date}</p>
						</section>

						<section class="customer-review-card-body">
							<p class="customer-review-text">${customerReview.review}</p>
						</section>
					</article>
				`;
				})
				.join("")}
		</article>
	</article>
`;

const createItemSkeletonLoadingTemplate = (count) => {
	let template = "";

	for (let i = 0; i < count; i++) {
		template += `
			<article class="restaurant-card-skeleton">
				<article class="restaurant-card-skeleton-header"></article>

				<article class="restaurant-card-skeleton-body">
					<article class="restaurant-card-skeleton-title"></article>

					<article class="restaurant-card-skeleton-subtitle">
						<article class="restaurant-card-skeleton-city"></article>

						<article class="restaurant-card-skeleton-rating"></article>
					</article>

					<article class="restaurant-card-skeleton-description"></article>
				</article>
			</article>
		`;
	}

	return template;
};

const createFavoriteButtonTemplate = () => `
  <button aria-label="favorite this movie" id="favorite-button" class="favorite" title="Add To Favorite">
    <i class="fa-regular fa-heart fa-2x" aria-hidden="true"></i>
  </button>`;

const createFavoritedButtonTemplate = () => `
  <button aria-label="unfavorite this movie" id="favorite-button" class="favorite" title="Remove From Favorite">
    <i class="fa-solid fa-heart fa-2x" aria-hidden="true"></i>
  </button>
`;

export {
	createRestaurantItemTemplate,
	createRestaurantDetailTemplate,
	createItemSkeletonLoadingTemplate,
	createFavoriteButtonTemplate,
	createFavoritedButtonTemplate,
};
