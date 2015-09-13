import React from 'react'
import _ from 'lodash'
import verge from 'verge'
import { reactiveComponent } from 'mobservable-react'
import { makeReactive, extendReactive } from 'mobservable'

export default (Component) => {

    let listData = makeReactive({
        total: 99999,
        fetched: 0,
        loading: false,
        page: 1,
        data: []
    })

    return reactiveComponent(class extends React.Component {

        constructor(props) {
            super()

            this.scrollListener = this.checkScroll()

            if(__CLIENT__) {
                window.addEventListener('scroll', this.scrollListener)
            }
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.scrollListener)
        }

        checkScroll() {
            let prevScroll = 0

            return _.debounce(() => {
                const top = verge.scrollY()
                const scrollLimit = top + 500;

                if(top < prevScroll) {
                    return;
                }

                if(scrollLimit > prevScroll) {
                    prevScroll = top
                    listData.page = listData.page + 1
                }
            }, 250)
        }

        receiveData(data) {
            listData.data = _.uniq(listData.data.slice().concat(data), 'id')
            return data
        }

        receiveMeta(response) {
            listData.total = response.data.meta.pagination.total_pages
            listData.fetched = response.data.meta.pagination.current_page

            return response.data.data
        }

        shouldFetch() {
            return (listData.fetched < listData.page && listData.fetched < listData.total)
        }


        render() {
            return <Component
                {...this.props}
                listData={listData.data}
                page={listData.page}
                shouldFetch={this.shouldFetch.bind(this)}
                receiveData={this.receiveData.bind(this)}
                receiveMeta={this.receiveMeta.bind(this)} />
        }
    })
}