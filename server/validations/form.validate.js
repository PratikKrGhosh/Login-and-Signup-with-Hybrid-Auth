import z from "zod";

export const loginFormSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(5, { message: "User Name must have minimum 5 charecters" })
    .max(15, { message: "User Name can have only 15 charecters" }),
  password: z
    .string()
    .min(6, { message: "Password must have minimum 6 charecters" })
    .max(15, { message: "Password can only be 15 charecters long" }),
});

export const signupFormSchema = loginFormSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must have minimum 3 charecters" })
    .max(15, { message: "Name can have only 15 charecters" }),
  email: z.string().trim().email({ message: "Please Enter a valid email" }),
});
