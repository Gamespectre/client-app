import React from 'react'
import Radium from 'radium'
import { modalPage as styles } from '../../style/components/modalPage'
import assign from 'object-assign'
import { Link } from 'react-router'

@Radium
class ModalPage extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div style={styles.overlay}>
                <div style={styles.wrapper}>
                    <Link to={this.props.back} style={styles.closeBtn}>&#9587; close</Link>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ModalPage