import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateChatInput {
  @Field(() => [Number])
  @IsArray()
  @IsNumber({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  userIds?: Number;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Field()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isPrivate: boolean;
}
