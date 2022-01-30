class IntervalService {
  timeInterval = 0
  updateHours = []
  date = null
  dailyCycle = true

  constructor(updateHours) {
    this.timeInterval = 1000 * 60
    this.updateHours = updateHours.map(hour => ({
      hour,
      executed: false
    }))
  }

  init(callback) {
    let interval = 0

    try {
      interval = setInterval(async () => {
        this.date = new Date()
        console.log(this.date.toISOString().split('T')[1])

        if (this.dailyCycle) {
          for (let i = 0; i < this.updateHours.length; i++) {
            const { hour, executed } = this.updateHours[i]

            if (!executed) {
              const updateTime = this.convertHourToTime(hour)
              const currentTime = this.getTimeVzla()

              if (currentTime >= updateTime) {
                await callback()

                // Recordar que se ejecuto el callback a esta hora
                this.updateHours[i].executed = true
                if (i === this.updateHours.length - 1) this.dailyCycle = false

                break
              }
            }
          }
        } else {
          const resetTime = this.convertHourToTime('00:00')
          const currentTime = this.getTimeVzla()

          if (currentTime >= resetTime) {
            // Reiniciar lista de horas
            this.updateHours.forEach(updateHour => (updateHour.executed = false))
          }
        }
      }, this.timeInterval)
    } catch (error) {
      clearInterval(interval)
      throw error
    }
  }

  convertHourToTime(hour) {
    const date = this.date.toISOString().split('T')[0]

    const updateDate = new Date(`${date}T${hour}:00.000Z`)
    return updateDate.getTime()
  }

  getTimeVzla() {
    const date = this.date.getTime()
    return date - 14400000 // Restar 4 hrs para adecuar el timezone a Vzla
  }
}

module.exports = { IntervalService }
