import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { In, Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getStudents() {
    return this.studentRepository.find();
  }

  async getStudent(id: string) {
    return this.studentRepository.findOneBy({ id });
  }

  async createStudent(input: CreateStudentInput) {
    input.id = uuid();

    return this.studentRepository.save(input);
  }

  async find(ids: string[]) {
    return this.studentRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
