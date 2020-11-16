import { AggregateRoot as CqrsAggregateRoot } from '@nestjs/cqrs';

import { UniqueEntityID } from './UniqueEntityID';

export abstract class AggregateRoot<T> extends CqrsAggregateRoot {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  protected constructor(props: T, id?: UniqueEntityID) {
    super();
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals(entity?: AggregateRoot<T>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }

    if (this === entity) {
      return true;
    }

    if (!this.isEntity(entity)) {
      return false;
    }

    return this._id.equals(entity._id);
  }

  private isEntity(v: any): v is AggregateRoot<any> {
    return v instanceof AggregateRoot;
  }
}
