export namespace Validation {
  export interface IValidation {
    isValidName(str: string): boolean;
    isValidDesc(str: string): boolean;
    isValidAge(str: string): boolean;
    isValidCity(str: string): boolean;
    isValidMessage(str: string): boolean;
  }

  export class Valid implements IValidation {
    isValidName(str: string): boolean {
      return /\W[А-Яа-я]{2,16}|\w[A-Za-z]{2,16}/.test(str);
    }
    isValidDesc(str: string): boolean {
      return /\W[А-Яа-я]{0,200}|\w[A-Za-z]{0,200}/.test(str);
    }
    isValidAge(str: string): boolean {
      return /d[16-99]/.test(str);
    }
    isValidCity(str: string): boolean {
      return /[А-Яа-я]{2,16}|[A-Za-z]{2,16}/.test(str);
    }
    // bad
    isValidMessage(str: string): boolean {
      return /\W[А-Яа-я]{0,200}|\w[A-Za-z]{0,200}/.test(str);
    }
  }
}