import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Chat {
  @Field()
  // @Prop()
  userId: number;

  @Field()
  // @Prop()
  isPrivate: boolean;

  @Field()
  userIds: number[];

  @Field()
  // @Prop()
  name?: string;
}
