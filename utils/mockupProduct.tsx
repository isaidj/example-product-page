interface ProductMockup {
  id: number;
  name_prod: string;
  desc_short: string;
  desc_long: string;
  img: string[];
  price: number;
  colors: string;
}
export const productMockup: ProductMockup = {
  id: 1,
  name_prod: "Cityscape Style: Nike's Ultrawide Cyberpunk Boots Unleashed",
  desc_short:
    "Discover the future of fashion with Nike Ultrawide Modern Cyberpunk Boots. Cutting-edge style meets technology in these stunning booties. Join the fashion revolution!",
  desc_long: `<p>Immerse yourself in the world of future fashion with Nike Ultrawide Modern Cyberpunk Boots. These booties are more than just footwear; they are a style statement and an ode to innovation. Crafted with precision, they feature a blend of cutting-edge materials, including durable synthetic microfibers and lightweight, breathable mesh.

The upper of each pair of Nike Ultrawide Modern Cyberpunk Boots boasts a textured microfiber construction that not only enhances their aesthetic appeal but also ensures long-lasting durability. This, coupled with a reinforced sole made from high-quality rubber, provides an exceptional grip on various terrains.
</p>`,
  img: [
    "nikeBlue.webp",
    "nikeGreen.webp",
    "nikeRed.webp",
    "nikeWhite.webp",
    "nikeBlack.webp",
  ],
  price: 1000,
  colors: "#f89083,#ffffff,#87f8a3,#8ee3f8",
};
