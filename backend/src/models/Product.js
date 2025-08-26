class Product {
  constructor({ id, article_no, product_service, in_price, price, unit, in_stock, description }) {
    this.id = id;
    this.article_no = article_no;
    this.product_service = product_service;
    this.in_price = in_price;
    this.price = price;
    this.unit = unit;
    this.in_stock = in_stock;
    this.description = description;
  }
}

module.exports = Product;
