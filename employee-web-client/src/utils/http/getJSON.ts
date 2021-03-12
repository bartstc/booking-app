import { from, Observable, ObservableInput } from 'rxjs';

import { ServiceType } from './ServiceType';
import { accessibilityHttpService, managementHttpService } from './service';

const getService = (serviceType: ServiceType) => {
  switch (serviceType) {
    case ServiceType.Management:
      return managementHttpService;
    case ServiceType.Accessibility:
      return accessibilityHttpService;

    default:
      throw new Error(`${serviceType} is unknown service`);
  }
};

export const getJSON = <R = unknown>(url: string, service: ServiceType, headers?: object): Observable<R> =>
  from<ObservableInput<R>>(getService(service).get(url, headers));
