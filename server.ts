import express from 'express'
import next from 'next'
import multiProcess from './servers/heroku'

const port: number = parseInt(<string>process.env.PORT, 10) || 3000
const dev: boolean = <string>process.env.NODE_ENV !== 'production'

const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

if (!multiProcess) {
    app.prepare().then(() => {
        const server = express()

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            // console.log(`> Ready on http://localhost:${port}`)
        })
    })
}
