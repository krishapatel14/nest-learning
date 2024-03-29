import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectId } from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
   async create(@Body() createProductDto: CreateProductDto,@Res() res) {
    try{
      const savedProduct=await  this.productsService.create(createProductDto);
      return res.status(201).json({
        message:'Product created successfully',
        data:savedProduct
      })
    }
    catch(error){
      return  res.status(409).json({
        message: error.message
      })
  }
}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    console.log("id in controller", id);
    return this.productsService.findOne(id);  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.productsService.remove(id);
  }
}
