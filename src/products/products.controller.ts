import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    const products = await this.productsService.getAll();
    return products;
  }

  @Get('/extended')
  async getAllExtended(): Promise<Product[]> {
    const products = await this.productsService.getAllExtended();

    return products;
  }

  @Get(':id')
  async getById(@Param('id') id: Product['id']): Promise<Product> {
    const product = await this.productsService.getById(id);
    return product;
  }

  @Get('/extended/:id')
  async getExtendedById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.getExtendedById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Delete('/:id')
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');
    await this.productsService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  public create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');
    await this.productsService.updateById(id, productData);
    return { success: true };
  }
}
