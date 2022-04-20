import { UpdateHourModel } from 'models/UpdateHour'

export class IntervalService {
  private timeInterval = 0
  private updateHours: Array<{ _id: string; hour: string; executed: boolean }> = []
  private date: Date
  private dailyCycle = true
  private resetTime = 0

  constructor(hours: string[]) {
    this.timeInterval = 1000 * 60
    this.date = new Date()
    this.initUpdateHours(hours)
    this.resetTime = this.getResetTime()
  }

  private async initUpdateHours(hours: string[]): Promise<void> {
    const updateHours = await UpdateHourModel.find({}, { __v: false })

    if (!updateHours.length) {
      for await (const hour of hours) {
        const updateHour = new UpdateHourModel({ hour, executed: false })

        await updateHour.save()
        this.updateHours.push(updateHour)
      }
    } else this.updateHours = updateHours
  }

  start(callback) {
    let interval = setInterval(() => null)

    try {
      interval = setInterval(async () => {
        this.date = new Date()

        if (this.dailyCycle) {
          const updateHours = await UpdateHourModel.find({}, { __v: false })

          for (let i = 0; i < updateHours.length; i++) {
            const { hour, executed } = updateHours[i]

            if (!executed) {
              const updateTime = this.convertHourToTime(hour)
              const currentTime = this.getTimeVzla()

              if (currentTime >= updateTime) {
                await callback()

                // Recordar que se ejecutó el callback a esta hora
                await UpdateHourModel.findByIdAndUpdate(updateHours[i]._id, {
                  executed: true
                })
                if (i === updateHours.length - 1) this.dailyCycle = false

                break
              }
            }
          }
        } else {
          const currentTime = this.getTimeVzla()

          if (currentTime >= this.resetTime) {
            // Reiniciar lista de horas
            await UpdateHourModel.updateMany({}, { executed: false })
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
