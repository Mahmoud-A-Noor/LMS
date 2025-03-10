import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { CourseSection } from '../courses/entities/courseSection.entity';
import { User } from '../users/entities/user.entity';
import { UserCourseAccess } from '../user-course-access/entities/userCourseAccess.entity';
import { UserLessonComplete } from 'src/user-lesson-complete/entities/userLessonComplete.entity';

@Injectable()
export class LessonsService {
  constructor(private readonly em: EntityManager) {}

  async create(createLessonDto: CreateLessonDto) {
    const courseSection = await this.em.findOne(CourseSection, { id: createLessonDto.sectionId });
    if (!courseSection) {
        throw new NotFoundException('Course section not found');
    }

    const lesson = this.em.create(Lesson, {
        ...createLessonDto,
        courseSection,
    });

    await this.em.persistAndFlush(lesson);
    return lesson;
}

  async findAll() {
    return await this.em.find(Lesson, {}, { populate: ['courseSection'] });
  }

  async findPrevious(id: string){
      const lesson = await this.em.findOne(Lesson, { id });
      if (!lesson) {
        throw new NotFoundException('Lesson not found');
      }
      
      const previousLesson = await this.em.findOne(Lesson, {
        courseSection: lesson.courseSection,
        order: { $lt: lesson.order },
      }, { orderBy: { order: 'desc' } });
      
      if (!previousLesson) {
        return null
      }

      return previousLesson;
  }

  async findNext(id: string){
    const lesson = await this.em.findOne(Lesson, { id });
      if (!lesson) {
        throw new NotFoundException('Lesson not found');
      }
      
      const nextLesson = await this.em.findOne(Lesson, {
        courseSection: lesson.courseSection,
        order: { $gt: lesson.order },
      }, { orderBy: { order: 'asc' } });
      
      if (!nextLesson) {
        return null;
      }

      return nextLesson;
    }
  async canUserViewLesson(body: { userId: string, lessonId: string }) {
    const user = await this.em.findOne(User, { id: body.userId });
    const lesson = await this.em.findOne(Lesson, { id: body.lessonId }, {populate: ["courseSection.course"]});
    if(user.role === "admin" || lesson.status === "preview") return true

    const userCourseAccess = await this.em.findOne(UserCourseAccess, { user, course: lesson.courseSection.course });
    if(!userCourseAccess) return false

    return true
  }

  async isLessonCompleted(body: { userId: string, lessonId: string }) {
    const user = await this.em.findOne(User, { id: body.userId });
    const lesson = await this.em.findOne(Lesson, { id: body.lessonId });

    const userLessonComplete = await this.em.findOne(UserLessonComplete, { user, lesson });
    if(!userLessonComplete) return false

    return true
  }

  async findOne(id: string) {
    const lesson = await this.em.findOne(Lesson, { id }, { populate: ['courseSection'] });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.findOne(id);

    if (updateLessonDto.sectionId) {
      const courseSection = await this.em.findOne(CourseSection, { id: updateLessonDto.sectionId });
      if (!courseSection) {
        throw new NotFoundException('Course section not found');
      }
      lesson.courseSection = courseSection;
    }

    this.em.assign(lesson, updateLessonDto);
    await this.em.flush();
    return lesson;
  }

  
  async updateOrder(newOrder: string[]) {
    let updatedLessons = []
    for (let index = 0; index < newOrder.length; index++) {
      const id = newOrder[index];
      const sectionLesson = await this.findOne(id);
      if (!sectionLesson) throw new NotFoundException(`Section Lesson with ID ${id} couldn't be found`);
      sectionLesson.order = index;
      updatedLessons.push(sectionLesson);
    }
    await this.em.flush();
    
    return updatedLessons
  }

  async remove(id: string) {
    try {
      const lesson = await this.findOne(id);
      if (!lesson) throw new NotFoundException(`Lesson could not be found`);
      return this.em.removeAndFlush(lesson);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while deleting the Lesson');
    }
  }
}
