import React from 'react'
import { makeReactive } from 'mobservable'

export default (Component) => {

    let listData = makeReactive({
        total: 99999,
        fetched: 0,
        loading: false,
        data: []
    })

    return class extends React.Component {

        constructor(props) {
            super()

            this.state = {
                page: 1
            }
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.scrollListener)
        }

        receiveData(data) {
            data.forEach(el => listData.data.push(el))
            return data
        }

        receiveMeta(response) {
            listData.total = response.data.meta.pagination.total_pages
            listData.fetched = response.data.meta.pagination.current_page

            return response.data.data

        }

        shouldFetch() {
            return (listData.fetched < this.state.page && listData.fetched < listData.total)
        }

        fetchNext(e) {
            e.preventDefault()

            this.setState({
                page: this.state.page + 1
            })
        }

        render() {
            return (
                <div>
                    <Component
                        {...this.props}
                        listData={listData.data}
                        page={this.state.page}
                        shouldFetch={this.shouldFetch.bind(this)}
                        receiveData={this.receiveData.bind(this)}
                        receiveMeta={this.receiveMeta.bind(this)} />

                    <button onClick={this.fetchNext.bind(this)}>Next</button>
                </div>
            )
        }
    }
}