import colors from '../colors'
import constants from '../constants'

export const header = {
    box: {
        display: 'flex',
        background: colors.whitegrey
    },
    left: {
        display: 'flex',
        justifyContent: 'flex-start',
        flex: '1 0 70%',
        paddingLeft: constants.sidePadding
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
        flex: '1 2 30%',
        paddingRight: constants.sidePadding
    }
}