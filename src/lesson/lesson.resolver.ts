import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './create-lesson.input';
import { ValidationPipe } from '@nestjs/common';
import { AssignStudentsInput } from './assign-student.input';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly service: LessonService,
    private readonly studentService: StudentService,
  ) {}

  @Query(() => LessonType)
  getLesson(@Args('id') id: string) {
    return this.service.getLesson(id);
  }

  @Query(() => [LessonType])
  getLessons() {
    return this.service.getLessons();
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput', new ValidationPipe()) input: CreateLessonInput,
  ) {
    return this.service.createLesson(input);
  }

  @Mutation(() => LessonType)
  assignStudents(@Args('assignStudentsInput') input: AssignStudentsInput) {
    const { lessonId, ids } = input;
    return this.service.assignStudents(lessonId, ids);
  }

  @ResolveField()
  async students(@Parent() Lesson: Lesson) {
    return this.studentService.find(Lesson.students);
  }
}
