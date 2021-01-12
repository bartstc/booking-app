import { UniqueEntityID } from './UniqueEntityID';
import { IBusinessRule } from './types';

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  protected constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals(entity?: Entity<T>): boolean {
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

  private isEntity(v: any): v is Entity<any> {
    return v instanceof Entity;
  }

  protected checkRule(rule: IBusinessRule): void {
    if (rule.isBroken()) {
      throw new Error(rule.message);
    }
  }
}
