export type Provider = {
  id: string;
  user_id: string;
  profile_photo_url: string | null;
  phone_number: string | null;
  birth_date: string | null;
  is_mobile: boolean;
  travel_radius_km: number | null;
  fixed_location: {
    latitude: number;
    longitude: number;
  } | null;
  bio: string;

  user: {
    id: string;
    first_name: string;
    last_name: string;
  };

  provider_services: {
    id: string;
    experience_years: number;
    service: {
      id: string;
      name: string;
    };
  }[];

  provider_engagements: {
    id: string;
    label: string;
  }[];

  provider_equipments: {
    id: string;
    label: string;
  }[];

  reviews: {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
  }[];
};
