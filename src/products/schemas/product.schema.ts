import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/category/entities/category.entity';
@Schema()
export class Product {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;
  @Prop({ type: () => Category })
  category: Category;
}
export const productSchema = SchemaFactory.createForClass(Product);