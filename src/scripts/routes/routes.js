import RestaurantList from "../views/pages/restaurant-list";
import Detail from "../views/pages/detail";
import FavoriteRestaurants from "../views/pages/favorite-restaurants";

const routes = {
	"/": RestaurantList,
	"/detail/:id": Detail,
	"/favorite-restaurants": FavoriteRestaurants,
};

export default routes;
