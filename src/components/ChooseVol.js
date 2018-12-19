import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import swiper from 'swiper';


class ChooseVol extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            selIfOpen:false,
            detIfOpen:false,
            volIfOpen:false,
            list1:[
                {title:"专业导师",on:true},
                {title:"公共导师",on:false},
                {title:"校友导师",on:false}
            ],
            list2:[
                {sex:"ds2",name:"luo",number:10,actIndex:0,colorStyle:''},
                {sex:"ds1",name:"luo",number:1,actIndex:1,colorStyle:''},
                {sex:"ds2",name:"luo",number:5,actIndex:2,colorStyle:''},
                {sex:"ds1",name:"luo",number:6,actIndex:0,colorStyle:''},
                {sex:"ds2",name:"luo",number:12,actIndex:1,colorStyle:''},
                {sex:"ds2",name:"luo",number:15,actIndex:2,colorStyle:''},
                {sex:"ds1",name:"luo",number:1,actIndex:0,colorStyle:''},
                {sex:"ds2",name:"luo",number:3,actIndex:1,colorStyle:''},
                {sex:"ds1",name:"luo",number:20,actIndex:2,colorStyle:''},
                {sex:"ds2",name:"luo",number:18,actIndex:0,colorStyle:''},
            ],
            maxNumber:10,
            list3:[
                {title:'姓名',des:''},
                {title:'性别',des:''},
                {title:'联系电话',des:''},
                {title:'邮箱',des:''},
                {title:'要求',des:'官网的导师资料已经近十年没有更新（一些新引进导师除外），大家选择导师时除了学长学姐介绍外。'},
                {title:'已有学生数',des:''},
            ],
            navActIndex:1
        })
    }

    componentDidMount(){
        this.changeColor();

        var mySwiper = new swiper('.swiper-container', {
            direction: 'vertical', // 垂直切换选项
            centeredSlides:true,
            slidesPerView:5,
            loop:false,
            speed:1000,
            slideToClickedSlide:true
        })
    }

    toggleOpen=(toggleItem)=>{
        switch (toggleItem) {
            case "sel":
                this.setState({
                    selIfOpen:!this.state.selIfOpen
                });
                break;
            case "det":
                this.setState({
                    detIfOpen:!this.state.detIfOpen
                });
                break;
            case "vol":
                this.setState({
                    volIfOpen:!this.state.volIfOpen
                });
                break;
            default:
                break;
        }
    };

    navOn=(index)=>{
        let list=this.state.list1;
        list.map((value,key)=>{
            if (key===index){
                return value.on=true;
            }
            else {
                return value.on=false;
            }
        });
        this.setState({
            list1:list,
            navActIndex:index
        });
    };

    changeColor=()=>{
        let list=this.state.list2;
        list.map(((value, key) => {
            let per = value.number/this.state.maxNumber;
            if (per<=1.0){
                return value.colorStyle="vol-des-count on-color-1";
            }
            else if (per>1.0 && per<=1.5){
                return value.colorStyle="vol-des-count on-color-2";
            }
            else {
                return value.colorStyle="vol-des-count on-color-4";
            }
        }));
        this.setState({
            list2:list
        });
    };

    render(){
        return (
            <div className="wap-body wap-body-1">
                <Header title="我的历史学生"/>
                {/*填报志愿*/}
                <div className="vol-content cho-content">
                    <div className="cho-content-head">
                        {
                            this.state.list1.map((value,key)=>{{
                                if (value.on) {
                                    return <div key={key} onClick={this.navOn.bind(this,key)} className="cho-head-item on-border-1">{value.title}</div>;
                                }
                                else {
                                    return <div key={key} onClick={this.navOn.bind(this,key)} className="cho-head-item">{value.title}</div>;
                                }
                            }})
                        }
                    </div>
                    <div className="cho-content-title">
                        <div>导师</div>
                        <div className="refresh">已报名人数</div>
                        <div>操作</div>
                    </div>
                    <div className="vol-list">
                        {
                            this.state.list2.map(((value, key) => {
                                if (value.actIndex==this.state.navActIndex){
                                    return (
                                        <div className="vol-item" key={key}>
                                            <div className="vol-des cho-vol-item">
                                                <div className="vol-des-icon">
                                                    <div className={value.sex}></div>
                                                </div>
                                                <div className="vol-des-name">{value.name}</div>
                                                <div className="vol-des-number"><span className={value.colorStyle}>{value.number}</span></div>
                                                <div className="vol-des-sel">
                                                    <p className="check" onClick={this.toggleOpen.bind(this,"det")}>查看</p>
                                                    <span>|</span>
                                                    <p className="select" onClick={this.toggleOpen.bind(this,"vol")}>选TA</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }))
                        }
                    </div>
                    <input type="hidden" value="2" className="bmid"/>

                    <div className={this.state.detIfOpen==true?"vol-tch-detail vol-tch-detail-show":"vol-tch-detail"}>
                        <div>
                            <ul className="vol-tch-ul">
                                {
                                    this.state.list3.map((value,key)=>{
                                        return (
                                            <li key={key} className="li-long">
                                                <div className="tch-det-title">{value.title}</div>
                                                <div className="tch-det-des">{value.des}</div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="vol-close" onClick={this.toggleOpen.bind(this,"det")}>×</div>
                            <div className="vol-choose" onClick={this.toggleOpen.bind(this,"vol")}>选TA</div>
                        </div>
                    </div>

                    <div className={this.state.volIfOpen==true?"vol-selectBox vol-selectBox-show":"vol-selectBox"}>
                        <div className="vol-selectBox-head">
                            <div className="vol-select-cancel" onClick={this.toggleOpen.bind(this,"vol")}>取消</div>
                            <div className="vol-select-sure" onClick={this.toggleOpen.bind(this,"vol")}>确定</div>
                        </div>
                        <div className="swiper-container">
                            <input type="hidden" className="selected-dsid" value=""/>
                            <input type="hidden" className="selected-dsname" value=""/>
                            <input type="hidden" className="selected-dspic" value=""/>
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">第一志愿</div>
                                <div className="swiper-slide">第二志愿</div>
                                <div className="swiper-slide">第三志愿</div>
                            </div>
                        </div>
                    </div>
                    <div className="loadmore">下拉加载更多老师...</div>
                </div>

                <div className={this.state.selIfOpen==false?"selected-tch-box":"selected-tch-box selected-tch-box-show"}>
                    <div className="sel-tch-contBox">
                        <div className="selected-tch">已选导师</div>
                        <div className="open">
                            <span onClick={this.toggleOpen.bind(this,"sel")}>{this.state.selIfOpen?"收起":"展开"}</span>
                            <div className="jt-icon" style={{"transform":this.state.selIfOpen==false?"rotate(0)":"rotate(180deg)"}}></div>
                        </div>
                    </div>
                    <div className="sel-tch-desBox">
                        <div className="vol-box">
                            <div className="vol-box-item first">
                                <div className="vol-title">第一志愿</div>
                                <div className="vol-tch-box">
                                    <div className="delete-icon" style={{display: "block"}}></div>
                                    <div className="vol-tch-box-img">
                                        <div className="ds1"></div>
                                    </div>
                                    <div className="vol-tch-box-name">某某某</div>
                                </div>
                            </div>
                            <div className="vol-box-item second">
                                <div className="vol-title">第二志愿</div>
                                <div className="vol-tch-box">
                                    <div className="delete-icon"></div>
                                    <div className="vol-tch-box-img">
                                        <span>?</span>
                                    </div>
                                    <div className="vol-tch-box-name">待选</div>
                                </div>
                            </div>
                            <div className="vol-box-item third">
                                <div className="vol-title">第三志愿</div>
                                <div className="vol-tch-box">
                                    <div className="delete-icon"></div>
                                    <div className="vol-tch-box-img">
                                        <span>?</span>
                                    </div>
                                    <div className="vol-tch-box-name">待选</div>
                                </div>
                            </div>
                        </div>

                        <input type="checkbox" name="btn" id="btn1"/>
                        <span className="fctj">服从调剂</span>
                        <div className="cho-submit">提&nbsp;&nbsp;交</div>
                        <input className="submit_ok" type="hidden" />
                    </div>
                </div>
                {/*填报志愿结束*/}

                {/*底部*/}
                <Footer footerTitle1={"我的志愿"} footerTitle2={"填报志愿"} on={1}/>
                {/*底部结束*/}
                {/*蒙板*/}
                <div className="mengban"></div>

                <div className="mengban2"></div>
                {/*蒙板结束*/}


                {/*提交信息提示*/}
                <div className="error_box">
                    <p className="box_msg"></p>
                </div>

                <div className="success_box">
                    <p className="box_msg"></p>
                </div>
                {/*提交信息提示结束*/}

                {/*模态框*/}
                <div className="motai_window">
                    <div>
                        <div className="motai_box">
                            <p className="motai_p">志愿尚未提交，是否离开</p>
                            <div className="motai_button">
                                <div className="motai_sure">确认</div>
                                <div className="motai_cancel">取消</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*模态框结束*/}
            </div>
        );
    }
}

export default ChooseVol;