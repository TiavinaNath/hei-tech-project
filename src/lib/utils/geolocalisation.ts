export function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Géolocalisation non supportée par votre navigateur"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error),
            { enableHighAccuracy: true, timeout: 5000 }
        );
    });
}

export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data = await response.json();
        return data.display_name || null;
    } catch (error) {
        console.error("Erreur de reverse geocoding:", error);
        return null;
    }
}