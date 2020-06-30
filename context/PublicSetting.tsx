import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { parseCookies, setCookie } from 'nookies'
// import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { PublicSettingProps, initialState, reducer } from './data/PublicSetting'

const cookieKeyName = 'siteSettings'
const cookieOptions = {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
}
const PublicSetting = createContext({} as PublicSettingProps)

export const PublicSettingProvider = (props: any) => {
    const cookies = parseCookies()
    const [settings, settingDispatch] = useReducer(reducer, initialState)
    const value = { settings, settingDispatch }
    const { children } = props
    useEffect(() => {
        settingDispatch({
            type: 'initial',
            data: null,
        })
        if (cookies[cookieKeyName]) {
            const cookieKeyValue = JSON.parse(cookies[cookieKeyName])
            if (cookieKeyValue) {
                settingDispatch({
                    type: 'setTheme',
                    data: cookieKeyValue.theme,
                })
            }
        }
    }, [])
    useEffect(() => {
        if (settings.rehydrated) {
            setCookie(
                null,
                cookieKeyName,
                JSON.stringify(settings),
                cookieOptions
            )
        }
    }, [settings])
    return (
        <PublicSetting.Provider value={value}>
            {children}
        </PublicSetting.Provider>
    )
}

export const usePublicSetting = () => useContext(PublicSetting)

export const withPublicSetting = (Component: any) => (props: any) => {
    return (
        <PublicSetting.Consumer>
            {(consumerProps) => {
                return <Component {...props} {...consumerProps} />
            }}
        </PublicSetting.Consumer>
    )
}
