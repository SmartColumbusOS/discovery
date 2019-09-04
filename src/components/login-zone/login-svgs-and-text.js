import InlineSVG from 'react-svg-inline'
import { Component } from 'react'
import PersonIcon from '@material-ui/icons/Person'
import ArrowForwardIcon from '@material-ui/icons/ArrowRightAlt'

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <login-svgs-and-text>
                <PersonIcon className='user-icon' />
                <span>{this.props.text}</span>
                <ArrowForwardIcon className='login-arrow' />
            </login-svgs-and-text>
        )
    }
}
