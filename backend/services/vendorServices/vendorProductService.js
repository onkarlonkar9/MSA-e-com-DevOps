// import required modules
const { Products, ProductImages } = require("../../models");
const { deleteObject } = require("../../utils/deleteObject");
const { getSignedS3URL } = require("../../utils/getSignedS3URL");
const { putObject } = require("../../utils/putObject");


// get all products(self-listed)
exports.AllProducts = async (vendorId) => {
  // find the all products with authorized vendorId
  const products = await Products.findAll({
    where: { vendorId },
    include: [ProductImages],
  });

  // if no image is added
  if (!products.length) return [];

  // add signed URL
  await Promise.all(
    products.map(async (product) => {
      product.ProductImages = await Promise.all(
        product.ProductImages.map(async (image) => {
          // get signedURL from utils function
          const signedUrl = await getSignedS3URL(image.imageUrl);
          image.dataValues.signedUrl = signedUrl;
        })
      );
    })
  );

  // return the object
  return products;
};

// add a new product
exports.createProduct = async (data) => {
  console.log(data);
  //get data from req
  const { vendorId, productName, specification, price, file ,brandName} = data;

  if (!file) throw new Error("Product image is required!!");

  // create product
  const product = await Products.create({
    brandName,
    vendorId,
    productName,
    specification,
    price: parseFloat(price).toFixed(2),
  });

  // generate a fileName
  const imageKey = `ProductImages/${Date.now()}_${file.originalname}`;
  const uploadedKey = await putObject(file, imageKey);

  // if productURL fails
  if (!uploadedKey) throw new Error("Image Upload failed");

  //create a new entry in db using s3 link
  await ProductImages.create({
    productId: product.productId,
    imageUrl: uploadedKey,
  });

  return Products.findByPk(product.productId, {
    include: [
      {
        model: ProductImages,
      },
    ],
  });
};

// for updating a product
exports.updateProduct = async (productId, data) => {
  // get product by productId
  const product = await Products.findByPk(productId);

  if (!product) {
    const error = new Error("Product not found!!");
    error.statusCode = 404;
    throw error;
  }

  return await product.update(data);
};

exports.deleteProduct = async (productId) => {
  // delete the product with the same productId
  const productToDelete = await Products.findByPk(productId);

  // search in productImage table with same productId
  const productImageData = await ProductImages.findOne({
    where: { productId },
  });

  // If image is not uploaded by user
  if (!productImageData) return await productToDelete.destroy();

  // get URL from productImageData
  const s3ImageKey = productImageData.imageUrl;

  if (!productToDelete) {
    const error = new Error("Product not found!!");
    error.statusCode = 404;
    throw error;
  }
  await deleteObject(s3ImageKey);

  //delete the product
  return await productToDelete.destroy();
};
