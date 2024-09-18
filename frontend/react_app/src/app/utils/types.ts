import {CSSProperties, ReactNode} from "react";

export type PopupWindowOptions = {
  popupId: string
  popupBackgroundId: string
  popupTitle: string
  popupText: string
  popupCustomElements?: ReactNode | ReactNode[]
  popupButtons?: PopupButtonOject
  popupButton?: HTMLButtonElement | React.ReactNode
  popupButtonText?: string
  popupButtonVoid?: () => void
  popupCustomStyle?: CSSProperties | undefined
  popupCloseButton?: boolean
}
export type PopupButtonOject = {
  value?: string,
  void?: () => void
}

export type localUserData = {
  user_id: string,
  user_name: string,
  user_telegram: string,
  user_age?: number,
  user_city?: string,
}
export type initUserData = {
  user_id: string,
  user_name: string,
  user_telegram: string,
}
// socket io
export interface ServerToClientEvents  {
  onArg: () => void;
  basicEmit: (a: any,b: any, c: Buffer) => void;
  withAck: (a: any, callback: (e: any) => void) => void;
}
export interface ClientToServerEvents {
  user_initialize: (data: any, callback: (response: any) => void) => void,
  user_test: () => void
}
export interface InterServerEvents {
  ping: () => void;
}
export interface SocketData{
  data: any
}