import { QueryBus } from '@nestjs/cqrs';

import { GetEnterpriseQuery } from '../queries/impl';

export class EnterpriseService {
  constructor(private readonly queryBus: QueryBus) {}

  async getEnterprise(enterpriseId: string) {
    return this.queryBus.execute(new GetEnterpriseQuery(enterpriseId));
  }
}
