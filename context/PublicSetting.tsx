import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { PublicSettingProps, initialState, reducer } from './data/PublicSetting'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

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
    // useEffect(() => {
    //     settingDispatch({
    //         type: 'initial',
    //         data: null,
    //     })
    // }, [])
    useEffect(() => {
        if (!settings.rehydrated) {
            return
        } else {
            setCookie(
                null,
                '_settings',
                JSON.stringify(settings),
                cookieOptions
            )
        }
    }, [settings])
    useEffect(() => {
        settingDispatch({
            type: 'initial',
            data: null,
        })
        if (cookies._settings) {
            const _settings = JSON.parse(cookies._settings)
            if (_settings) {
                settingDispatch({
                    type: 'setTheme',
                    data: _settings.theme,
                })
            }
        }
    }, [])
    return (
        <PublicSetting.Provider value={value}>
            {props.children}
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
