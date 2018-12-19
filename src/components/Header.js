import React,{ Component } from 'react';

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = ({

        })
    }

    render(){
        return (
            <header className="head msg-head">
                <div className="head-concent">
                    <div className="head-concent-left">
                        <a href="javascript:history.back(-1);">
                            <span>{"<"}</span>
                            &nbsp;返回
                        </a>
                    </div>
                    <div className="head-concent-center">
                        <p>{this.props.title}</p>
                    </div>
                    <div className="head-concent-right grzx">
                        <a href="#"></a>
                    </div>
                </div>
                <div className="msg-head-dex msg-content">
                    <p>大叔大婶上课经营特点的的神色</p>
                </div>
            </header>
        )
    }
}

export default Header;