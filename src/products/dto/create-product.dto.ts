import { category } from "src/category/schemas/category.schema";

export class CreateProductDto {

    name: string;
    description: string;
    price: number;
    category:category
}