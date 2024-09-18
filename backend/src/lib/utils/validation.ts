export namespace Validation {
  export interface Expressions {
    isAcceptable(s: string): boolean;
    isOnlyString(s: string): boolean;
    isOnlyNumber(s: string): boolean
    isValueAvailable(s: string):boolean; // from 4-16
  }

  export class ValidateValue implements Expressions {
    isAcceptable(s: string) :boolean {
      return /^[A-Za-z]+$/.test(s);
    }
    isValueAvailable(s: string):boolean{
      return /\w{4,16}\d/.test(s)
    }
    isOnlyString(s: string): boolean {
      return /\w/.test(s)
    }
    isOnlyNumber(s: string): boolean {
      return /\d/.test(s)
    }
  }
}
