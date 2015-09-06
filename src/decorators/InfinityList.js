import React from 'react'
import _ from 'lodash'
import verge from 'verge'
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

            this.scrollListener = this.checkScroll()

            if(__CLIENT__) {
                window.addEventListener('scroll', this.scrollListener)
            }

            this.state = {
                page: 1
            }
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.scrollListener)
        }

        checkScroll() {
            let prevScroll = 0

            return _.debounce(() => {
                let top = verge.scrollY()
                let down = top > prevScroll ? true : false

                if(top + 500 > prevScroll) {
                    prevScroll = top

                    if(down) {
                        this.setState({
                            page: this.state.page + 1
                        })
                    }
                }
            }, 250)
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


        render() {
            return <Component
                {...this.props}
                listData={listData.data}
                page={this.state.page}
                shouldFetch={this.shouldFetch.bind(this)}
                receiveData={this.receiveData.bind(this)}
                receiveMeta={this.receiveMeta.bind(this)} />
        }
    }
}