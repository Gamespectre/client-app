import colors from '../colors'
import constants from '../constants'

export const logo = {
    wrapper: {
        padding: '1.3em 7em 1.3em ' + constants.sidePadding,
        //background: `linear-gradient(-45deg, transparent 3.5em, ${colors.whitegrey} 3.5em)`
    },
    logo: {
        h1: {
            margin: 0,
            textAlign: 'center',
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '2em',
            lineHeight: '1em',
            fontWeight: 400,
            color: '#ffffff',
        },
        link: {
            textDecoration: 'none',
            color: colors.darkgrey
        },
        game: {
            fontWeight: 700,
            color: colors.purple,
        },
        spectre: {
            fontWeight: 300,
        }
    }
}