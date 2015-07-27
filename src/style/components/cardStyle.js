import colors from '../colors'

export const cardStyle = {
    card: {
        flex: '1 0 20%',
        margin: '.5em',
        padding: '.5em',
        display: 'flex',
        flexFlow: 'row nowrap'
    },
    image: {
        minWidth: '100%',
        minHeight: '100%',
        maxWidth: '120%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    imageWrapper: {
        flex: '1 1 50%',
        overflow: 'hidden',
        position: 'relative',
        //height: '20vh',
    },
    heading: {
        fontSize: '1.2em',
        color: colors.purple,
        fontWeight: '300'
    },
    content: {
        flex: '1 1 50%'
    }
}