const { DEFAULT_ACTIVITY } = require('./constants')

module.exports = {
    // Update Discord RPC
   updateActivity(client, newActivity) {
        client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity: {
                ...DEFAULT_ACTIVITY, ...(newActivity || {})
            }
        })
    },

    // Window-Rich Presence
    isWatching(url) {
        const [,, type ] = url.split(/:?\//g).filter(String)
        return ['movie', 'serie'].includes(type)
    },
    
    // Window Setup
    setupWindow(win) {
        win.removeMenu()
    }
}