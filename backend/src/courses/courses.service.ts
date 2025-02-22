import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    await this.courseRepository.getEntityManager().flush();
    return course;
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }

  async findOne(id: string): Promise<Course | null> {
    return this.courseRepository.findOne({ id });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course | null> {
    const course = await this.findOne(id);
    if (!course) return null;

    this.courseRepository.assign(course, updateCourseDto);
    await this.courseRepository.getEntityManager().flush();
    
    return course;
  }

  async remove(id: string) {
    try {
      const course = await this.findOne(id);
      if (!course) throw new NotFoundException(`Course could not be found`);
      return await this.courseRepository.getEntityManager().removeAndFlush(course);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while deleting the course');
    }
  }
}
