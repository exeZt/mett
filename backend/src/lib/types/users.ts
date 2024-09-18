export type UserProfile = {
  user_id: string
  user_name: string,
  user_telegram: string,
  user_age?: number,
  user_gender?: number,
  user_description?: string,
  user_profile_image?: string,
  user_profile_images?: string[],
  user_city?: string,
  user_viewable?: number | boolean
}