import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }

    render() {
        return (
            <footer className="footer">
                <Link to="vol">
                    <div className={this.props.on==0?"footer-on-color":""}>{this.props.footerTitle1}</div>
                </Link>
                <Link to="">
                    <div className={this.props.on==1?"footer-on-color":""}>{this.props.footerTitle2}</div>
                </Link>
            </footer>
        );
    }
}

export default Footer;