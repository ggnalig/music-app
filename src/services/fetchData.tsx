export const fetchData = async (type: string, query: string) => {
  console.log(`${process.env.NEXT_PUBLIC_LAST_FM_BASE_URL}2.0/?method=${type}.search&${type}=${query}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`)
  return await fetch(`${process.env.NEXT_PUBLIC_LAST_FM_BASE_URL}2.0/?method=${type}.search&${type}=${query}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`).then((res) => res.json());
}