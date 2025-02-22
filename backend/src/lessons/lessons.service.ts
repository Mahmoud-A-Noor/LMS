import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { CourseSection } from '../courses/entities/courseSection.entity';

@Injectable()
export class LessonsService {
  constructor(private readonly em: EntityManager) {}

  async create(createLessonDto: CreateLessonDto) {
    const courseSection = await this.em.findOne(CourseSection, { id: createLessonDto.courseSectionId });
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

  async findOne(id: string) {
    const lesson = await this.em.findOne(Lesson, { id }, { populate: ['courseSection'] });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.findOne(id);

    if (updateLessonDto.courseSectionId) {
      const courseSection = await this.em.findOne(CourseSection, { id: updateLessonDto.courseSectionId });
      if (!courseSection) {
        throw new NotFoundException('Course section not found');
      }
      lesson.courseSection = courseSection;
    }

    this.em.assign(lesson, updateLessonDto);
    await this.em.flush();
    return lesson;
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
