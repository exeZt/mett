import {localUserData} from "@/app/utils/types";

export function useLocalStorage(hookType: 'get' | 'set' | 'delete', userData?: localUserData): object | void {
  if (hookType === "get"){
    return JSON.parse(localStorage.getItem('user_data'))[0];
  }else if(hookType === "set"){
    return localStorage.setItem('user_data', JSON.stringify(userData));
  }else {
    return localStorage.removeItem('user_data');
  }
}
export function getCookie(name: string): any {
  const regex: RegExp = new RegExp(`(^| )${name}=([^;]+)`)
  const match: RegExpMatchArray | null = document.cookie.match(regex)
  if (match) {
    return match[2]
  }
}