export const columns = {
    wrapper: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    col: (width) => { return {
        flex: `1 0 ${width}`,
        alignItems: 'flex-start'
    }}
}