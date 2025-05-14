export default async function geocodeAddress(address: string): Promise<{ lat: number, lon: number } | null> {
    const encoded = encodeURIComponent(address)
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`, {
        headers: {
            'User-Agent': 'TestLocalApp/0.1 (hei-tech-project.local)'
        }
    })

    const json = await res.json()
    if (json.length === 0) return null

    const { lat, lon } = json[0]
    return { lat: parseFloat(lat), lon: parseFloat(lon) }
}
