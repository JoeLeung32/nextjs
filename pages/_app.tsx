import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { themeDark, themeLight } from '../themes'
import {
    PublicSettingProvider,
    usePublicSetting,
} from '../context/PublicSetting'

import './_app.scss'

const Context = ({ children }: any) => {
    return <PublicSettingProvider>{children}</PublicSettingProvider>
}

const ThemeWrapper = ({ Component, pageProps }: AppProps) => {
    const { settings } = usePublicSetting()
    if (!settings.rehydrated) return <div>Preparing Settings...</div>
    const funcGetTheme = () => {
        switch (settings.theme) {
            case 'themeDark':
                return themeDark
            case 'themeLight':
                return themeLight
            default:
                return themeLight
        }
    }
    return (
        <ThemeProvider theme={funcGetTheme()}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

const App = (props: AppProps) => {
    return (
        <Context>
            <ThemeWrapper {...props} />
        </Context>
    )
}

export default App
