import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';
import { In, Repository } from 'typeorm';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async getStudent(id: string): Promise<Student> {
    return await this.studentRepository.findOne({ where: { id } });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = await this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return await this.studentRepository.save(student);
  }

  async getLessonStudents(studentIds: string[]): Promise<Student[]> {
    return await this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        } as any,
      },
    });
  }
}
