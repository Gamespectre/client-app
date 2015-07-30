import React, { PropTypes } from 'react'
import ApiClient from '../../api/ApiClient'
import { debounce } from 'lodash'
import verge from 'verge'

class ListDisplay extends React.Component {

    constructor() {
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
            let doc = document.documentElement
            let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
            let down = top > prevScroll ? true : false
            prevScroll = top

            if(down) this.fetchNext()
        }, 250)
    }

    fetch() {
        if(this.state.fetched >= this.state.page ||
           this.state.fetched >= this.state.total) return false

        this.actions.loading()

        return ApiClient.fetch(this.resource.method, this.resource.name, 0, {
            page: this.state.page
        }).then(results => {
            let totalPages = results.data.meta.pagination.total_pages

            this.setState({
                total: totalPages,
                fetched: this.state.page
            })

            this.actions.receivedResults(results)
        }).catch(error => {
            this.actions.error(error)
        })
    }

    fetchNext() {
        let page = this.state.page

        this.setState({
            page: ++page
        })

        this.fetch()
    }
}

export default ListDisplay