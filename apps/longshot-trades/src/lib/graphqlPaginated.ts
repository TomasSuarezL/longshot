import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  first: number;

  @Field(() => Int, { nullable: true })
  after: number;
}

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  startCursor: number;

  @Field({ nullable: true })
  endCursor: number;

  @Field()
  hasNextPage: boolean;
}

/**
 * Based on https://docs.nestjs.com/graphql/resolvers#generics
 *
 * @param classRef
 */
export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(() => PageInfo, { nullable: true })
    pageInfo: PageInfo;
  }
  return PaginatedType;
}
