import { PaymentRepository } from "../repositories/paymentRepository.js";
import { OrderRepository } from "../repositories/orderRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import {sendPayment} from "../helpers/snedNotifcation.js"
import dotenv from "dotenv"
dotenv.config()
import Stripe from "stripe";
export class PaymentService {
  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.orderRepository = new OrderRepository();
    this.userRepository = new UserRepository();
  }
  async createPayment({ orderId }) {
    const stripeInstance = new Stripe(process.env.STRIPE_SCRET_KEY);
    const orderExist = await this.orderRepository.getOneOrder({ id: Number(orderId) });
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Online-Stor" },
            unit_amount: orderExist.totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    await this.paymentRepository.createPayment({
      orderId:Number(orderId),
      totalPrice: Number(orderExist.totalPrice),
    });
    const updateFileds = { status: "SUCCESS" };
    await this.orderRepository.updateOrder(
      { id: Number(orderId) },
      updateFileds
    );
    const userExist = await this.userRepository.getOneUser({
      id: Number(orderExist.userId),
    });

    await sendPayment(userExist.email, orderExist.totalPrice);
    return session;
  }
  async getPayments(page,limit){
    return await this.paymentRepository.getPayments(page,limit)
  }
  async paginationInfo(page,limit){
    return await this.paymentRepository.paginationInfo(page,limit)
  }
}
