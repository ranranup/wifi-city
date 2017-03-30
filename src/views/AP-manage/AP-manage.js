$(document).ready(function() {

    App.init();
    $.ajax({
        url: "/api/ap-manager/",
        type: "GET",
        dataType: "json",
        beforeSend: function() {
            //添加 loding 样式
            $("#loading").css("height", $(document).height());
            $("#loading").css("width", $(document).width());
            if ($(document).width() >= 880) {
                $("#loading").css("margin-left", 225);
            }
            $("#loadingimg").css("display", "block");
            $("#loading").show();
        },
        success: function(data) {
            $("#loading").hide(); //加载成功关闭loding
            data = data.ap;
            for (var i = 0; i < data.length; i++) {
                data[i]["操作"] = "<button  onclick='DeleteAp(event)'><img alt='delete'" +
                    " src='../../image/delete.png'></button><button onclick='EdictAp(event)'><img alt='edict'" +
                    "  src='../../image/edict.png'></button>";
                data[i]["详情"] = "<a href='#'>>></a>";
            }
            var cs = new table({
                "tableId": "cs_table", //必须
                "headers": ["编号", "AP_MAC", "经度", "位置信息", "纬度", "操作", "详情"], //必须
                "data": data, //必须
                "displayNum": 10, //必须   默认 10
                "groupDataNum": 9 //可选    默认 10
            });

        }
    })

});
//查找单个mac,并且将查找到的具体信息显示出来
function SearchAP() {
    $("#search_button").click(function() {
        $("#poi_name_label").css("display","none");
        $("#poi_name").css("display","none");
        var searchstring = $("#search_input").val();
        if(searchstring==""||searchstring==undefined){
            alert("请输入查询的MAC");
            return;
        }

        // console.log(data);
        $.ajax({
            url: "/api/ap-manager/search?mac=" + searchstring,
            type: "GET",
            dataType: "json",
            success: function(data) {
                console.log(data);
                var info = data.ap[0];
                $("#ap_id").val(info.ap_id);
                $("#ap_mac").val(info.ap_mac);
                $("#ap_lng").val(info.ap_lng);
                $("#ap_mac").val(info.ap_mac);
                $("#ap_lat").val(info.ap_lat);
                $("#ap_position").val(info.ap_position);
                $("#add_ap_save_button").hide();
                $(".add-ap>.head > span").text("所查找的AP信息");
                showMask();
                $(".add-ap").show();

            },
            error: function() {
                setTimeout(function() {
                    $(".alert-error").css("display", "none");
                }, 3000);
                $(".alert-error").css("display", "block");
            }
        })

    });
    //$("#search_input").val("");

}

function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();
}
function DeleteAp(event){
    showMask();
    $(".del-ap").show();
    var info = event.srcElement.parentElement.parentElement.parentElement.innerText.split("	");
    $("#delete_ap_confirm_button").click(function() {
        ConfirmDeleteAp(info[1]);
    })
}
function ConfirmDeleteAp(info) {
    //showMask();
    //$(".del-ap").show();
    //var info = event.srcElement.parentElement.parentElement.parentElement.innerText.split("	");
    //var send_data = {
    //    "mac": info[1]
    //};
    console.log(info);
    $.ajax({
        url: "/api/ap-manager/delap/",
        data: {"ap_mac":info},
        type: "POST",
        dataType: "json",
        success: function(data) {
            setTimeout(function() {
                $(".alert-success").css("display", "none");
            }, 3000);
            $(".alert-success").css("display", "block");
            location.reload();

            },
        error:function() {
            setTimeout(function() {
                $(".alert-error").css("display", "none");
            }, 3000);
            $(".alert-error").css("display", "block");

            console.log(data);
        }
    })
    console.log(info);
}

function EdictAp() {
    showMask();
    $("#add_ap_save_button").css("display","block");
    var info = event.srcElement.parentElement.parentElement.parentElement.innerText.split("	");
    $("#ap_id").val(info[0]);
    $("#ap_mac").val(info[1]);
    $("#ap_lng").val(info[2]);
    $("#ap_position").val(info[4]);
    $("#ap_lat").val(info[3]);
    $(".add-ap").show();
    $("#add_ap_save_button").click(function() {
        SaveAddAP();
    })
}

function AddAp() {
    $(".add-ap>.head > span").text("写入AP信息");
    $("#ap_id").css("display","none");
    $("#ap_id_label").css("display","none");
    showMask();
    $(".add-ap").show();
    $("#add_ap_save_button").click(function() {
        SaveAddAP();
    })
}

function CancelDeleteAp() {
    $("#mask").hide();
    $(".del-ap").hide();

}

function SaveAddAP() {
    var ap_id = $("#ap_id").val()==undefined?"":$("#ap_id").val();
    var ap_mac = $("#ap_mac").val().trim(" ");
    var ap_lng = $("#ap_lng").val();
    var ap_lat = $("#ap_lat").val();
    var poi_name = $("#poi_name").val();
    var ap_position = $("#ap_position").val();
    if (ap_mac == "" || ap_lng == "" || ap_lat == "" || poi_name == ""|| ap_position == "") {
        $(".add-ap_alert").css("display", "block");
        return;
    }
    var send_data = {
        "ap_id":ap_id,
        "ap_mac": ap_mac,
        "ap_poi": poi_name,
        "ap_position": ap_position,
        "ap_lng": ap_lng,
        "ap_lat": ap_lat
    };
    console.log(typeof send_data.ap_position);
    $.ajax({
        url: "/api/ap-manager/save/",
        data: send_data,
        type: "POST",
        dataType: "json",
        success: function(data) {
            setTimeout(function() {
                $(".alert-success").css("display", "none");
            }, 3000);
            $(".alert-success").css("display", "block");

            console.log(data);
        },
        error:function(){
            setTimeout(function() {
                $(".alert-error").css("display", "none");
            }, 3000);
            $(".alert-error").css("display", "block");
        }
    })
    $("#mask").hide();
    $(".add-ap").hide();
    $(".add-ap_alert").css("display", "none");

}

function CancelAddAp(divName) {
    $("#mask").hide();
    $(".add-ap").hide();
    //清空弹框中的内容
    $("#ap_lng").val("");
    $("#ap_mac").val("");
    $("#ap_lat").val("");
    $("#ap_position").val("");

}

/**
 * 抽象化表格
 */
function abstractTable() {
    // ---------内容属性
    this.id = null; // 每个表格都有唯一的一个id
    this.tableobj = null; //表格对象
    this.rowNum = 0; //行数
    this.colNum = 0; //列数
    this.header = []; //表头数据
    this.content = []; //body数据
    // ----------提供外部使用获得表格内部数据
    this.currentClickRowID = 0; //当前点击的行数据
    // --- 通过表头来获得这张表的列数
    this.getColNum = function() {
            this.colNum = this.header.length;
            return this.colNum;
        }
        // -----------  表格自我构建行为
    this.clearTable = function() {};
    this.showHeader = function() {};
    this.showContent = function(begin, end) {};
    this.showFoot = function() {};

    // --------- 分页功能属性
    this.allDataNum = 0; // 总数据条数
    this.displayNum = 10; // 每页显示条数
    this.maxPageNum = 0; // 最大页码值
    this.currentPageNum = 1; // 当前页码值
    //tfoot分页组
    this.groupDataNum = 10; //每组显示10页
    this.groupNum = 1; //当前组

    // -------- 分页功能行为
    this.paginationFromBeginToEnd = function(begin, end) {}
    this.first = function() {} //首页
    this.last = function() {} //最后一页
    this.prev = function() {} //上一页
    this.next = function() {} //下一页
    this.goto = function() {} //跳到某页

    // ----------- 表格初始化
    this.init = function(begin, end) {}

}

/*
 表格对象模板
 */
function tableTemplet(table_id) {
    abstractTable.call(this);
    this.id = table_id;

}
/**
 * 表格对象
 * @param options
 */
function table(options) {
    if (!options) {
        return;
    }
    if (!$.isPlainObject(options)) {
        return;
    }

    tableTemplet.call(this, options.tableId);
    //得到表格对象
    this.tableobj = $("#" + this.id);
    //清空表格内容
    this.clearTable = function() {
            this.tableobj.html(" ");
        }
        // 实现分页行为
    this.paginationFromBeginToEnd = function(x, y) {
        this.maxPageNum = Math.ceil(this.allDataNum / this.displayNum);
        var arrPage = [];
        for (var i = x; i < y; i++) {
            arrPage.push(this.content[i]);
        }
        return arrPage;
    }

    this.showHeader = function() {
            if (this.header != null) {
                var $thead = $("<thead>"),
                    $tr = $("<tr>"),
                    $th;
                for (var i = 0; i < this.colNum; i++) {
                    $th = $("<th>").html(this.header[i]);
                    $th.appendTo($tr);
                }
                $tr.appendTo($thead);
                $thead.appendTo(this.tableobj)
            }
        }
        //初始化tbody
    this.showContent = function(begin, end) {
            if (this.content != null) {
                var $tbody = $("<tbody>"),
                    $tr,
                    $td;
                var tempDaTa = this.paginationFromBeginToEnd(begin, end),
                    len = tempDaTa.length;
                // 循环创建行
                for (var i = 0; i < len; i++) {
                    $tr = $("<tr>").appendTo($tbody);
                    if (i % 2 == 1) {
                        $tr.addClass("evenrow");
                    }
                    // 循环创建列  取得对象中的键
                    for (var key in tempDaTa[i]) {
                        $td = $("<td>").html(tempDaTa[i][key]).appendTo($tr);
                    }
                }
                this.tableobj.append($tbody);
            }

        }
        //初始化tfoot
    this.showFoot = function() {
            var $tfoot = $("<tfoot>"),
                $tr = $("<tr>"),
                $td = $("<td>").attr("colspan", this.colNum).addClass("paging");
            $tr.append($td);
            $tfoot.append($tr);
            this.tableobj.append($tfoot);
            this.pagination($td);
        }
        //表格分页
    this.pagination = function(tdCell) {
            var $td = typeof(tdCell) == "object" ? tdCell : $("#" + tdCell);
            //首页
            var oA = $("<a/>");
            oA.attr("href", "#1");
            oA.html("首页");
            $td.append(oA);
            //上一页
            if (this.currentPageNum >= 2) {
                var oA = $("<a/>");
                oA.attr("href", "#" + (this.currentPageNum - 1));
                oA.html("上一页");
                $td.append(oA);
            }
            //普通显示格式
            if (this.maxPageNum <= this.groupDataNum) { // 10页以内 为一组
                for (var i = 1; i <= this.maxPageNum; i++) {
                    var oA = $("<a/>");
                    oA.attr("href", "#" + i);
                    if (this.currentPageNum == i) {
                        oA.attr("class", "current");
                    }
                    oA.html(i);
                    $td.append(oA);
                }
            } else { //超过10页以后（也就是第一组后）
                if (this.groupNum <= 1) { //第一组显示
                    for (var j = 1; j <= this.groupDataNum; j++) {
                        var oA = $("<a/>");
                        oA.attr("href", "#" + j);
                        if (this.currentPageNum == j) {
                            oA.attr("class", "current");
                        }
                        oA.html(j);
                        $td.append(oA);

                    }
                } else { //第二组后面的显示
                    var begin = (this.groupDataNum * (this.groupNum - 1)) + 1,
                        end,
                        maxGroupNum = Math.ceil(this.maxPageNum / this.groupDataNum);
                    if (this.maxPageNum % this.groupDataNum != 0 && this.groupNum == maxGroupNum) {
                        end = this.groupDataNum * (this.groupNum - 1) + this.maxPageNum % this.groupDataNum
                    } else {
                        end = this.groupDataNum * (this.groupNum);
                    }

                    for (var j = begin; j <= end; j++) {
                        var oA = $("<a/>");
                        oA.attr("href", "#" + j);
                        if (this.currentPageNum == j) {
                            oA.attr("class", "current");
                        }
                        oA.html(j);
                        $td.append(oA);
                    }
                }
            }
            //下一页
            if ((this.maxPageNum - this.currentPageNum) >= 1) {
                var oA = $("<a/>");
                oA.attr("href", "#" + (this.currentPageNum + 1));
                oA.html("下一页");
                $td.append(oA);
            }
            //尾页
            var oA = $("<a/>");
            oA.attr("href", "#" + this.maxPageNum);
            oA.html("尾页");
            $td.append(oA);

            var page_a = $td.find('a');
            var tempThis = this;

            page_a.unbind("click").bind("click", function() {
                var nowNum = parseInt($(this).attr('href').substring(1));

                if (nowNum > tempThis.currentPageNum) { //下一组
                    if (tempThis.currentPageNum % tempThis.groupDataNum == 0) {
                        tempThis.groupNum += 1;

                        var maxGroupNum = Math.ceil(tempThis.maxPageNum / tempThis.groupDataNum);
                        if (tempThis.groupNum >= maxGroupNum) {
                            tempThis.groupNum = maxGroupNum;
                        }
                    }
                }
                if (nowNum < tempThis.currentPageNum) { //上一组
                    if ((tempThis.currentPageNum - 1) % tempThis.groupDataNum == 0) {
                        tempThis.groupNum -= 1;
                        if (tempThis.groupNum <= 1) {
                            tempThis.groupNum = 1;
                        }
                    }
                }
                if (nowNum == tempThis.maxPageNum) { //直接点击尾页
                    var maxGroupNum = Math.ceil(tempThis.maxPageNum / tempThis.groupDataNum);
                    tempThis.groupNum = maxGroupNum;
                }
                if (nowNum == 1) {
                    var maxGroupNum = Math.ceil(tempThis.maxPageNum / tempThis.groupDataNum);
                    tempThis.groupNum = 1;
                }
                tempThis.currentPageNum = nowNum;


                tempThis.init((tempThis.currentPageNum - 1) * tempThis.displayNum,
                    tempThis.currentPageNum * tempThis.displayNum);
                return false;
            });
        }
        //初始化
    this.init = function(begin, end) {
        this.header = options.headers;
        this.colNum = this.header.length;
        this.content = options.data;
        this.allDataNum = this.content.length;
        if (options.displayNum) {
            this.displayNum = options.displayNum;
        }
        if (options.groupDataNum) {
            this.groupDataNum = options.groupDataNum;
        }
        this.clearTable();
        this.showHeader();
        this.showContent(begin, end);
        this.showFoot();
    }

    this.init(0, options.displayNum);
}