import React from 'react'

class SortByAge extends React.Component {

    constructor() {
        super()

        this.state = {
            sortDir: 'desc'
        }
    }

    onSort(e) {
        let value = e.target.value

        this.setState({
            sortDir: value
        })

        this.props.onSort({
            name: this.props.config.name,
            sort: value
        })
    }

    render() {
        let { config } = this.props
        let radioConfig = {
            name: config.name,
            onChange: this.onSort.bind(this),
            type: 'radio'
        }

        return (
            <div>
                <h6>
                    {config.name}
                </h6>
                <label>
                    <input {...radioConfig}
                        value="desc"
                        checked={this.state.sortDir === 'desc'} />
                    {config.options.desc}
                </label>
                <label>
                    <input {...radioConfig}
                        value="asc"
                        checked={this.state.sortDir === 'asc'} />
                    {config.options.asc}
                </label>
            </div>
        )
    }
}

export default SortByAge