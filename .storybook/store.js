import { action } from '@storybook/addon-actions'

const attendance = new Set()

const actions = {
  'api/login': (payload) => payload.includes('@'),
  'api/register': (payload) => payload.email.includes('@'),
  'api/unregister': (payload) => true,
  'api/fetchLinks': (sessionId) => {
    if (!attendance.has(sessionId)) return { links: null }
    return {
      links: [
        { type: '', url: 'https://youtu.be/dQw4w9WgXcQ', language: 'en' },
        { type: '', url: 'https://miro.com/', language: 'en' },
        { type: '', url: 'https://docs.google.com/abcdef', language: 'en' },
      ],
    }
  },
  'api/fetchSessionAttendance': (sessionId) => ({
    isAttending: attendance.has(sessionId),
    sessionCount: 14,
  }),
  'api/attend': (sessionId) => {
    attendance.add(sessionId)
  },
  'api/unattend': (sessionId) => {
    attendance.delete(sessionId)
  },
}

export class Store {
  state = {}
  getters = {}
  commit(key, value) {
    action(`[vuex commit] ${key}`)(value)
  }
  dispatch(key, value) {
    action(`[vuex dispatch] ${key}`)(value)
    const result = actions[key] ? actions[key](value) : undefined

    return new Promise((resolve) => setTimeout(() => resolve(result)), 1000)
  }
}
