import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { CreateStudentInput } from './student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [StudentType])
  async students() {
    return await this.studentService.getStudents();
  }

  @Query(() => StudentType)
  async student(@Args('id') id: string) {
    return await this.studentService.getStudent(id);
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return await this.studentService.createStudent(createStudentInput);
  }
}
