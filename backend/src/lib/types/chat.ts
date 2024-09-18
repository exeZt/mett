export type Chat = {
  chat_id: string,
  chat_creator: string // userId
  chat_follower: string
}

export type Message = {
  chat_id: string,
  message_id: string,
  message_text: string,
  message_to: string, // uid
  message_from: string // uid
}