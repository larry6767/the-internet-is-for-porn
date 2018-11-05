import {createAction} from 'redux-actions'

const
    types = {
        OPEN_BURGER_MENU: 'BURGER_MENU@OPEN',
        CLOSE_BURGER_MENU: 'BURGER_MENU@CLOSE'
    },

    openBurgerMenu = createAction(types.OPEN_BURGER_MENU),
    closeBurgerMenu = createAction(types.CLOSE_BURGER_MENU)

export {
    openBurgerMenu,
    closeBurgerMenu,
    types
}
