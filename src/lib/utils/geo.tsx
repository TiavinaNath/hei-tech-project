export function parseWKBToLatLngBrowser(
  hex: string
): { latitude: number; longitude: number } | null {
  if (!hex || hex.length < 50) return null;

  const bytes = new Uint8Array(
    hex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))
  );
  const dataView = new DataView(bytes.buffer);

  const littleEndian = bytes[0] === 1;
  const lon = dataView.getFloat64(9, littleEndian);
  const lat = dataView.getFloat64(17, littleEndian);

  return { latitude: lat, longitude: lon };
}
