import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Product } from './entities/product.entity';
import { Course } from '../courses/entities/course.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { ProductStatus } from '../common/enums/product-status.enum';
import { CourseStatus } from '../common/enums/course-status.enum';
import { SectionStatus } from '../common/enums/section-status';
import { LessonStatus } from '../common/enums/lesson-status.enum';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: EntityRepository<Product>,
        @InjectRepository(Course)
        private readonly courseRepository: EntityRepository<Course>,
        private readonly em: EntityManager
    ) {}

    async findById(productId: string): Promise<Product> {
        try{
            const product = await this.productRepository.findOne({id: productId});
            if(!product) throw new NotFoundException('Product not found')
            return product
        }catch(error){
            console.log(error)
            throw new InternalServerErrorException('Failed to retrieve the product');
        }
    }
    async findOne(id: string): Promise<Product | Record<string, any>> {
        try {
            const product = await this.productRepository.findOne(id, {
                populate: ['courses.sections.lessons'], // Fetch all relationships
                orderBy: { 
                    courses: {
                        sections: {
                            order: 'asc',
                            lessons: {
                                order: 'asc'
                            }
                        }
                    }
                }
            });
        
            if (!product) {
                throw new NotFoundException('Product not found');
            }
    
            // Filter courses without modifying the database
            const filteredCourses = product.courses
                .filter(course => course.status === CourseStatus.PUBLIC)
                .map(course => {
                    return {
                        ...course,
                        sections: course.sections
                            .filter(section => section.status === SectionStatus.PUBLIC)
                            .map(section => ({
                                ...section,
                                lessons: section.lessons.filter(
                                    lesson => lesson.status === LessonStatus.PUBLIC || lesson.status === LessonStatus.PREVIEW
                                )
                            }))
                    };
                });
    
            // Return a new object instead of modifying the entity directly
            return { ...product, courses: filteredCourses };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Failed to retrieve the product');
        }
    }
    

    async findAll(): Promise<any[]> {
        try {
            // Fetch all products with related courses
            const products = await this.productRepository.findAll({
                populate: ['courses']
            });
    
            // Fetch distinct course count and distinct client count for each product
            const knex = this.em.getConnection().getKnex();

            const productStats = await knex('products as p')
                .leftJoin('product_courses as pc', 'p.id', 'pc.product_id')
                .leftJoin('courses as c', 'pc.course_id', 'c.id')
                .leftJoin('purchases as pur', 'p.id', 'pur.product_id')
                .select('p.id')
                .countDistinct({ courseCount: 'c.id' })  
                .countDistinct({ clientCount: 'pur.user_id' }) 
                .groupBy('p.id');
                console.log(productStats)
            // Map the statistics to the products
            return products.map(product => {
                const stats = productStats.find(stat => stat.id === product.id) || { courseCount: 0, clientCount: 0 };
                return {
                    ...product,
                    courseCount: Number(stats.courseCount),
                    clientCount: Number(stats.clientCount),
                };
            });
    
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve products');
        }
    }

    async findAllPublic(): Promise<any[]> {
        try {
            // Fetch all products with related courses
            const products = await this.productRepository.findAll({
                populate: ['courses'],
                where: {
                    status: ProductStatus.PUBLIC
                },
                orderBy: { name: 'asc' }
            });

            return products
    
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
            const product = await this.productRepository.findOne(id, {
                populate: ['courses.sections.lessons']
            })
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

            await this.productRepository.getEntityManager().persistAndFlush(product);
            return product;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update the product');
        }
    }

    async addCourses(productId: string, courseIds: string[]): Promise<Product> {
        try {
            const product = await this.productRepository.findOne(productId, { populate: ['courses'] });
            const courses = await this.courseRepository.find({ id: { $in: courseIds } });
            if (courses.length !== courseIds.length) {
                throw new BadRequestException('One or more courses could not be found');
            }
            product.courses.add(courses);
            await this.productRepository.getEntityManager().persistAndFlush(product);
            return product;
        } catch (error) {
            throw new InternalServerErrorException('Failed to add courses to the product');
        }
    }

    async removeCourses(productId: string, courseIds: string[]): Promise<Product> {
        try {
            const product = await this.productRepository.findOne(productId, {
                populate: ['courses']
            });
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            
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
            console.log(error)
            throw new InternalServerErrorException('An error occurred while deleting the product');
        }
    }
}
