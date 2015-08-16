import ApiClient from '../api/ApiClient'

class ListService {

    constructor(state, actions) {
        this.state = state
        this.actions = actions
    }

    fetch() {
        if(!this.shouldFetch()) return false
        if(this.state.page > this.state.total) this.state.page = this.state.total
        this.state.loading = true

        return ApiClient.fetch(this.state.method, this.state.name, 0, {
            page: this.state.page
        })
        .then(this.handleResponse.bind(this))
        .catch(error => {
            this.onError(error)
        })
    }

    onError(error) {
        console.error(error)
    }

    handleResponse(response) {
        let totalPages = response.data.meta.pagination.total_pages
        let fetchedPage = response.data.meta.pagination.current_page

        this.state.total = totalPages
        this.state.fetched = fetchedPage

        return response.data.data
    }

    shouldFetch() {
        return (this.state.fetched < this.state.page && this.state.fetched < this.state.total)
    }
}

export default ListService