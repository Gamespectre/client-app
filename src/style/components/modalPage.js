import colors from '../colors'
import constants from '../constants'
import Color from 'color'

export const modalPage = {
    overlay: {
        width: '100%',
        position: 'fixed',
        height: '100%',
        right: 0,
        top: 0,
        zIndex: 100,
        background: Color(colors.darkblue).alpha(0.8).rgbString()
    },
    closeBtn: {
        padding: '.6em 1em',
        position: 'absolute',
        top: '1em',
        left: '1em',
        color: colors.darkblue,
        fontSize: '.8em',
        textDecoration: 'none',
        fontWeight: 400,
        zIndex: 5,
        fontFamily: constants.fonts.normal,
        textTransform: 'uppercase',
        background: colors.whitegrey,
        borderRadius: '.4em',
        border: `1px solid ${Color(colors.purple).alpha(0.8).rgbString()}`,
        boxShadow: `0 1px 3px ${Color(colors.purple).alpha(0.2).rgbString()}`
    },
    btnHover: {
        boxShadow: `inset 0 1px 3px ${Color(colors.purple).alpha(0.2).rgbString()}`,
    },
    wrapper: {
        position: 'absolute',
        height: '100%',
        right: 0,
        top: 0,
        width: '85%',
        background: colors.whitegrey,
        overflow: 'hidden',
        boxShadow: '0 0 50px rgba(0,0,0,0.5)'
    },
    pageWrapper: {
        display: 'flex',
        flexFlow: 'row nowrap'
    },
    imgWrapper: {
        //flex: '1 0 30%'
    },
    img: {

    },
    contentWrapper: {
        zIndex: 2,
        color: colors.darkblue,
        padding: '3em'
    },
    heading: {
        fontFamily: constants.fonts.normal
    }
}