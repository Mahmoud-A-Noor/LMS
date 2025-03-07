import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserCourseAccess } from './entities/userCourseAccess.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { CreateUserCourseAccessDto } from './dto/create-user-course-access.dto';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Course } from '../courses/entities/course.entity';
import { UserLessonComplete } from 'src/user-lesson-complete/entities/userLessonComplete.entity';


@Injectable()
export class UserCourseAccessService {
  constructor(
    @InjectRepository(UserCourseAccess)
    private readonly userCourseAccessRepository: EntityRepository<UserCourseAccess>,
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
    @InjectRepository(UserLessonComplete)
    private readonly userLessonCompleteRepository: EntityRepository<UserLessonComplete>,
  ) {}


  async create(userCourseAccess: CreateUserCourseAccessDto) {
    const user = await this.userRepository.findOne({id: userCourseAccess.userId})
    const course = await this.courseRepository.findOne({id: userCourseAccess.courseId})
    this.userCourseAccessRepository.create({user, course})
    await this.userCourseAccessRepository.getEntityManager().flush();
    return userCourseAccess;
  }

  async addProductCoursesUserAccess(userId: string, productId: string){
    const product = await this.productRepository.findOne({
      id: productId,
    }, { populate: ['courses'] });
    if(!product) throw new NotFoundException("product not found")
    const coursesIds = product.courses.getIdentifiers(); 
    console.log(coursesIds)
    try {
      await Promise.all(coursesIds.map(async (courseId) => {
        try {
          await this.create({ userId, courseId });
        } catch (error) {
          console.error(`Failed to create access for user ${userId} to course ${courseId}:`, error);
          throw new Error(`Failed to create course access: ${error.message}`);
        }
      }));
    } catch (error) {
      console.error('Error in addProductCoursesUserAccess:', error);
      throw new Error('Failed to add course access for user: ' + error.message);
    }
  }

  async removeProductCoursesUserAccess(userId: string, productId: string) {
    const product = await this.productRepository.findOne(productId, { populate: ['courses'] });
    if(!product) throw new NotFoundException("product not found")
    const coursesIds = product.courses.getIdentifiers(); 

    try {
        await this.userCourseAccessRepository.nativeDelete({
            user: userId,
            course: { $in: coursesIds },
        });
    } catch (error) {
        console.error('Error in removeProductCoursesUserAccess:', error);
        throw new InternalServerErrorException('Failed to remove course access: ' + error.message);
    }
  }

  async getUserCourses(userId: string): Promise<Course[]> {
      const userCourses = await this.userCourseAccessRepository.findAll({
          where: { user: userId },
          populate: ['course.sections.lessons'], // Populate sections and lessons
      });

      // Get all completed lessons for the user
      const completedLessons = await this.userLessonCompleteRepository.findAll({
          where: { user: userId },
          populate: ['lesson'],
      });
      
      const completedLessonIds = new Set(completedLessons.map(cl => cl.lesson.id));

      return userCourses.map((access) => {
          const course = access.course;
          
          const sectionCount = course.sections.length;
          const lessonCount = course.sections.reduce((total, section) => total + section.lessons.length, 0);
          const completedLessonsCount = course.sections.reduce((total, section) => {
              return total + section.lessons.filter(lesson => completedLessonIds.has(lesson.id)).length;
          }, 0);
          
          return {
              ...course,
              sectionCount,
              lessonCount,
              completedLessonsCount,
          };
      });
  }

}
