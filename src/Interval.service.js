class IntervalService {
  timeInterval = 10
  updateHours = []

  constructor(timeInterval) {
    this.timeInterval = timeInterval
    this.updateHours = ['10:00', '14:00']
  }

  init(callback) {
    let interval = 0

    try {
      interval = setInterval(async () => {
        const date = new Date().toLocaleString('es', { timeZone: 'America/Caracas' })
        const hour = date.split(' ')[1].split(':')
        const currentHour = hour[0] + ':' + hour[1]

        for (let i = 0; i < this.updateHours.length; i++) {
          const updateHour = this.updateHours[i]

          if (currentHour === updateHour) {
            callback()
            break
          }
        }
      }, 1000 * this.timeInterval)
    } catch (error) {
      clearInterval(interval)
      throw error
    }
  }
}

module.exports = { IntervalService }
