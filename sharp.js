const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/");
const destination = path.resolve(__dirname, "dist/images/");

if (!fs.existsSync(destination)) {
	fs.mkdirSync(destination);
}

const sharpPngLarge = (image) => {
	sharp(`${target}/${image}`)
		.resize(800)
		.png()
		.toFile(
			path.resolve(
				__dirname,
				`${destination}/${image.split(".").slice(0, -1).join(".")}-large.png`
			)
		);
};

const sharpPngSmall = (image) => {
	sharp(`${target}/${image}`)
		.resize(480)
		.png()
		.toFile(
			path.resolve(
				__dirname,
				`${destination}/${image.split(".").slice(0, -1).join(".")}-small.png`
			)
		);
};

const sharpJpgLarge = (image) => {
	sharp(`${target}/${image}`)
		.resize(800)
		.flatten(true, { background: "#fff" })
		.toFile(
			path.resolve(
				__dirname,
				`${destination}/${image.split(".").slice(0, -1).join(".")}-large.jpg`
			)
		);
};

const sharpJpgSmall = (image) => {
	sharp(`${target}/${image}`)
		.resize(480)
		.flatten(true, { background: "#fff" })
		.toFile(
			path.resolve(
				__dirname,
				`${destination}/${image.split(".").slice(0, -1).join(".")}-small.jpg`
			)
		);
};

fs.readdirSync(target).forEach(async (image) => {
	// mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
	image === "star-icon.png" ? sharpPngLarge(image) : sharpJpgLarge(image);

	// mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
	image === "star-icon.png" ? sharpPngSmall(image) : sharpJpgSmall(image);
});
