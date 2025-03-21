import prisma from "../config/client.js";
import { paginate,getPaginationInfo } from "../utils/pagenation.js";
export class PaymentRepository{
async createPayment({orderId,totalPrice}){
    return await prisma.payment.create({
        data:{orderId:Number(orderId),totalPrice:Number(totalPrice)}
    })
}
async getPayments(page,limit){
    return await paginate(prisma.payment,page,limit)
}
async paginationInfo(page,limit){
    return await getPaginationInfo(prisma.payment,page,limit)
}
}