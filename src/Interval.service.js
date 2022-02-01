class IntervalService {
  timeInterval = 0
  updateHours = []
  date = null
  dailyCycle = true
  resetTime = 0

  constructor(updateHours) {
    this.timeInterval = 1000 * 60
    this.updateHours = updateHours.map(hour => ({
      hour,
      executed: false
    }))
    this.date = new Date()
    this.resetTime = this.getResetTime()
  }

  init(callback) {
    let interval = 0

    try {
      interval = setInterval(async () => {
        this.date = new Date()

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
          const currentTime = this.getTimeVzla()

          if (currentTime >= this.resetTime) {
            console.log('RESET', new Date(currentTime).toISOString().split('T')[1])

            // Reiniciar lista de horas
            this.updateHours.forEach(updateHour => (updateHour.executed = false))
            this.dailyCycle = true
            this.resetTime = this.getResetTime()
          }
        }
      }, this.timeInterval)
    } catch (error) {
      clearInterval(interval)
      throw error
    }
  }

  convertHourToTime(hour) {
    const time = this.getTimeVzla()
    const date = new Date(time)

    const partialDate = date.toISOString().split('T')[0]
    const updatedDate = new Date(`${partialDate}T${hour}:00.000Z`)

    return updatedDate.getTime()
  }

  getTimeVzla() {
    const time = this.date.getTime()
    // Restar 4 hrs para adecuar el timezone a Venezuela
    return time - 14400000
  }

  getResetTime() {
    const time = this.convertHourToTime('00:00')
    // Sumar 24 hrs para obtener el tiempo restante para que se termine el día
    return time + 86400000
  }
}

module.exports = { IntervalService }
