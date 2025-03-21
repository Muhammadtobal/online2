import { OrderItemRepository } from "../repositories/orderItrmRepository.js";
import { quantityvalidat, statusvalidate } from "../middlewares/validat.js";
import { ProductRepository } from "../repositories/productRepository.js";
import { OrderRepository } from "../repositories/orderRepository.js";
export class OrderItemService {
  constructor() {
    this.orderItemRepository = new OrderItemRepository();
    this.productRepository = new ProductRepository();
    this.orderRepository = new OrderRepository();
  }
  async createOrderItem({ orderId, productId, quantity }) {
    let productExist = await this.productRepository.getOneProduct({
      id: Number(productId),
    });
    let ordertExist = await this.orderRepository.getOneOrder({
      id: Number(orderId),
    });
    let newOrderItem;
    let newQuantity;
    statusvalidate(productExist.status);
    quantityvalidat(quantity, productExist.quantity);
    const ValidatRecord = await this.orderItemRepository.findProductAndOrder({
      productId,
      orderId,
    });
    if (!ValidatRecord) {
      newOrderItem = await this.orderItemRepository.createOrderItem({
        orderId,
        productId,
        quantity,
        price: productExist.price,
      });
      newQuantity = quantity;
    } else {
      const updateOrderQuantity = Number(
        ordertExist.quantity - ValidatRecord.quantity
      );
      const newPrice = updateOrderQuantity * Number(productExist.price);

      const updateProductQuantity = Number(
        productExist.quantity + ValidatRecord.quantity
      );
      const orderFileds = {
        quantity: Number(updateOrderQuantity),
        totalPrice: newPrice,
      };
      const productFileds = { quantity: Number(updateProductQuantity) };
      await this.orderRepository.updateOrder({ id: orderId }, orderFileds);
      await this.productRepository.updateProduct(productFileds, {
        id: productId,
      });
      newQuantity = Number(ValidatRecord.quantity + quantity);
      const updateFildes = { quantity: Number(newQuantity) };
      await this.orderItemRepository.updateQunatity(
        { id: ValidatRecord.id },
        updateFildes
      );
    }
    await this.productRepository.decrementQuantity({
      productId,
      quantity: Number(newQuantity),
    });
    const newProduct = await this.productRepository.getOneProduct({
      id: Number(productId),
    });

    if (newProduct.quantity === 0) {
      const updateFileds = {};
      updateFileds.status = "UNAVAILABLE";

      await this.productRepository.updateProduct(updateFileds, {
        id: newProduct.id,
      });
    }
    await this.orderRepository.OrderProperty({
      orderId,
      quantity: Number(newQuantity),
      price: productExist.price,
    });
    return newOrderItem;
  }
  async getOrderItems(page, limit) {
    return await this.orderItemRepository.getOrderItems(page, limit);
  }
  async getPaginationInfo(page, limit) {
    return await this.orderItemRepository.getPaginationInfo(page, limit);
  }
  async getOneOrderItem({ id }) {
    return await this.orderItemRepository.getOneOrderItem({ id });
  }
  async updateOrderItem({ id, quantity }) {
    const orderItemExist = await this.orderItemRepository.getOneOrderItem({
      id,
    });

    let sumProduct;
    let sumOrder;
    sumOrder =
      Number(orderItemExist.order.quantity) -
      Number(orderItemExist.quantity) +
      Number(quantity);
    sumProduct =
      Number(orderItemExist.quantity) +
      Number(orderItemExist.product.quantity) -
      Number(quantity);
    let defTotal = Number(sumOrder * orderItemExist.product.price);
  let priceBeforUpdate=Number(orderItemExist.order.totalPrice-(orderItemExist.quantity *orderItemExist.product.price))
    statusvalidate(orderItemExist.product.status);
    quantityvalidat(quantity, orderItemExist.product.quantity);
    const updateFileds = {};
    if (quantity) updateFileds.quantity = quantity;
    const newUpdate = await this.orderItemRepository.updateOrderItem(
      updateFileds,
      { id }
    );
    await this.orderRepository.updateOrderProperty({
      orderId: Number(orderItemExist.orderId),
      quantity: Number(sumOrder),
      price: priceBeforUpdate + (orderItemExist.product.price*quantity),
    });
    await this.productRepository.UpdateQuantity({
      productId: orderItemExist.productId,
      quantity: sumProduct,
    });
    if (orderItemExist.product.quantity === 0) {
      const updateFileds = {};
      updateFileds.status = "UNAVAILABLE";

      await this.productRepository.updateProduct(updateFileds, {
        id: newProduct.id,
      });
    }
    return newUpdate;
  }
  async deleteOrderItem({ id }) {
    return await this.orderItemRepository.deleteOrderItem({ id });
  }
  async getMany({id})
  {
    const orderExist= await this.orderRepository.getOneOrder({id:Number(id)})
    if(!orderExist){
      throw new Error("order not found")
    }
    return await this.orderItemRepository.getMany({id:Number(id)})
  }
}
