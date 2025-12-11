// import required module
const { Products, ProductImages, Vendors } = require("../../models");
const { getSignedS3URL } = require("../../utils/getSignedS3URL");

// get all products (irrespective of vendor to showcase on FE)
exports.allProducts = async () => {
  // get all products from the data base
  const products = await Products.findAll({
    include: [
      {
        model: ProductImages,
        attributes: ["imageUrl"], 
      },
    ],
  });

  await Promise.all(
    products.map(async (product) => {
      product.ProductImages = await Promise.all(
        product.ProductImages.map(async (image) => {
          // get signedURL
          const signedURL = await getSignedS3URL(image.imageUrl);
          image.dataValues.signedURL = signedURL;
        })
      );
    })
  );

  return products;
};

//get specific product using productId
exports.getSpecificProduct = async (productId) => {
  // get productId from the controller layer
  const product = await Products.findOne({
    where: { productId },
    include: [
      {
        model: ProductImages,
        attributes: ["imageUrl"],
      },
      {
        model: Vendors,
        attributes: ["vendorName", "brandLogo"],
      },
    ],
  });
  // get product key from productImage table
  const productKey = product.ProductImages?.[0]?.imageUrl;

  // get BrandLogo key from Vendor table
  const brandLogoKey = product.Vendor.brandLogo;
  // lets handle some-how image are not available scenario

  let signedProductURL = null;
  if (productKey){
    try {
      // get pre signedURL
      signedProductURL = await getSignedS3URL(productKey);
    } catch (error) {
      // if any error occurs
      console.error(error);
      signedProductURL = null;
  };
  }

  let signedBrandLogoURL = null;

  if (brandLogoKey){
    try {
      // get pre signedURL
      signedBrandLogoURL = await getSignedS3URL(brandLogoKey);
    } catch (error) {
      // if any error occurs
      console.error(error);
      signedBrandLogoURL = null;
    }
  };

  // convert plain text
  const plainProductDetails = product.get({ plain: true });

  // return the product
  return { ...plainProductDetails, signedProductURL ,signedBrandLogoURL};
};
