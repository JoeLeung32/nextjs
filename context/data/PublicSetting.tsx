interface ActionProvider {
    type: string
    data: any
}

interface StateProvider {
    theme: string
    rehydrated: boolean
}

export interface PublicSettingProps {
    settings: StateProvider
    settingDispatch: ({ type, data }: ActionProvider) => void
}

export const initialState = { theme: 'themeLight', rehydrated: false }

export const reducer = (state: StateProvider, action: ActionProvider) => {
    const { type, data } = action
    switch (type) {
        case 'initial': {
            return {
                ...state,
                // ...(data as {}),
                rehydrated: true,
            }
        }
        case 'setTheme': {
            return {
                ...state,
                theme: data,
            }
            // return Object.assign({}, state, {
            //     theme: data,
            // })
        }
        default: {
            return state
        }
    }
}
