export interface UseCase<IRequest, IResponse> {
  execute(request?: IRequest, ...rest): Promise<IResponse> | IResponse;
}
