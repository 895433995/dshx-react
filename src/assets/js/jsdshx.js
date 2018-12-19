var texturl = '';
window.texturl = texturl;
function getajaxurl(baseurl,prefix,pramstring,obj) {

    var ajaxurl='';

    var purl='';

    var pramjson='';

    pramjson = getparm(prefix,pramstring,obj);

    purl = jsonpramtourlpram(pramjson);

    ajaxurl = baseurl + purl ;

    return ajaxurl;

}

function jsonpramtourlpram(pramjson) {

        var purl='';

        for (var pkey in pramjson) {

            var pvalue = pramjson[pkey];

            pkey = pkey.split('"').join('');

            purl += '&'+ encodeURIComponent(pkey) + "=" + encodeURIComponent(pvalue);
        }

        return purl;
}

function getparm(prefix,pramstring,obj) {

    var pramjson={};

    var arr = pramstring.split(',');

    $.each(arr, function (i, val) {

        var key = prefix + '-' + (val.toString());

        var value = obj.find("["+key+"]").attr(key+'');

        pramjson['"'+val+'"']=value;

    });


    return pramjson;
    //jsonpramtourlpram(pramjson);

   /* getajaxurl(baseurl,pramstring);*/
}

function analysisjson(result,prefix,ifList) {
    //result Json数据
    //prefix HTML属性前缀或者全名，ifList为false时,prefix为前缀
    //ifList=true,表示渲染列表页(循环)
    var data_attr = "";

    if(ifList){
        var i=0;
        for(var p in result){
            $("["+prefix+"]").eq(i).text(result[p]);
            i++;
        }
    }
    else {
        $.each(result,function (key,value) {

            data_attr = prefix+'-'+key;

            $("["+data_attr+"]").text(value);

        });
    }

}




function addURLParam(url,name,value){ //3个参数，要添加参数的url,参数的名称,参数的值
    url += (url.indexOf("?")==-1?"?":"&"); //判断url中是否有'?'
    url += encodeURIComponent(name)+"="+encodeURIComponent(value); //拼接
    return url;
}
/*var url = "example.php";
var json = {
    'name':111,
    'value':222,
    'key':333
};
for(var key in json){
    url = addURLParam(url,key,json[key]); //传参
}
console.log(url);*/

function numColor(numclass,max){
    var per = 0;
    max = parseInt(max);
    $(".cho-content .vol-des-count").each(function () {
        $(this).removeClass("on-color-1 on-color-2 on-color-4");
        per = parseInt($(this).text())/max;

        if (per<=1.0){
            $(this).addClass("on-color-1");
        }
        else if (per>1.0 && per<=1.5){
            $(this).addClass("on-color-2");
        }
        else {
            $(this).addClass("on-color-4");
        }
    });
}
//模态框弹出，阻止body滚动
function BodyUnscroll(){
    bodyScrollTop = $(".body").scrollTop();
    $("body").css({"height":"100%","overflow-y":"hidden"});
}

function BodyScroll(){
    $("body").css({"height":"auto","overflow-y":"visible"});
    $('body,html').animate({'scroll-top':bodyScrollTop},0);
}
$(document).ready(function () {

    max = parseInt($(".vol-list").attr("maxnum"));
    numColor("vol-list",max);
    var per = 0;
    $(".my-vol-content .vol-des-count").each(function () {
        $(this).removeClass("on-color-1 on-color-2 on-color-3");
        per = parseInt($(this).text())/max;

        if (per<=1.0){
            $(this).addClass("on-color-1");
        }
        else if (per>1.0 && per<=1.5){
            $(this).addClass("on-color-2");
        }
        else {
            $(this).addClass("on-color-3");
        }
    });

    $(function () {

        if($('#btn1').attr('t-fctj')=='1'){

            $('#btn1').attr('checked','checked');

        }else{
            $('#btn1').removeAttr('checked');
        }

    })
    //已选导师提交栏
    var if_open = false;
    $(".open").on('click',function () {
        if(if_open){
            $(".selected-tch-box").removeClass("selected-tch-box-show");
            $(this).children().eq(0).text("展开提交");
            $(this).children().eq(1).css("transform","rotate(0)");
            if_open = false;
            $('.selected-tch-box').css('z-index','');
            $(".mengban").removeClass("mengban-on");
            BodyScroll();
        }
        else {
            $(".selected-tch-box").addClass("selected-tch-box-show");
            $(this).children().eq(0).text("收起");
            $(this).children().eq(1).css("transform","rotate(180deg)");
            if_open = true;
            $(".mengban").addClass("mengban-on");
            BodyUnscroll();
        }
    });

    //导师信息面板

    //刷新
    $(".refresh").on('click',function () {
        var bmid = $('.bmid').val();
        var ajaxurl = texturl+"dshxxuesheng.php?action=refreshnum&bmid="+bmid;

        $.ajax({
            type: "get",
            url: ajaxurl,
            data: {},
            dataType:'json',
            success: function (result) {
                if (result.status=='success'){

                    analysisjson(result.data,"t",false);

                    numColor("vol-list",max);

                    $(".error_box").stop(true,true).fadeOut(0);
                    $(".success_box").stop(true,true).show().delay(1500).fadeOut();

                    $(".success_box .box_msg").text(result.msg);

                }else if(result.status=='failed'){

                    $(".success_box").stop(true,true).fadeOut(0);
                    $(".error_box .box_msg").text(result.msg);
                    $(".error_box").stop(true,true).show().delay(1500).fadeOut();

                }

            },
            error: function () {
                console.log('error');
            }
        });
    });


    //查看

    $(".check").on('click',function () {
        BodyUnscroll();

        var name =$(this).parent().parent().find($('.vol-des-name')).html();


        var dsid =$(this).parent().find('.check').attr('t-dsid');


        var pic = $(this).parent().parent().find($('.vol-des-icon')).html();

        $('.vol-selectBox .selected-dsid').val(dsid);

        $('.vol-selectBox .selected-dsname').val(name);

        $('.vol-selectBox .selected-dspic').val(pic);


        var bmid = $('.bmid').val();

        var ajaxurl = getajaxurl(texturl+"dshxxuesheng.php?action=daoshiview&bmid="+bmid,"t","dsid",$(this).parent().parent().parent());

        var select = $(this).next().next().html();
 	 
        $('.vol-choose').html(select);
        $.ajax({
            type: "get",
            url: ajaxurl,
            data: {},
            dataType:'json',
            success: function (result) {
            	
               if (result.status=='success'){
            	  
                    $(".vol-tch-detail").addClass("vol-tch-detail-show");
                    $(".mengban").addClass("mengban-on");
                    analysisjson(result.data,"data",false);
                    
                    if ($('[data-dsjswz]').text()!==""){
                    
                        $(this).parent().parent().css("dispaly","flex");
                        var dsjswz = $('[data-dsjswz]').text();
                        $('[data-dsjswz]').text('更多信息请点击');
                        $('[data-dsjswz]').attr('href',dsjswz);
                       

                    }else {
                    	
                       $(this).parent().parent().css("dispaly","none");

                    }


                }else if(result.status=='failed'){

                    if (result.errorcode=='001'){

                        window.location.href = 'daoshihuxuan.php';

                    }
                    else {
                        $(".success_box").stop(true,true).fadeOut(0);
                        $(".error_box").stop(true,true).show().delay(1500).fadeOut();
                        $(".error_box .box_msg").text(result.msg);
                    }
                }

            },
            error: function () {
                console.log('error');
            }
        });

    });


    function f1(){
        $('.mengban2').removeClass('mengban-on');
        $(".vol-selectBox").removeClass("vol-selectBox-show");
    }

    $(".vol-close").on('click',function () {
        $(".vol-tch-detail").removeClass("vol-tch-detail-show");
        $(".mengban").removeClass("mengban-on");
        BodyScroll();
    });

    $('.vol-choose').on('click',function () {
        $(".vol-selectBox").addClass("vol-selectBox-show");

        $('.mengban2').addClass('mengban-on');

        $('.vol-select-cancel').click(function(){
            f1();
        });

        $('.vol-select-sure').on('click',function () {
            $('.mengban2').removeClass('mengban-on');
            $(".vol-tch-detail").removeClass("vol-tch-detail-show");
        });



    });

    //选TA

    $(".cho-vol-item .select").on('click',function () {
        BodyUnscroll();

        var name =$(this).parent().parent().find($('.vol-des-name')).html();


        var dsid =$(this).parent().find('.check').attr('t-dsid');


        var pic = $(this).parent().parent().find($('.vol-des-icon')).html();

        $('.vol-selectBox .selected-dsid').val(dsid);

        $('.vol-selectBox .selected-dsname').val(name);

        $('.vol-selectBox .selected-dspic').val(pic);

        $(".vol-selectBox").addClass("vol-selectBox-show");

        $(".mengban").addClass("mengban-on");

    });

    var first = $(".first").attr("t-dyzydsid");
    var second = $(".second").attr("t-dezydsid");
    var third = $(".third").attr("t-dszydsid");

    $('.vol-item').each(function () {
        if ($(this).find('[t-dsid]').attr('t-dsid')==first){
            $(this).find('.select').text('修改');
        }else if ($(this).find('[t-dsid]').attr('t-dsid')==second){
            $(this).find('.select').html('修改');
        }else if ($(this).find('[t-dsid]').attr('t-dsid')==third){
            $(this).find('.select').html('修改');
        }
        else{
            $(this).find('.select').html('选TA');
        }
    });

    $(".vol-select-sure").on('click',function () {

        $('.submit_ok').attr('success','0');

        $(".selected-tch-box").addClass("selected-tch-box-show");

        $('.selected-tch-box').css('z-index','20');

        $('.open').children().eq(0).text("收起");
        $('.open').children().eq(1).css("transform","rotate(180deg)");
        if_open = true;


        $(".vol-selectBox").removeClass("vol-selectBox-show");

        $(".mengban").addClass("mengban-on");

        var zhiyuanid = $('.swiper-slide-active').attr('zhiyuan');

        var zy =  $($('.vol-box-item')[zhiyuan=zhiyuanid-1]);

        var selectdsid= $('.vol-selectBox .selected-dsid').val();

        var selectdsname= $('.vol-selectBox .selected-dsname').val();

        var selectdspic= $('.vol-selectBox .selected-dspic').val();

        if ($('.first').attr('t-dyzydsid')==selectdsid){
            $('.first').find($('.vol-tch-box-name')).html('待选');
            $('.first').find($('.vol-tch-box-img')).html('');
            $('.first').find($('.vol-tch-box-img')).html("<span>?</span>");
            $('.first').find($('.delete-icon')).css("display",'none');
            $('.first').attr('t-dyzydsid',"")
        }
        if ($('.second').attr('t-dezydsid')==selectdsid){
            $('.second').find($('.vol-tch-box-name')).html('待选');
            $('.second').find($('.vol-tch-box-img')).html('');
            $('.second').find($('.vol-tch-box-img')).html("<span>?</span>");
            $('.second').find($('.delete-icon')).css("display",'none');
            $('.second').attr('t-dezydsid','')
        }
        if ($('.third').attr('t-dszydsid')==selectdsid){
            $('.third').find($('.vol-tch-box-name')).html('待选');
            $('.third').find($('.vol-tch-box-img')).html('');
            $('.third').find($('.vol-tch-box-img')).html("<span>?</span>");
            $('.third').find($('.delete-icon')).css("display",'none');
            $('.third').attr('t-dszydsid','')
        }

        zy.find($('.delete-icon')).css('display','block');

        zy.find($('.vol-tch-box-name')).html(selectdsname);

        zy.find($('.vol-tch-box-img')).html(selectdspic);

        if (zhiyuanid==1){
            zy.attr('t-dyzydsid',selectdsid);
        }else if(zhiyuanid==2){
            zy.attr('t-dezydsid',selectdsid);
        }else if(zhiyuanid==3){
            zy.attr('t-dszydsid',selectdsid);
        }

        first = $(".first").attr("t-dyzydsid");
        second = $(".second").attr("t-dezydsid");
        third = $(".third").attr("t-dszydsid");

        $('.vol-item').each(function () {
            if ($(this).find('[t-dsid]').attr('t-dsid')==first){
                $(this).find('.select').text('修改');
            }else if ($(this).find('[t-dsid]').attr('t-dsid')==second){
                $(this).find('.select').html('修改');
            }else if ($(this).find('[t-dsid]').attr('t-dsid')==third){
                $(this).find('.select').html('修改');
            }
            else{
                $(this).find('.select').html('选TA');
            }
        });

    });



    //删除
    $(".delete-icon").on('click',function () {

        $('.submit_ok').attr('success','0');

        $(this).parent().find($('.vol-tch-box-name')).html('待选');
        $(this).parent().find($('.vol-tch-box-img')).html('');
        $(this).parent().find($('.vol-tch-box-img')).html("<span>?</span>");
        $(this).css("display",'none');
        if($(this).parent().parent().index()==0){

            var id = $(this).parent().parent().attr('t-dyzydsid');
            $('.vol-item').each(function () {
                if($(this).find('[t-dsid]').attr('t-dsid')==id){

                    $(this).find('.select').html('选TA');
                }
            });
            $(this).parent().parent().attr('t-dyzydsid','');
        }else if ($(this).parent().parent().index()==1){
            var id = $(this).parent().parent().attr('t-dezydsid');
            $('.vol-item').each(function () {
                if($(this).find('[t-dsid]').attr('t-dsid')==id){

                    $(this).find('.select').html('选TA');
                }
            });
            $(this).parent().parent().attr('t-dezydsid','');
        }else if ($(this).parent().parent().index()==2){

            var id = $(this).parent().parent().attr('t-dszydsid');
            $('.vol-item').each(function () {
                if($(this).find('[t-dsid]').attr('t-dsid')==id){

                    $(this).find('.select').html('选TA');
                }
            });
            $(this).parent().parent().attr('t-dszydsid','');
        }



    });

    $(".vol-select-cancel").on('click',function () {
        if (!$('.vol-tch-detail').hasClass('vol-tch-detail-show')){
            $(".vol-selectBox").removeClass("vol-selectBox-show");
            $(".mengban").removeClass("mengban-on");
            BodyScroll();
        }

    });

    $(".mengban").on('click',function () {
        $(this).removeClass("mengban-on");

        $(".vol-selectBox").removeClass("vol-selectBox-show");
        $(".selected-tch-box").removeClass("selected-tch-box-show");
        $(".open").children().eq(0).text("展开提交");
        $(".jt-icon").css("transform","rotate(0)");
        BodyScroll();
        if_open=false;

    });
    $(".vol-tch-detail").click(function (e) {
        var target  = $(e.target);
        if(target.closest(".vol-tch-detail-show>div").length == 0){
        	BodyScroll();
            $(this).removeClass("vol-tch-detail-show");
            $(".mengban").removeClass("mengban-on");
        }
    });

    $('#btn1').click(function () {

        var c;
        if ($("#btn1").get(0).checked){
            c=1;
        }else{
            c=0;
        }
        $(this).attr('t-fctj',c);

        $('.submit_ok').attr('success','0');
    });


    $('.error_box').on('click',function () {
        $(this).stop(true,true).fadeOut(0);
    });

    var first1;
    var second1 ;
    var third1 ;
    var fctj1;
    var unit;
    $('.cho-submit').on('click',function () {
        first1 = $('.first').attr('t-dyzydsid');
        second1 = $('.second').attr('t-dezydsid');
        third1 = $('.third').attr('t-dszydsid');
        fctj1 = $('#btn1').attr('t-fctj');
        first1==''?first1=0:first1=first1;
        second1==''?second1=0:second1=second1;
        third1==''?third1=0:third1=third1;

        unit = first1+","+second1+","+third1+","+fctj1;
        var zydsidStr = $('.zydsidStr').val();

        if (unit==zydsidStr){
            $('.success_box').stop(true,true).fadeOut(0);
            $('.error_box .box_msg').text('请勿重复提交');

            $('.error_box').stop(true,true).show().delay(1500).fadeOut();

        }
        else{

            if($("[t-dyzydsid]").attr('t-dyzydsid')==''){

                $(".success_box").stop(true,true).fadeOut(0);
                $('.error_box .box_msg').text('第一志愿不能为空');

                $('.error_box').stop(true,true).show().delay(1500).fadeOut();

                $('.submit_ok').attr('success',0);

            }else{


                $('.submit_ok').attr('success',1);

                var bmid = $('.bmid').val();

                var ajaxurl = getajaxurl(texturl+"dshxxuesheng.php?action=zhiyuanconfirm&bmid="+bmid,"t","dyzydsid,dezydsid,dszydsid,fctj",$(this).parent().parent());


                $.ajax({
                    type: "get",
                    url: ajaxurl,
                    data: {},
                    dataType:'json',
                    success: function (result) {

                        if (result.status=='success'){

                            first1 = $('.first').attr('t-dyzydsid');
                            second1 = $('.second').attr('t-dezydsid');
                            third1 = $('.third').attr('t-dszydsid');
                            fctj1 = $('#btn1').attr('t-fctj');
                            first1==''?first1=0:first1=first1;
                            second1==''?second1=0:second1=second1;
                            third1==''?third1=0:third1=third1;

                            $('.zydsidStr').val(first1+","+second1+","+third1+","+fctj1);

                            $(".error_box").stop(true,true).fadeOut(0);
                            $('.success_box .box_msg').text(result.msg);

                            $('.success_box').stop(true,true).show().delay(1500).fadeOut();

                        }else if(result.status=='failed'){


                            if (result.errorcode=='001'){

                                window.location.href = 'daoshihuxuan.php';

                            }else{
                                $(".success_box").stop(true,true).fadeOut(0);
                                $('.error_box .box_msg').text(result.msg);

                                $('.error_box').stop(true,true).show().delay(1500).fadeOut();
                            }
                        }



                    },
                    error: function () {
                        console.log('error');
                    }
                });

            }

        }


    });

   $('.wap-body a').on('click',function (e) {
       console.log($(this).attr('href'));

       var h = $(this).attr('href');



       if ($('.submit_ok').attr('success')=='0') {
           e.preventDefault();

           $('.motai_window').addClass('motai_show');
           $('.mengban').addClass('mengban-on');
       }
      $('.motai_cancel').on('click',function () {
           $('.submit_ok').attr('success','0');

           $(".selected-tch-box").addClass("selected-tch-box-show");

           $('.selected-tch-box').css('z-index','20');

           $('.open').children().eq(0).text("收起");
           $('.open').children().eq(1).css("transform","rotate(180deg)");
      
           if_open = true;

           $('.motai_window').removeClass('motai_show');

       });
       
       $('.motai_sure').on('click',function () {
           $('.motai_window').removeClass('motai_show');

           window.location.href=h;
       })


   });

    $(function () {

        $('.vol-item').each(function () {
            $(this).attr('sszyhfl');


            if((!($(this).attr('sszyhfl') =='101'))&&(!($(this).attr('sszyhfl') =='102'))){
               $(this).addClass('vol-item-see');
            }

        });



        $('.cho-head-item').on('click',function () {
			$('html,body').animate({ 'scrollTop': 0 }, 0);


            $('.cho-head-item').removeClass('on-border-1');

            $(this).addClass('on-border-1');

            var a=$(this).index();


            if(a==0){


                $('.vol-item').each(function () {

                    if((!($(this).attr('sszyhfl') =='101'))&&(!($(this).attr('sszyhfl') =='102'))){
                        $(this).addClass('vol-item-see');
                    }else{
                        $(this).removeClass('vol-item-see');
                    }

                })

            }
            else if(a==1){
                $('.vol-item').each(function () {

                    $(this).attr('sszyhfl');

                    if((($(this).attr('sszyhfl') =='101'))){
                        $(this).addClass('vol-item-see');
                    }else{
                        $(this).removeClass('vol-item-see');
                    }
                })


            }
            else if(a==2){

                $('.vol-item').each(function () {

                    $(this).attr('sszyhfl');

                    if((($(this).attr('sszyhfl') =='102'))){
                        $(this).addClass('vol-item-see');
                    }else{
                        $(this).removeClass('vol-item-see');
                    }
                })

            }


        })


    });

    //头部文字滚动
    $(function () {
        var txtHeight = $(".msg-head-dex>p").height();//文字高度
        var divHeight = $(".msg-head-dex").height();  //容器高度
        var data_dpr = Number($("html").attr('data-dpr'));
        var speed = data_dpr * 4;
        if (txtHeight>divHeight){
            var txt = $(".msg-head-dex").text();
            $(".msg-head-dex").html("<marquee direction=left scrollamount="+speed+">"+txt+"</marquee>");
        }
    });

});