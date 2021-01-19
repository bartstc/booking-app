import { useMutation as useQueryMutation } from 'react-query';
import { MutationFunction } from 'react-query/types/core/types';
import { UseMutationOptions } from 'react-query/types/react/types';

export const useMutation = <TResponse = void, TVariables = unknown, TError = Error, TContext = unknown>(
  mutationFn: MutationFunction<TResponse, TVariables>,
  options?: UseMutationOptions<TResponse, TError, TVariables, TContext>,
) => {
  return useQueryMutation<TResponse, TError, TVariables, TContext>(mutationFn, options);
};
