import React from 'react'
import { AppProps } from 'next/app'

import './_app.scss'

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />
}

export default App
