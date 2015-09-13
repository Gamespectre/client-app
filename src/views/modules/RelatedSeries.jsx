import React from 'react'
import ApiClient from '../../api/ApiClient'
import { reactiveComponent } from 'mobservable-react'
import { resolve } from 'react-resolver'
import PagedList from '../../decorators/PagedList'

@PagedList
@resolve('series', (props) => {
    if(props.shouldFetch(props.parentId)) return ApiClient.fetch('series', props.parentType, props.parentId, {
        page: props.page,
        perPage: 10
    }).then(props.receiveMeta).then(props.receiveData)
})
class RelatedSeries extends React.Component {

    render() {

        return (
            <div>
                <h2>Series</h2>
                {this.props.listData.map(item => (<div key={item.id}>
                    <h2>{item.title || item.name}</h2>
                </div>))}
            </div>
        )
    }
}

export default RelatedSeries