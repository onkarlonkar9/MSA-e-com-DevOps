// import required modules
const { Cart, Products, ProductImages } = require("../../models");
const { getSignedS3URL } = require("../../utils/getSignedS3URL");
// const {Products} = require("../../models");

// add  a product to the cart
exports.addToCart = async (customerId, productId) => {
  // get customerId and productId from the controller layer

  // check if product already exists in cart or not
  const existingItem = await Cart.findOne({ where: { customerId, productId } });

  // if product already in the cart
  if (existingItem) throw new Error("Product Already in the Cart");

  // if product not present in the cart then add it to cart
  const newItem = await Cart.create({ customerId, productId });

  // return to the controller layer
  return newItem;
};

// get all entries of the cart (customer specific)
exports.getCustomerCart = async (customerId) => {
  // get the customerId from the controller layer

  // find the cart table using customerId
  const cartItems = await Cart.findAll({
    where: { customerId },
    // also include product info using productId which we get from the cart
    include: [
      {
        model: Products,
        as: "product",
        attributes: ["productId", "productName", "price", "vendorId"],
        include: [
          {
            model: ProductImages,
            attributes: ["imageUrl"],
          },
        ],

      },
      ]

    });
    // now get imageUrl from productImages table
    await Promise.all(
      cartItems.map(async(item)=>{
        const product = item.product;

        product.ProductImages = await Promise.all(
          product.ProductImages.map(async (image)=>{
            // get signed URL
            const signedURL =await getSignedS3URL(image.imageUrl);
            image.dataValues.signedURL = signedURL;
          })
        )
      })
    )
   
    // console.log(cartItems[0].product.ProductImages[0]?.imageUrl);
  return cartItems;
};

exports.removeFromCart = async (customerId, productId) => {
  // get the customerId and productId from the controller layer
  const removeFromCart = await Cart.findOne({
    where: { customerId, productId },
  });

  return await removeFromCart.destroy();
};
