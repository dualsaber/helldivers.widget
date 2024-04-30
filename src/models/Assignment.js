import { countdown } from "../../lib/utils"

const getMajorOrderPlanets = (planet_indexes, planets) => {
  return planet_indexes.map(index => planets[index])
}

export default class Assignment {
  constructor(assignment, planets) {
    this.title = assignment.title
    this.description = assignment.description
    this.max_amount = assignment.tasks[0].values[0]
    this.current_amount = assignment.progress[0]
    this.countdown = countdown(
      (new Date(assignment.expiration).getTime() - new Date().getTime()) / 1000
    )

    if (planets?.length) {
      this.planets = getMajorOrderPlanets(
        assignment.tasks.map(task => task.values[2]),
        planets
      )
      this.planets.sort((a, b) => b.percentage - a.percentage)
    }
  }
}
