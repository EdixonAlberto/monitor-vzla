import { Bot, configLoad } from '@edixon/concord'
import { DatabaseService } from 'services/Database.service'

async function main() {
  try {
    await configLoad()

    const database = new DatabaseService()
    await database.connectDB()

    const bot = new Bot()
    await bot.start()
  } catch (_) {}
}

main()
