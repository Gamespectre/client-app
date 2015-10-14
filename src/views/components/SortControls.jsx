import React from 'react'

export default (props) => (
    <div>
        {Object.keys(props.sorters).map(sorter => {
            let sort = props.sorters[sorter]
            let Comp = sort.component

            return <Comp
                key={sorter}
                onSort={props.onSort}
                config={sort} />
        })}
    </div>
)