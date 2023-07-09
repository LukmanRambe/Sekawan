import { precacheAndRoute } from "workbox-precaching";

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", () => {
	console.log("Service Worker: Installed");
	self.skipWaiting();
});

self.addEventListener("push", (event) => {
	console.log("Service Worker: Pushed");

	const dataJson = event.data.json();
	const notification = {
		title: dataJson.title,
		options: {
			body: dataJson.options.body,
			icon: dataJson.options.icon,
			image: dataJson.options.image,
		},
	};

	event.waitUntil(
		self.registration.showNotification(notification.title, notification.options)
	);
});

self.addEventListener("notificationclick", (event) => {
	const clicekdNotification = event.notification;
	clicekdNotification.close();

	const chainPromise = async () => {
		console.log("Notification has been clicked");
		await self.clients.openWindow("http://127.0.0.1:8080/");
	};

	event.waitUntil(chainPromise());
});
