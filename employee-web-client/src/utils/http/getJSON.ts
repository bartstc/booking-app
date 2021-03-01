import { from, Observable, ObservableInput } from 'rxjs';
import { httpService } from './service';

export const getJSON = <R = unknown>(url: string, headers?: object): Observable<R> =>
  from<ObservableInput<R>>(httpService.get<R>(url, headers));
