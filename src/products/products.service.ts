import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ProductsService {
  // constructor(@InjectModel(Product.name) private readonly productModel:Model<Product>){}
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}


  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      console.log("createProductDto in service", createProductDto);
      const savedProduct = await this.productModel.create(createProductDto);
      console.log("savedProduct in service", savedProduct);
      return savedProduct;
    } catch (err) {
      console.log("error in service", err);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: ObjectId): Promise<Product> {
    return this.productModel.findById(id).exec();
    // return `This action returns a #${id} product`;
  }

  update(id: ObjectId, updateProductDto: UpdateProductDto) {
    // return `This action updates a #${id} product`;
    return  this.productModel.findByIdAndUpdate(id, updateProductDto ,{new: true})
  }

  remove(id: ObjectId):Promise<any> {
    return this.productModel.deleteOne({_id : id}).exec();
    // return `This action removes a #${id} product`;
  }
}
