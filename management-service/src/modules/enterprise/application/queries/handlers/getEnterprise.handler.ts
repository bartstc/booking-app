import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetEnterpriseQuery } from '../impl';
import { GetEnterpriseCase } from '../../useCases/getEnterprise';

@QueryHandler(GetEnterpriseQuery)
export class GetEnterpriseHandler implements IQueryHandler {
  constructor(private getEnterpriseCase: GetEnterpriseCase) {}

  async execute({ enterpriseId }: GetEnterpriseQuery) {
    return await this.getEnterpriseCase.execute(enterpriseId);
  }
}
