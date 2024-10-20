import React, { createContext, useState } from 'react'
import { themeData } from '../data/themeData'
import * as themes from '../theme/theme'

export const ThemeContext = createContext()

function ThemeContextProvider(props) {
    const [theme, setTheme] = useState({
        ...themeData.theme,
        type: themeData.themeType
    });
    const [drawerOpen, setDrawerOpen] = useState(false)

    const setHandleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const changeTheme = (selectedTheme) => {
        setTheme({
            ...themes[selectedTheme],
            type: selectedTheme
        })
    }

    const value = { theme, drawerOpen, setHandleDrawer, changeTheme }
    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider