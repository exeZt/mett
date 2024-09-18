export type HttpsSSLConfiguration = {
  key: string,
  cert: string
}

export type UserProfile = {
  user_id: string,
  user_name: string,
  user_telegram: string,
  user_options?: UserProfileOptions
}

export type UserProfileOptions = {
  user_age?: number,
  user_telegram_name?: string,
  user_gender: 0 | 1,
  user_images?: string[],
  user_profile_image?: string | symbol,
  user_profile_images?: string[] | symbol [],
  user_description?: string,
  user_emote?: string | symbol
}

export interface ServerToClientEvents {
  pong: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface ClientToServerEvents {
  user_initialize: (data: any, callback: (response: any) => void) => void;
}

export interface SocketData{
  name: string
}