const OVERPASS_URL = "https://overpass-api.de/api/interpreter"

const MAX_RETRIES = 3
const INITIAL_BACKOFF = 2000 // 2 seconds

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function executeOverpassQuery(query: string, retries = 0): Promise<any> {
  try {
    const response = await fetch(OVERPASS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "OutreachOS/1.0",
      },
      body: new URLSearchParams({ data: query }),
    })

    if (response.status === 429) {
      if (retries >= MAX_RETRIES) {
        throw new Error("Overpass API rate limit exceeded after maximum retries.")
      }
      const backoff = INITIAL_BACKOFF * Math.pow(2, retries)
      console.warn(`Overpass API rate limited. Retrying in ${backoff}ms...`)
      await wait(backoff)
      return executeOverpassQuery(query, retries + 1)
    }

    if (!response.ok) {
      throw new Error(`Overpass request failed: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    if (retries < MAX_RETRIES) {
        const backoff = INITIAL_BACKOFF * Math.pow(2, retries)
        console.warn(`Overpass API request failed. Retrying in ${backoff}ms...`, error)
        await wait(backoff)
        return executeOverpassQuery(query, retries + 1)
    }
    throw error
  }
}
