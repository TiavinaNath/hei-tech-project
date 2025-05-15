export type Provider = {
  id: string
  profile_photo_url: string | null
  bio: string | null
  user: {
    id: string
    first_name: string
    last_name: string
  }
  provider_services: {
    service: {
      id: string
      name: string
    }
  }[]
  provider_engagements: {
    id: string
    label: string
  }[]
  provider_equipments: {
    id: string
    label: string
  }[]
}
