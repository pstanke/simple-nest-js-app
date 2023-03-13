import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  public getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Delete('/:id')
  public deleteById(@Param('id') id: string) {
    this.productsService.deleteById(id);
    return { success: true };
  }
  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
}
