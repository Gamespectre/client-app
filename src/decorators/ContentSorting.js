import React from 'react'
import _ from 'lodash'
import { reactiveComponent } from 'mobservable-react'
import { makeReactive, extendReactive } from 'mobservable'
import SortControls from '../views/components/SortControls.jsx'

export default (sorters) => (Component) => {

    let sortData = makeReactive({})

    return reactiveComponent(class extends React.Component {

        constructor(props) {
            super()
        }

        applySort(sort) {
            let sorter = sorters[sort.name]
            sortData[sort.name] = {
                [sorter.property]: sort.sort
            }

            this.sortListData()
        }

        sortListData() {

        }

        getSortingProperties() {
            return {}
        }

        render() {
            return <Component
                {...this.props}
                sortProperties={this.getSortingProperties()}
                sortControls={<SortControls onSort={this.applySort.bind(this)} sorters={sorters} />}/>
        }
    })
}