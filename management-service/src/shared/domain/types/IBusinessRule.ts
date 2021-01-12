export interface IBusinessRule {
  isBroken(): boolean;
  message: string;
}
