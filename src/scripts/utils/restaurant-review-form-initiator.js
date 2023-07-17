const RestaurantReviewFormPresenter = {
	async init({ restaurantReviewForm, restaurantReview, restaurantId }) {
		this.restaurantReviewForm = restaurantReviewForm;
		this.restaurantReview = restaurantReview;
		this.restaurantId = restaurantId;

		await this.renderForm();
	},

	async renderForm() {
		const id = this.restaurantId;

		this.restaurantReviewForm.addEventListener("submit", async (event) => {
			event.preventDefault();

			await this.submitReview(id);
		});
	},

	async submitReview(id) {
		const nameInput = document.querySelector("#name");
		const reviewInput = document.querySelector("#review");
		const errorText = document.querySelectorAll(".review-form-error-text");
		const submitButton = document.querySelector(".submit-review-button");

		errorText[0].style.display = "none";
		nameInput.style.borderColor = "#d58d46";

		errorText[1].style.display = "none";
		reviewInput.style.borderColor = "#d58d46";

		if (nameInput.value.trim() !== "" && reviewInput.value.trim() !== "") {
			await this.restaurantReview
				.addReview(id, nameInput.value, reviewInput.value)
				.then(async (response) => {
					if (!response.error) {
						nameInput.value = "";
						reviewInput.value = "";

						submitButton.classList.add("success");
						submitButton.textContent = "Your Review Has Been Sent!";

						setTimeout(() => {
							submitButton.classList.remove("success");
							submitButton.textContent = "Submit Review";
						}, 2000);
					} else {
						submitButton.classList.add("failed");
						submitButton.textContent = "Failed To Send Review!";

						setTimeout(() => {
							submitButton.classList.remove("error");
							submitButton.textContent = "Submit Review";
						}, 2000);
					}
				})
				.catch(() => {
					submitButton.classList.add("failed");
					submitButton.textContent = "Network Error! Please Try Again";

					setTimeout(() => {
						submitButton.classList.remove("failed");
						submitButton.textContent = "Submit Review";
					}, 2000);
				});
		} else {
			if (nameInput.value === "") {
				errorText[0].style.display = "block";
				nameInput.style.borderColor = "rgba(255, 37, 44, 0.9)";
			}

			if (reviewInput.value === "") {
				errorText[1].style.display = "block";
				reviewInput.style.borderColor = "rgba(255, 37, 44, 0.9)";
			}
		}
	},
};

export default RestaurantReviewFormPresenter;
