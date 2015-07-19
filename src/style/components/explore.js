import constants from '../constants'

export const explore = {
    wrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
        marginTop: constants.sidePadding
    },
    contentNav: {
        flex: '1 0 100%'
    },
    sidebar: {
        flex: '1 0 20%'
    },
    content: {
        flex: '1 0 80%'
    }
}