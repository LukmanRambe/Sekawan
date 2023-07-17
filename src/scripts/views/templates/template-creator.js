import CONFIG from "../../globals/config";

const createFavoriteButtonTemplate = () => `
  <button aria-label="add to favorite restaurant" id="favorite-button" class="favorite" title="Add To Favorite">
    <i class="fa-regular fa-heart fa-2x" aria-hidden="true"></i>
  </button>`;

const createFavoritedButtonTemplate = () => `
  <button aria-label="remove from favorite restaurant" id="favorite-button" class="favorite" title="Remove From Favorite">
    <i class="fa-solid fa-heart fa-2x" aria-hidden="true"></i>
  </button>
`;

const createFailedToFetchDataTemplate = (text) => `
	<p class="fetch-failed">${text}</p>
`;

const createEmptyDataTemplate = (text) =>
	`<article class="no-data"><p>${text}</p></article>`;

const createAddReviewFormTemplate = () => `
	<h3 class="review-form-title">Add Review</h3>

	<form class="review-form">
		<section class="review-form-control">
			<label for="name" class="review-form-label">Name</label>
			<input
				type="text"
				id="name"
				name="name"
				class="review-form-input"
				placeholder="Type your name"
				autocomplete="off" />
			<span class="review-form-error-text">Name is required!</span>
		</section>

		<section class="review-form-control">
			<label for="review" class="review-form-label">Review</label>
			<textarea
				type="text"
				id="review"
				name="review"
				class="review-form-input"
				cols="20"
				rows="10"
				placeholder="Type your review"
				autocomplete="off"></textarea>
			<span class="review-form-error-text">Review is required!</span>
		</section>

		<button type="submit" class="cta-button submit-review-button">
			Send Review
		</button>
	</form>
`;

const createRestaurantItemTemplate = (restaurant, isFavoriteList) => `
	<article class="restaurant-card">
		<figure class="restaurant-card-header">
			<picture>
				${
					isFavoriteList
						? `
						<img
							width="431"
							height="260"
							fetchpriority="high"
							src="${
								restaurant.pictureId
									? `${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}`
									: "https://picsum.photos/id/666/800/450?grayscale"
							}"
							alt="${restaurant.name}" />
					  `
						: `
					<img
						width="431"
						height="260"
						class="lazyload"
						data-src="${
							restaurant.pictureId
								? `${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}`
								: "https://picsum.photos/id/666/800/450?grayscale"
						}"
						alt="${restaurant.name ?? "Default Picture"}"
					/>
				`
				}
			</picture>
		</figure>

		<article class="restaurant-card-body">
			<h3 class="restaurant-card-title">${restaurant.name ?? "-"}</h3>

			<div class="restaurant-card-subtitle">
				<h4 class="restaurant-card-city">${restaurant.city ?? "-"}</h4>
				<span> - </span>
				<div class="restaurant-card-rating">
					<figure>
						<picture>
							<source
								media="(min-width: 600px)"
								type="image/webp"
								srcset="./images/star-icon.webp" />
							<source
								media="(max-width: 600px)"
								type="image/png"
								srcset="./images/star-icon-small.png" />
							<img
								width="14"
								height="20"
								class="star-icon"
								src="./images/star-icon-large.png"
								alt="Logo Bintang atau Rating" />
						</picture>
					</figure>
					<p>${restaurant.rating ?? "-"}</p>
				</div>
			</div>

			<p class="restaurant-card-description">
				${restaurant.description?.slice(0, 150)}...
			</p>
		</article>

		<a href="/#/detail/${restaurant.id}" class="restaurant-card-overlay">
			${restaurant.name ?? "-"}
		</a>
	</article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
	<article class="restaurant-detail-hero">
		<section class="restaurant-detail-image">
			<figure>
				<picture>
					<img
						width="672"
						height="480"
						src="${
							restaurant.pictureId
								? `${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}`
								: "https://picsum.photos/id/666/800/450?grayscale"
						}"
						alt="${restaurant.name ?? "-"}" />
				</picture>
			</figure>
		</section>

		<section class="restaurant-detail-copywrite">
			<h2 class="restaurant-detail-name">${restaurant.name ?? "-"}</h2>

			<section class="restaurant-detail-overview">
				<section class="restaurant-detail-rating">
					${new Array(Math.round(restaurant.rating))
						?.fill("")
						?.map(() => {
							return `
								<figure>
									<picture>
										<source
											media="(min-width: 600px)"
											type="image/webp"
											srcset="./images/star-icon.webp" />
										<source
											media="(max-width: 600px)"
											type="image/png"
											srcset="./images/star-icon-small.png" />
										<img
											width="32"
											height="32"
											class="detail-star-icon"
											type="image/png"
											src="./images/star-icon-large.png"
											alt="Logo Bintang atau Rating" />
									</picture>
								</figure>
							`;
						})
						?.join("")}
				</section>

				<p class="restaurant-detail-address">
					${restaurant.city ?? "-"}, ${restaurant.address ?? "-"}
				</p>
				<p class="restaurant-detail-categories">
					Categories :
					${restaurant.categories?.map((category) => category.name).join(", ") ?? "-"}
				</p>

				<p class="restaurant-detail-description">
					${restaurant.description ?? "-"}
				</p>
			</section>
		</section>
	</article>

	<article class="restaurant-detail-menus">
		<h2 class="section-title restaurant-detail-menus-title">Menus</h2>

		<section class="menus-list">
			<section class="foods-list">
				<h3 class="foods-list-title">Foods</h3>

				<ul class="foods">
					${restaurant.menus?.foods
						?.map((food) => {
							return `<li>${food.name ?? "-"}</li>`;
						})
						?.join("")}
				</ul>
			</section>

			<section class="drinks-list">
				<h3 class="drinks-list-title">Drinks</h3>

				<ul class="drinks">
					${restaurant.menus?.drinks
						?.map((drink) => {
							return `<li>${drink.name ?? "-"}</li>`;
						})
						?.join("")}
				</ul>
			</section>
		</section>
	</article>

	<article class="customer-reviews">
		<h3 class="section-title">Reviews</h3>

		${
			restaurant.customerReviews?.length <= 0
				? createEmptyDataTemplate("There is No Customer Reviews")
				: `<article class="customer-review-cards">
					${restaurant.customerReviews
						?.map((customerReview) => {
							return `
				<article class="customer-review-card">
					<section class="customer-review-card-header">
						<h4 class="customer-review-name">${customerReview.name ?? "-"}</h4>
						<p class="customer-review-date">${customerReview.date ?? "-"}</p>
					</section>

					<section class="customer-review-card-body">
						<p class="customer-review-text">${customerReview.review ?? "-"}</p>
					</section>
				</article>
			`;
						})
						?.join("")}
			  </article>`
		}

		<article class="review-form-container">
			${createAddReviewFormTemplate()}
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

export {
	createRestaurantItemTemplate,
	createRestaurantDetailTemplate,
	createItemSkeletonLoadingTemplate,
	createFavoriteButtonTemplate,
	createFavoritedButtonTemplate,
	createFailedToFetchDataTemplate,
	createEmptyDataTemplate,
	createAddReviewFormTemplate,
};
