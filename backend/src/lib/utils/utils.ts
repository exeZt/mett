import { v4 as uuidv4 } from 'uuid';

export namespace Utils {
  export interface IUtils {
    genId: () => string
  }

  export class CUtils implements IUtils {
    genId(): string {
      return uuidv4();
    }
  }
}