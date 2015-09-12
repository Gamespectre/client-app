import React from 'react'
import { makeReactive } from 'mobservable'
import { reactiveComponent } from 'mobservable-react'

export default (Component) => {

    let listData = makeReactive({
        total: 99999,
        fetched: 0,
        loading: false,
        data: []
    })

    return reactiveComponent(class extends React.Component {

        constructor(props) {
            super()

            this.state = {
                page: 1
            }
        }

        receiveData(data) {
            listData.data = listData.data.slice().concat(data)
            return data
        }

        receiveMeta(response) {
            listData.total = response.data.meta.pagination.total_pages
            listData.fetched = response.data.meta.pagination.current_page

            return response.data.data
        }

        componentWillUnmount() {

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
                        receiveMeta={this.receiveMeta.bind(this)}
                        nextAction={this.fetchNext.bind(this)} />
                </div>
            )
        }
    })
}