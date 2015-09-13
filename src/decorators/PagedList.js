import React from 'react'
import _ from 'lodash'
import { makeReactive } from 'mobservable'
import { reactiveComponent } from 'mobservable-react'

export default (Component) => {

    let listData = makeReactive({
        total: 99999,
        fetched: 0,
        page: 1,
        datasetId: null,
        loading: false,
        data: []
    })

    return reactiveComponent(class extends React.Component {

        constructor(props) {
            super()
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

        isDecayed(datasetId) {
            if(listData.datasetId === datasetId) return false
            listData.datasetId = datasetId

            return true
        }

        reset() {
            listData.total = 99999
            listData.fetched = 0
            listData.page = 1
            listData.data = []
        }

        shouldFetch(datasetId) {
            if(this.isDecayed(datasetId)) {
                this.reset()
                return true
            }

            return (listData.fetched < listData.page && listData.fetched < listData.total)
        }

        fetchNext(e) {
            e.preventDefault()
            listData.page = listData.page + 1
        }

        render() {
            return (
                <div>
                    <Component
                        {...this.props}
                        listData={listData.data}
                        page={listData.page}
                        shouldFetch={this.shouldFetch.bind(this)}
                        receiveData={this.receiveData.bind(this)}
                        receiveMeta={this.receiveMeta.bind(this)}
                        nextAction={this.fetchNext.bind(this)} />
                </div>
            )
        }
    })
}