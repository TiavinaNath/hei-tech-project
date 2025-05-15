export function groupProviders(data: any[]) {
    const grouped: Record<string, any> = {};

    data.forEach((row) => {
        const providerId = row.provider_id;

        if (!providerId) return;

        if (!grouped[providerId]) {
            grouped[providerId] = {
                id: providerId,
                profile_photo_url: row.profile_photo_url,
                bio: row.bio,
                user: {
                    id: row.user_id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                },
                provider_services: [],
                provider_engagements: [],
                provider_equipments: [],
                reviews: []
            };
        }

        // Ajout des services sans doublon
        if (
            row.service_id &&
            !grouped[providerId].provider_services.find(
                (s: any) => s.service.id === row.service_id
            )
        ) {
            grouped[providerId].provider_services.push({
                id: row.provider_service_id,
                experience_years: row.experience_years,
                service: {
                    id: row.service_id,
                    name: row.service_name,
                },
            });
        }

        // Ajout des engagements
        if (
            row.engagement_id &&
            !grouped[providerId].provider_engagements.find(
                (e: any) => e.id === row.engagement_id
            )
        ) {
            grouped[providerId].provider_engagements.push({
                id: row.engagement_id,
                label: row.engagement_label,
            });
        }

        if (
            row.review_id &&
            !grouped[providerId].reviews.find((r: any) => r.id === row.review_id)
        ) {
            grouped[providerId].reviews.push({
                id: row.review_id,
                rating: row.rating,
                comment: row.comment,
                created_at: row.review_created_at,
            });
        }

        // Ajout des équipements
        if (
            row.equipment_id &&
            !grouped[providerId].provider_equipments.find(
                (e: any) => e.id === row.equipment_id
            )
        ) {
            grouped[providerId].provider_equipments.push({
                id: row.equipment_id,
                label: row.equipment_label,
            });
        }
    });

    return Object.values(grouped);
}
