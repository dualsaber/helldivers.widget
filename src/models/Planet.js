export default class Planet {
  constructor(planet) {
    this.name = planet.name
    this.percentage = (100 - ((planet.event.health / planet.event.maxHealth) * 100)).toFixed(2);
    this.event_type = planet.event.eventType
    this.event_faction =
      planet.event.faction === 'Terminids' ? 1 :
      planet.event.faction === 'Automaton' ? 2 :
      0

  }
}