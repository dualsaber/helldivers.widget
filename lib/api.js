const BASE_URL = "https://api.helldivers2.dev/api/v1"

import Planet from "../src/models/Planet"
import Assignment from "../src/models/Assignment"

function handleError(response) {
  console.error("ERROR:", response.status, response.statusText)
}

export async function getAssignments(planets) {
  const response = await fetch(`${BASE_URL}/assignments`)
  if (response.status !== 200) handleError(response)
  const data = await response.json()
  if (data.length === 0) return {}
  console.log(new Assignment(data[0], planets))
  return new Assignment(data[0], planets)
}

export async function getAllPlanets() {
  const response = await fetch(`${BASE_URL}/planets`)
  if (response.status !== 200) handleError(response)
  const data = await response.json()
  return data.map(planet => new Planet(planet))
}

export async function getPlanetEvents() {
  const response = await fetch(`${BASE_URL}/planet-events`)
  if (response.status !== 200) handleError(response)
  const data = await response.json()

  const events = data.map(planet => new Planet(planet))
  events.sort((a, b) => b.percentage - a.percentage)

  return events.splice(0, 2)
}
