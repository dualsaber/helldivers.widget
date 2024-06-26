export default class Planet {
  constructor(planet) {
    this.name = planet.name

    this.percentage = planet?.event?.health
      ? (100 - (planet.event.health / planet.event.maxHealth) * 100).toFixed(2)
      : (100 - (planet.health / planet.maxHealth) * 100).toFixed(2)

    if (planet?.event?.eventType) this.event_type = planet.event.eventType
    if (planet?.event?.faction)
      this.event_faction =
        planet.event.faction === "Terminids"
          ? 1
          : planet.event.faction === "Automaton"
          ? 2
          : 0
    else
      this.event_faction =
        planet.currentOwner === "Terminids"
          ? 1
          : planet.currentOwner === "Automaton"
          ? 2
          : 0
  }
}
