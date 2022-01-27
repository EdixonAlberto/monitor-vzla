class IntervalService {
  timeInterval = 0
  updateHours = []

  constructor() {
    this.timeInterval = 1000 * 60
    this.updateHours = [
      {
        hour: '09:30',
        executed: false
      },
      {
        hour: '02:30',
        executed: false
      }
    ]
  }

  init(callback) {
    let interval = 0

    try {
      interval = setInterval(async () => {
        const date = new Date()

        for (let i = 0; i < this.updateHours.length; i++) {
          if (!this.updateHours[i].executed) {
            const updateHour = this.updateHours[i].hour
            const updateTime = this.convertHourToTime(updateHour)
            const currentTime = date.getTime() + 28800000 // Sumar 8 hrs para adecuar el timezone a Vzla

            if (currentTime > updateTime) {
              callback()

              if (i === this.updateHours.length) {
                // Reiniciar lista de horas
                this.updateHours.forEach(updateHour => (updateHour.executed = false))
              } else {
                // Recordar que se ejecuto el callback a esta hora
                this.updateHours[i].executed = true
              }

              break
            }
          }
        }
      }, this.timeInterval)
    } catch (error) {
      clearInterval(interval)
      throw error
    }
  }

  convertHourToTime(hour) {
    let date = new Date()
    date = date.toISOString().split('T')[0]

    const updateDate = new Date(`${date}T${hour}:00.000Z`)
    return updateDate.getTime()
  }
}

module.exports = { IntervalService }
