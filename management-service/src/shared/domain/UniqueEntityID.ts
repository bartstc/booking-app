import { v4 } from "uuid";

import { Identifier } from "./Identifier";

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : v4());
  }
}
