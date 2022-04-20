import mongoose from 'mongoose'

export class DatabaseService {
  private mongodbURI: string

  constructor() {
    this.mongodbURI = (process.env.MONGODB_URI as string) || ''
  }

  public async connectDB(): Promise<void> {
    try {
      const db = await mongoose.connect(this.mongodbURI)
      console.log('DB ->', `Database name: ${db.connection.name}`)
    } catch (error) {
      console.error('ERROR-DB ->', (error as Error).message)
      throw null
    }
  }
}
