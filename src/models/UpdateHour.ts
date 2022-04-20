import { getModelForClass, prop } from '@typegoose/typegoose'

class UpdateHour {
  @prop()
  hour!: string

  @prop()
  executed!: boolean
}

export const UpdateHourModel = getModelForClass(UpdateHour)
