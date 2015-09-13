import React from 'react'
import ApiClient from '../../api/ApiClient'
import { reactiveComponent } from 'mobservable-react'
import { resolve } from 'react-resolver'
import PagedList from '../../decorators/PagedList'

@PagedList
@resolve('creators', (props) => {
    if(props.shouldFetch(props.parentId)) return ApiClient.fetch('creators', props.parentType, props.parentId, {
        page: props.page,
        perPage: 10
    }).then(props.receiveMeta).then(props.receiveData)
})
class RelatedCreators extends React.Component {

    render() {

        return (
            <div>
                <h2>Creators</h2>
                {this.props.listData.map(item => (<div key={item.id}>
                    <h2>{item.title || item.name}</h2>
                </div>))}
            </div>
        )
    }
}

export default RelatedCreators