import {z} from "zod";

export const productSchema = z.object({
    product_name: z.string().min(1, "Name must be at least 1 characters long").optional(),
    product_desc: z.string().min(3, "Description must be at least 3 characters long").optional(),
    price: z.string().min(3, "Price must be at least 3 characters long").optional(),
    stok: z.string().optional(),
    categoryId: z.number().optional(),
})

export type CreateProductDTO = z.infer<typeof productSchema>;