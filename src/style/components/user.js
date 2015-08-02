import colors from '../colors'

export const user = {
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 110
    },
    userDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    avatar: {
        height: '3em',
        display: 'block',
        borderRadius: '50%',
        marginLeft: '1em'
    },
    name: {
        fontSize: '.9em',
        //textTransform: 'uppercase',
        fontWeight: '700',
        color: colors.purple
    }
}