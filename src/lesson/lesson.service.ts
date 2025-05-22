import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './create-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: MongoRepository<Lesson>,
  ) {}

  async getLessons() {
    return this.lessonRepository.find();
  }

  async getLesson(id: string) {
    return this.lessonRepository.findOneBy({ id });
  }

  async createLesson(input: CreateLessonInput) {
    const id = uuid();
    const { name, startDate, endDate, students } = input;

    const lesson = this.lessonRepository.create({
      id,
      name,
      startDate,
      endDate,
      students,
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudents(lessonId: string, ids: string[]) {
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });

    lesson.students = [...lesson.students, ...ids];

    return await this.lessonRepository.save(lesson);
  }
}
