import React from 'react'

class AdminControl extends React.Component {

    constructor() {
        super()
    }

    render() {

        return (
            <div>
                <section>
                    {this.props.children.control}
                </section>
                <section>
                    <h2>Query results:</h2>
                    {this.props.children.results}
                </section>
            </div>
        )
    }
}

export default AdminControl