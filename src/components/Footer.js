import React, {Component} from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }

    render() {
        return (
            <footer className="footer">
                <div><a href="#">{this.props.footerTitle1}</a></div>
                <div className="footer-on-color"><a href="#">{this.props.footerTitle2}</a></div>
            </footer>
        );
    }
}

export default Footer;