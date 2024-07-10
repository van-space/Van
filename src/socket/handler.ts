import { setOnlineCount } from '~/atoms'
import { EventTypes } from '~/types/events'
import { isDev } from '~/utils/env'

export const eventHandler = (type: EventTypes, data: any) => {
  switch (type) {
    case EventTypes.VISITOR_ONLINE:
    case EventTypes.VISITOR_OFFLINE: {
      console.log('🚀 ~ eventHandler ~ EventTypes:')
      const { online } = data
      setOnlineCount(online)
      break
    }

    default: {
      if (isDev) {
        console.log(type, data)
      }
    }
  }
}
