import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';

class Vol extends Component {
    constructor(props) {
        super(props);
        this.state = ({

        });
    }

    render(){
        return (
            <div className="wap-body">
                {/*head*/}
                <Header title="我的学生"/>

                {/*head结束*/}
                {/*我的志愿*/}
                <div className="vol-content my-vol-content">
                    <div className="vol-list">
                        <div className="vol-item">
                            <div className="vol-head">第一志愿</div>
                            <div className="vol-des">
                                <div className="vol-des-icon">
                                    <div className="ds2"></div>
                                    <p>?</p>
                                </div>
                                <div className="vol-des-name">某某某</div>
                                <div className="vol-des-number">已有<span className="vol-des-count">7</span>个学生报名</div>
                                <div className="vol-des-sel">
                                    <p className="check">查看</p>
                                    <span>|</span>
                                    <a href="" className="reset">重选</a>
                                </div>
                                <div className="vol-tobeselected">待选</div>
                            </div>
                        </div>
                        <div className="vol-item">
                            <div className="vol-head">第二志愿</div>
                            <div className="vol-des">
                                <div className="vol-des-icon">
                                    <div className="ds1"></div>
                                    <p>?</p>
                                </div>
                                <div className="vol-des-name">某某某</div>
                                <div className="vol-des-number">已有<span className="vol-des-count">4</span>个学生报名</div>
                                <div className="vol-des-sel">
                                    <p className="check">查看</p>
                                    <span>|</span>
                                    <a href="" className="reset">重选</a>
                                </div>
                                <div className="vol-tobeselected">待选</div>
                            </div>
                        </div>
                        <div className="vol-item tobeselected">
                            <div className="vol-head">第三志愿</div>
                            <div className="vol-des">
                                <div className="vol-des-icon">
                                    <div className="ds2"></div>
                                    <p>?</p>
                                </div>
                                <div className="vol-des-name">某某某</div>
                                <div className="vol-des-number">已有<span className="vol-des-count">4</span>个学生报名</div>
                                <div className="vol-des-sel">
                                    <p className="check">查看</p>
                                    <span>|</span>
                                    <a href="" className="reset">重选</a>
                                </div>
                                <div className="vol-tobeselected">待选</div>
                            </div>
                        </div>
                    </div>

                    <div className="vol-tch have-tch">
                        <div className="vol-tch-head">我的导师</div>
                        <div className="vol-tch-des">导师正在赶来的路上，再等一会儿吧~</div>
                        <div className="vol-des">
                            <div className="vol-des-icon">
                                <div className="ds1"></div>
                                <p>?</p>
                            </div>
                            <div className="vol-des-name">某某某</div>
                            <div className="vol-des-number">已有<span className="vol-des-count">4</span>个学生报名</div>
                            <div className="vol-des-sel">
                                <p className="check">查看</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="vol-tch-detail">
                    <div>
                        <ul className="vol-tch-ul">
                            <li className="li-long">
                                <div className="tch-det-title">姓名</div>
                                <div className="tch-det-des"></div>
                            </li>
                            <li className="li-long">
                                <div className="tch-det-title">所属专业或分类</div>
                                <div className="tch-det-des"></div>
                            </li>
                            <li className="li-long">
                                <div className="tch-det-title">要求</div>
                                <div className="tch-det-des"></div>
                            </li>
                            <li className="li-long">
                                <div className="tch-det-title">备注</div>
                                <div className="tch-det-des" data-beizhu>官网的导师资料已经近十年没有更
                                    新（一些新引进导师除外），大家
                                    选择导师时除了学长学姐介绍外。
                                </div>
                            </li>
                        </ul>
                        <div className="vol-close">×</div>
                    </div>
                </div>

                <input type="hidden" value="1" className="bmid"/>
                {/*我的志愿结束*/}

                {/*底部*/}
                <Footer footerTitle1={"我的志愿"} footerTitle2={"填报志愿"} on={0}/>
                {/*底部结束*/}

                    <div className="mengban"></div>
            </div>
        );
    }
}

export default Vol;