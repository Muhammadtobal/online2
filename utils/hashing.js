import bcrypt from "bcryptjs";

const { hash, compare } = bcrypt;
export async function hashPassword(value, saltvalue) {
  const result = await hash(value, saltvalue);
  return result;
}

export async function comparePassword(value, val) {
  const result = await compare(value, val);
  return result;
}
