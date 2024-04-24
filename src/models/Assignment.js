import { countdown } from "../../lib/utils"

export default class Assignment { 
  constructor(assignment) {
    this.title = assignment.title
    this.max_amount = assignment.tasks[0].values[0]
    this.current_amount = assignment.progress[0]
    this.countdown = countdown((new Date(assignment.expiration).getTime() - new Date().getTime()) / 1000)
  }
}