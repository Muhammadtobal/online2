import joi from "joi";
import prisma from "../config/client.js";

const checkisexist = async (id, model, label) => {
  const result = await prisma[model].findUnique({ where: { email: id } });
  if (!result) {
    throw new Error(`${label} with id ${id} does not exist`);
  }
};
const checkisexistById = async (id, model, label) => {
  const result = await prisma[model].findUnique({ where: { id: id } });
  if (!result) {
    throw new Error(`${label} with id ${id} does not exist`);
  }
};
// ---- Auth ----

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: joi
    .string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),

  isAdmin: joi.boolean().optional(),
});

const logInSechema = joi.object({
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .external(async (value) => {
      await checkisexist(value, "user", "User");
    }),

  password: joi
    .string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),
});

// ---- User ----

const getOneUserSchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "user", "User");
    }),
});
const updateUserSchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "user", "User");
    }),
  name: joi.string().required().optional(),
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .optional(),

  password: joi
    .string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .optional(),

  isAdmin: joi.boolean().optional(),
});

// ---- Catigory ----
const createCategorySchema = joi.object({
  human: joi.string().valid("MEN", "WOMEN", "CHILDREN").optional(),
  size: joi.string().valid("XS", "S", "M", "L", "XL", "XXL").optional(),
  color: joi.string().valid("BLUE", "RED", "GREEN").optional(),
});
const getOneCategorySchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "category", "Catigory");
    }),
});
const updateCategorySchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "category", "Catigory");
    }),
  human: joi.string().valid("MEN", "WOMEN", "CHILDREN").optional(),
  size: joi.string().valid("XS", "S", "M", "L", "XL", "XXL").optional(),
  color: joi.string().valid("BLUE", "RED", "GREEN").optional(),
});

// ---- Products ----

const createProductSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  categoryId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "category", "Catigory");
    }),
  status: joi
    .string()
    .required()
    .valid("AVAILABLE", "UNAVAILABLE", "ON_REQUES"),
  quantity: joi.number().required(),
});
const getOneProdutSchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "product", "Product");
    }),
});
const updateProductSchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "product", "Product");
    }),
  name: joi.string().optional(),
  price: joi.number().optional(),
  description: joi.string().optional(),
  categoryId: joi
    .number()

    .external(async (value) => {
      if (value) await checkisexistById(value, "category", "Category");
      return value;
    })
    .optional(),
  status: joi
    .string()

    .valid("AVAILABLE", "UNAVAILABLE", "ON_REQUES")
    .optional(),
  quantity: joi.number().optional(),
});

// ---- Cart ----
const createCartSchema = joi.object({
  userId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "user", "Usre");
    }),
});
const getOnecartSchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "cart", "Cart");
    }),
});
const updateCartSchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "cart", "Cart");
    }),
  userId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "user", "Usre");
    }),
});

// ---- Order ----
const createOrderSchema = joi.object({
  userId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "user", "User");
    }),
});
const getOneOrderSchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "order", "Order");
    }),
});
const updateOrderSchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "order", "Order");
    }),
  status: joi
    .string()

    .valid("SUCCESS", "NEW")
    .optional(),
});
const createOrderItemSchema = joi.object({
  orderId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "order", "Order");
    }),
  productId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "product", "Product");
    }),
  quantity: joi.number().required(),
});
const updateOrderItemSchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "orderItem", "OrderItem");
    }),
  quantity: joi.number().required(),
});
function quantityvalidat(value, val) {
  if (value > val) {
    throw new Error(
      `your quantity ${value} more than exist in total quantity  ${val}`
    );
  }
  if (value < 0) {
    throw new Error(
      `your quantity ${value} less exist in total quantity  ${val}`
    );
  }
}
function statusvalidate(productstatus) {
  if (productstatus === "UNAVAILABLE") {
    throw new Error(`the product Unavalibale ,,Sorry you can not buy`);
  }
}
const getOneOrderItemSchema = joi.object({
  id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "orderItem", "OrderItem");
    }),
});

// ---- CartItem ----

const createCartItemSchema = joi.object({
  productId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "product", "Product");
    }),
  cartId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "cart", "Cart");
    }),
  quantity: joi.number().required(),
});
const getOneCartItemSchema=joi.object({
  id:joi.number().required().external(async(value)=>{
    await checkisexistById(value,"cartItem","CartItem")
  })
})
const updateCartItemSchema=joi.object({
  id:joi.number().required().external(async(value)=>{
    await checkisexistById(value,"cartItem","CartItem")
  }),
  quantity:joi.number().required()
})

// ---- Payments ----

const createPaymentSchema = joi.object({
  orderId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkisexistById(value, "order", "Order");
    }),
});
export {
  signUpSchema,
  logInSechema,
  getOneUserSchema,
  updateUserSchema,
  createCategorySchema,
  getOneCategorySchema,
  updateCategorySchema,
  createProductSchema,
  getOneProdutSchema,
  updateProductSchema,
  createCartSchema,
  getOnecartSchema,
  updateCartSchema,
  createOrderSchema,
  getOneOrderSchema,
  updateOrderSchema,
  createOrderItemSchema,
  getOneOrderItemSchema,
  updateOrderItemSchema,
  createCartItemSchema,
  getOneCartItemSchema,
  updateCartItemSchema,
  quantityvalidat,
  statusvalidate,
  createPaymentSchema,
};
