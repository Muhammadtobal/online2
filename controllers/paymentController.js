import { createPaymentSchema } from "../middlewares/validat.js";
import { PaymentService } from "../services/paymentService.js";

export class PaymentController {
  constructor() {
    this.paymentService = new PaymentService();
  }
  async createPayment(req, res, next) {
    try {
      const { orderId } = req.body;
      await createPaymentSchema.validateAsync({ orderId });
      const session = await this.paymentService.createPayment({
        orderId: Number(orderId),
      });

      res.status(201).json({
        message: "Payment created successfully.",
        stripeSessionId: session.id,

        paymentUrl: session.url,
      });
    } catch (error) {
      next(error);
    }
  }
  async getPayments(req,res,next){
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const allPayment = await this.paymentService.getPayments(
        page,
        limit
      );
      const paginationInfo = await this.paymentService.paginationInfo(
        page,
        limit
      );
      res.status(200).json({
        message: "success",
        data: allPayment,
        pagination: paginationInfo,
      });
    } catch (error) {
      next(error)
    }
  }
}
