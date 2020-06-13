import path from 'path'
import url from 'url'
import cluster from 'cluster'
import os from 'os'

const numCPUs: number = os.cpus().length
const dev: boolean = process.env.NODE_ENV !== 'production'

const multiProcess = () => {
    if (!dev && cluster.isMaster) {
        console.log(`Node cluster master ${process.pid} is running`)

        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) => {
            console.error(
                `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
            )
        })
        return true
    }
    return false
}

export default multiProcess()
