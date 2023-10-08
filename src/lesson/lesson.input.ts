import { Field, InputType, ID } from '@nestjs/graphql';
import { MinLength, MaxLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @MinLength(1)
  @MaxLength(40)
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}
