import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly service: StudentService) {}

  @Query(() => [StudentType])
  async getStudents() {
    return this.service.getStudents();
  }

  @Query(() => StudentType)
  async getStudent(@Args('id') id: string) {
    return this.service.getStudent(id);
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput', new ValidationPipe()) input: CreateStudentInput,
  ) {
    return this.service.createStudent(input);
  }
}
