import React, { PropTypes } from 'react'
import { debounce } from 'lodash'
import verge from 'verge'

class ListDisplay extends React.Component {

    constructor(props, context) {
        super()

        if(__CLIENT__) {
            window.addEventListener('scroll', this.checkScroll())
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkScroll())
    }

    checkScroll() {
        let prevScroll = 0

        return debounce(() => {
            let top = verge.scrollY()
            let down = top > prevScroll ? true : false
            prevScroll = top

            if(down) this.list.fetchNext()
        }, 250)
    }
}

export default ListDisplay