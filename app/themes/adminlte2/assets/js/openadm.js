function oa_build_top_menu() {
    var top_menu_html = "";
    if(typeof OA_Menus == "object" ){
        for(var i in OA_Menus){
            var top_menu = OA_Menus[i];
            if(top_menu.content.cfg_pid == 0){//说明是顶部菜单
                if(typeof top_menu.items == "object"){//说明有子菜单
                    top_menu_html += '<li><a data-id="'+top_menu.content.id+'" href="#">'+top_menu.content.cfg_comment+'</a></li>';
                    OA_Menus[top_menu.content.id] = top_menu.items;
                }else{
                    top_menu_html += '<li><a data-id="'+top_menu.content.id+'" data-label="'+top_menu.content.cfg_comment+'" href="#" data-url="'+top_menu.content.value.url+'" >'+top_menu.content.cfg_comment+'</a></li>';
                }

            }
        }
        if(top_menu_html != ""){
            top_menu_html = '<ul class="nav navbar-nav" id="topmenu">'+top_menu_html+'</ul>';
        }
    }
    if(top_menu_html!=""){
        $('#navbar-collapse').html(top_menu_html);
    }
    oa_top_menu_click();
}
function oa_build_left_menu(el) {
    oa_topmenu_change_active(el);
    var topmenu_id = $(el).data('id');
    if(typeof OA_Menus == "object"){
        if(typeof OA_Menus[topmenu_id] == "object"){
            var currentLeftMenuItems = OA_Menus[topmenu_id];
            var sidebar_html = '<ul class="sidebar-menu">';
            for(var i in currentLeftMenuItems){
                if(typeof currentLeftMenuItems[i].items == "undefined"){
                    sidebar_html += '<li class="treeview"><a class="openlink" data-label="'+currentLeftMenuItems[i].content.cfg_comment+'" data-id="'+currentLeftMenuItems[i].content.id+'" href="'+currentLeftMenuItems[i].content.value.url+'"><i class="'+currentLeftMenuItems[i].content.value.icon+'"></i> <span>'+currentLeftMenuItems[i].content.cfg_comment+'</span>';
                    sidebar_html += '</a>';
                }else{
                    sidebar_html += '<li class="treeview"><a data-label="'+currentLeftMenuItems[i].content.cfg_comment+'" data-id="'+currentLeftMenuItems[i].content.id+'" href="'+currentLeftMenuItems[i].content.value.url+'"><i class="'+currentLeftMenuItems[i].content.value.icon+'"></i> <span>'+currentLeftMenuItems[i].content.cfg_comment+'</span>';
                    sidebar_html += '<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i> </span></a>';
                    var subLeftMenuItems = currentLeftMenuItems[i].items;
                    sidebar_html += '<ul class="treeview-menu">';
                    for(var j in subLeftMenuItems){
                        sidebar_html += '<li><a class="openlink" data-label="'+subLeftMenuItems[j].content.cfg_comment+'" data-id="'+subLeftMenuItems[j].content.id+'" href="'+subLeftMenuItems[j].content.value.url+'"><i class="'+ ( typeof subLeftMenuItems[j].content.value.icon == "undefined" ? "fa  fa-angle-right" : subLeftMenuItems[j].content.value.icon) +'"></i> '+subLeftMenuItems[j].content.cfg_comment+'</a></li>'
                    }
                    sidebar_html += '</ul>';
                }
                sidebar_html += '</li>';
            }
            sidebar_html += '</ul>';
            $('.sidebar').html(sidebar_html);
        }
    }
    initOpenAdmMenusEvents();
    return false;
}

function oa_topmenu_change_active(el) {
    $(el).parent().parent().find('li').removeClass("active");
    $(el).parent().addClass("active");
}

function stopPropagation(e) {
    e = e || window.event;
    if(e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
}

function oa_top_menu_click() {

    $('#topmenu a').each(function (index,el) {
        $(el).click(function (e) {
            var url = $(el).data('url');
            if(typeof url != "undefined"){
                oa_open_window(el);
            }else{
                oa_build_left_menu(el);
            }
            $('#topmenu li').removeClass('active');
            $(el).parent().addClass('active');
            return false;
        })
    })
}

function oa_open_window(el) {
    var iframe_min_height = 550;
    var tab_box    = $('#tab_box');
    var tabnav_box = $('#tab_nav');

    var body_height    = $('body').outerHeight();
    var header_height  = $('.main-header').outerHeight();
    var footer_height  = $('.main-footer').outerHeight();

    var id = $(el).data('id');
    var url   = $(el).attr('href');
    if(url=="#"){
        url = $(el).data('url');
    }
    var label = $(el).data('label');

    //判断tab是否已经存在
    if($('#tab_nav_'+id).length==0) {
        //create tab nav
        var tab_nav = $('<li data-id="'+id+'"  id="tab_nav_'+id+'" class="active"><a href="#tab_'+id+'" data-toggle="tab">'+label+' <i class="fa fa-remove" tabclose="20000" onclick="oa_tab_close('+id+')"></i></a></li>');
        tabnav_box.append(tab_nav);
        //create content
        var tab = $('<div class="tab-pane active" id="tab_'+id+'"></div>');
        tab_box.append(tab);
        var iframe = $('<iframe id="iframe_'+id+'" width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="auto" allowtransparency="yes" src="" />');
        $('#tab_'+id).html(iframe);
        $("#iframe_"+id).attr('src',url);
        //添加完tab后才能获取其height
        var tab_nav_height = $('#tab_nav').outerHeight();
        var iframe_height  = body_height - header_height - tab_nav_height - footer_height;
        if(iframe_height < iframe_min_height){
            iframe_height = iframe_min_height;
        }
        $("#iframe_"+id).attr('height',iframe_height);
        oa_tab_context_menu(tab_nav);
    }
    oa_setTabActiveById(id);
    return false;
}

function initOpenAdmMenusEvents() {

    $('.openlink').each(function (index,el) {
        $(el).click(function (e) {
            oa_open_window(el);
            return false;
        });//end click

    });
}

function oa_setTabActiveById(id) {
    //切换active为当前的tab
    $('#tab_nav li').removeClass('active');
    $('#tab_nav_'+id).addClass('active');
    //tab content
    $('#tab_box div').removeClass('active');
    $('#tab_'+id).addClass('active');
}

function resizeIFramesSize() {
    var body_height    = $('body').outerHeight();
    var header_height  = $('.main-header').outerHeight();
    var footer_height  = $('.main-footer').outerHeight();
    var tab_nav_height = $('#tab_nav').outerHeight();
    var iframe_height  = body_height - header_height - tab_nav_height - footer_height;
    $("iframe").attr('height',iframe_height);
}

function oa_tab_close(id) {
    var tabnavbid = '#tab_nav_'+id;
    var tabid    = '#tab_'+id;

    var next = $(tabnavbid).next();
    var prev = $(tabnavbid).prev();
    if(next.length>0){
        oa_setTabActiveById($(next).data('id'));
    }else{
        if(prev.length>0){
            oa_setTabActiveById($(prev).data('id'));
        }
    }

    $(tabid).remove();
    $(tabnavbid).remove();
}

function oa_tab_context_menu(el) {
    var id = $(el).data('id');
    $(el).contextMenu('tabmenu',{
        bindings:{
            'refresh':function (t) {
                oa_setTabActiveById(id);
                var url = $('#iframe_'+id).attr("src")+"?t="+new Date().getTime();
                $('#iframe_'+id).attr("src",url);
                $("div#tabmenu").hide();
            },
            'cancel': function(t) {
                $("div#tabmenu").hide();
            },
            'closeSelf':function(t){
                oa_tab_close(id);
            },
            'closeAll':function(t){
                $('#tab_nav').empty();
                $('#tab_box').empty();
            },
            'closeOther':function(t){
                $('#tab_nav li').each(function(i,o){
                    var oid = $(o).data('id');
                    if(oid != id){
                        oa_tab_close(oid);
                    }
                });
            },
            'closeLeft':function(t){
                $('#tab_nav_'+id).prevAll().remove();
                $('#tab_'+id).prevAll().remove();
                oa_setTabActiveById(id);
            },
            'closeRight':function(t){
                $('#tab_nav_'+id).nextAll().remove();
                $('#tab_'+id).nextAll().remove();
                oa_setTabActiveById(id);
            }
        }
    });
}

function oa_update_menu(delMenuId)
{
    //如果是删除菜单的操作,则需要关闭相应的tab window
    if(typeof delMenuId == "number")oa_tab_close(delMenuId);

    //记录当前的top menu的active状态
    var activeLi = $('#topmenu li.active');
    var activeMenuId = 0;
    if(activeLi.length>0){
        activeMenuId = parseInt($(activeLi).find('a').data('id'));
    }
    //请求后台,获取最新的菜单数据
    $.get('/dashboard/index',function (data) {
        $('body').append(data);
        oa_build_top_menu();
        var hasFoundOldMenu = false;
        $('#topmenu a').each(function (i,el) {
            if(activeMenuId == $(el).data('id')){
                $(el).click();
                hasFoundOldMenu = true;
            }
        });
        if(!hasFoundOldMenu){
            $("#topmenu").find("li:first a").click();
        }
    });
}