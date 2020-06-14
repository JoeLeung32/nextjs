interface ActionProvider {
    type: string
    data: any
}

export interface PublicSettingProps {
    settings: {
        theme: string
        rehydrated: boolean
    }
    settingDispatch: ({ type, data }: ActionProvider) => void
}

export const initialState = { theme: 'themeLight', rehydrated: false }

export const reducer = (state: object, action: ActionProvider) => {
    switch (action.type) {
        case 'initial':
            return {
                ...state,
                ...action.data,
                rehydrated: true,
            }
        case 'setTheme':
            return {
                ...state,
                theme: action.data,
            }
        default:
            return state
    }
}
