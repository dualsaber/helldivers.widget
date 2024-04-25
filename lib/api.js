const BASE_URL = "https://api.helldivers2.dev/api/v1"

import Planet from "../src/models/Planet"
import Assignment from "../src/models/Assignment"

function handleError(response) {
  console.error("ERROR:", response.status, response.statusText)
}

export async function getAssignments() {
  const response = await fetch(`${BASE_URL}/assignments`)
  if (response.status !== 200) handleError(response)
  const data = await response.json()
  console.log(data)
  if (data.length === 0) return {}
  return new Assignment(data[0])
}

export async function getPlanetEvents() {
  const response = await fetch(`${BASE_URL}/planet-events`)
  if (response.status !== 200) handleError(response)
  const data = await response.json()

  const events = data.map(planet => new Planet(planet))
  events.sort((a, b) => b.percentage - a.percentage)

  return events.splice(0, 2)
}
