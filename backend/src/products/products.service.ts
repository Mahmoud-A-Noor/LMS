import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Product } from './entities/product.entity';
import { Course } from '../courses/entities/course.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: EntityRepository<Product>,
        @InjectRepository(Course)
        private readonly courseRepository: EntityRepository<Course>
    ) {}


    async findOne(id: string): Promise<Product> {
        try {
            const product = await this.productRepository.findOne({ id }, {
                populate: ['courses']
            });
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve the product');
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            return await this.productRepository.findAll({
                populate: ['courses']
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve products');
        }
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        try {
            const { courseIds, ...productData } = createProductDto;
            const product = this.productRepository.create(productData);

            if (courseIds?.length) {
                const courses = await this.courseRepository.find({ id: { $in: courseIds } });
                if (courses.length !== courseIds.length) {
                    throw new BadRequestException('One or more courses could not be found');
                }
                product.courses.add(courses);
            }

            await this.productRepository.getEntityManager().persistAndFlush(product);
            return product;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create the product');
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        try {
            const product = await this.findOne(id);
            const { courseIds, ...productData } = updateProductDto;

            this.productRepository.assign(product, productData);

            if (courseIds) {
                product.courses.removeAll();
                if (courseIds.length > 0) {
                    const courses = await this.courseRepository.find({ id: { $in: courseIds } });
                    if (courses.length !== courseIds.length) {
                        throw new BadRequestException('One or more courses could not be found');
                    }
                    product.courses.add(courses);
                }
            }

            await this.productRepository.getEntityManager().flush();
            return product;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update the product');
        }
    }

    async addCourses(productId: string, courseIds: string[]): Promise<Product> {
        try {
            const product = await this.findOne(productId);
            const courses = await this.courseRepository.find({ id: { $in: courseIds } });
            if (courses.length !== courseIds.length) {
                throw new BadRequestException('One or more courses could not be found');
            }
            product.courses.add(courses);
            await this.productRepository.getEntityManager().flush();
            return product;
        } catch (error) {
            throw new InternalServerErrorException('Failed to add courses to the product');
        }
    }

    async removeCourses(productId: string, courseIds: string[]): Promise<Product> {
        try {
            const product = await this.findOne(productId);
            const courses = await this.courseRepository.find({ id: { $in: courseIds } });
            if (courses.length !== courseIds.length) {
                throw new BadRequestException('One or more courses could not be found');
            }
            courses.forEach(course => product.courses.remove(course));
            await this.productRepository.getEntityManager().flush();
            return product;
        } catch (error) {
            throw new InternalServerErrorException('Failed to remove courses from the product');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            const product = await this.findOne(id);
            await this.productRepository.getEntityManager().removeAndFlush(product);
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while deleting the product');
        }
    }
}
