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
            let top = verge.scrollY()
            let down = top > prevScroll ? true : false
            prevScroll = top

            if(down) this.fetchNext()
        }, 250)
    }

    fetch() {
        if(!this.shouldFetch()) return false

        this.actions.loading()

        return ApiClient.fetch(this.resource.method, this.resource.name, 0, {
            page: this.state.page
        })
        .then(this.handleResponse.bind(this))
        .catch(error => {
            this.actions.error(error)
        })
    }

    handleResponse(response) {
        let totalPages = response.data.meta.pagination.total_pages
        let fetchedPage = response.data.meta.pagination.current_page

        this.setState({
            total: totalPages,
            fetched: fetchedPage
        })

        this.actions.receivedResults(response.data.data)
    }

    shouldFetch() {
        return (this.state.fetched < this.state.page && this.state.fetched < this.state.total)
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