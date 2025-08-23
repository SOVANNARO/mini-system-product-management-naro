const apiPath = {
  product: {
    get: "products?limit={limit}&skip={skip}&select=title,price,sku,stock,category,thumbnail,meta",
    getById: "products/{id}",
    create: "products/add",
    update: "products/{id}",
    delete: "products/{id}",
    categories: "products/category-list",
  },
};

export default apiPath;
