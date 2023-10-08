import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignSudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => [LessonType])
  async lessons() {
    return await this.lessonService.getLessons();
  }

  @Query(() => LessonType)
  async lesson(@Args('id') id: string) {
    return await this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return await this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  async assignStudetsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignSudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return await this.lessonService.assignStudentsToLesson(
      lessonId,
      studentIds,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return await this.studentService.getLessonStudents(lesson.students);
  }
}
