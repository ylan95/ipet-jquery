function cancel(){window.history.go(-1)}function getUrlPara(e){var t=window.location.search.substr(1),i=t.split("&"),n={};for(var a in i){var d=i[a].split("="),e=d[0];n[e]=d[1]}return n[e]?n[e]:void 0}function loginOut(){$.ajax({url:"http://localhost:8080/ipet/adminLogout",success:function(){window.location.href="http://localhost:8080/ipet/Admin/adminLogin.html"}})}function pagerFilter(e){"number"==typeof e.length&&"function"==typeof e.splice&&(e={total:e.length,rows:e});var t=$(this),i=t.datagrid("options"),n=t.datagrid("getPager");n.pagination({onSelectPage:function(a,d){i.pageNumber=a,i.pageSize=d,n.pagination("refresh",{pageNumber:a,pageSize:d}),t.datagrid("loadData",e)}}),e.originalRows||(e.originalRows=e.rows);var a=(i.pageNumber-1)*parseInt(i.pageSize),d=a+parseInt(i.pageSize);return e.rows=e.originalRows.slice(a,d),e}function endEditing(){return void 0==editIndex||!!$("#dg").datagrid("validateRow",editIndex)&&($("#dg").datagrid("endEdit",editIndex),editIndex=void 0,!0)}function BeginEdit(e){editIndex!=e&&(endEditing()?($("#dg").datagrid("selectRow",e).datagrid("beginEdit",e),editIndex=e):$("#dg").datagrid("selectRow",editIndex)),$("#dg").datagrid("beginEdit",e)}function endEditor(e){$("#dg").datagrid("endEdit",e),editIndex=void 0}function cancleEditor(e){$("#dg").datagrid("cancelEdit",e),editIndex=void 0}function initUserList(){$.ajax({url:"http://localhost:8080/ipet/returnAdminTypeServlet",type:"POST",success:function(e){var t=JSON.parse(e).adminType;3==t||4==t?$("#dg").datagrid({view:detailview,url:"http://localhost:8080/ipet/getUserPagerServlet",fitColumns:!0,striped:!0,rownumbers:!0,pagination:!0,title:"用户管理",toolbar:"#tb",loadFilter:pagerFilter,checkOnSelect:!0,columns:[[{field:"ck",checkbox:"true"},{field:"id",title:"ID",align:"center",width:"30px"},{field:"name",title:"用户名",align:"center",width:"90px"},{field:"email",title:"邮箱",align:"center",width:"140px"},{field:"trueName",title:"收件人",align:"center",width:"80px"},{field:"sex",title:"性别",align:"center",width:"30px"},{field:"birthday",title:"生日",align:"center",width:"100px"},{field:"address",title:"地址",align:"center",width:"180px"},{field:"postcode",title:"邮编",align:"center",width:"80px"},{field:"phone",title:"电话号码",align:"center",width:"90px"},{field:"mphone",title:"手机号码",align:"center",width:"100px"},{field:"flag4",align:"center",width:"60px",formatter:function(e,t){return"<a href='userUpdate.html?userid="+t.id+"'>修改</a>"}},{field:"flag5",align:"center",width:"60px",formatter:function(e,t){return"<a href='javascript:deleteUser("+t.id+")' >删除</a>"}}]],detailFormatter:function(e,t){return'<div style="padding:2px"><table class="det" id="ddv-'+e+'"></table></div>'},onExpandRow:function(e,t){$("#ddv-"+e).empty(),$("#ddv-"+e).append("<div><span class='tit'>密码：</span><span>"+t.password+"</span></div>"),$("#ddv-"+e).append("<div><span class='tit'>密保问题：</span><span>"+t.question+"</span></div>"),$("#ddv-"+e).append("<div><span class='tit'>密保答案：</span><span>"+t.answer+"</span></div>"),$("#ddv-"+e).append("<div><span class='tit'>积分：</span><span>"+t.score+"</span></div>"),$("span.tit").css({"font-weight":700,display:"inline-block",width:"70px",margin:"3px"}),$("#dg").datagrid("fixDetailRowHeight",e)}}):window.location.href="error.html"}})}function deleteUsers(){var e=[],t=$("#dg").datagrid("getSelections");if(t){for(var i=0;i<t.length;i++)e.push(t[i].id);deleteUser(e.toString())}else alert("请选中要删除的项目")}function deleteUser(e){if(window.confirm("确认删除用户？"))return void $.ajax({url:"http://localhost:8080/ipet/deleteUser",type:"POST",data:{ids:e},success:function(e){window.alert(e),window.location.reload(!0)}})}function DetailUserInit(){var e=getUrlPara("id"),t=parseInt(e);$.ajax({url:"http://localhost:8080/ipet/getUserPagerServlet",type:"POST",data:{id:t},success:function(e){var t=JSON.parse(e)[0];$("input[name=userID]").val(t.id),$("input[name=userName]").val(t.name),$("input[name=password]").val(t.password),$("input[name=email]").val(t.email),$("input[name=trueName]").val(t.trueName),$("input[name=sex]").val(t.sex),$("input[name=birthday]").val(t.birthday),$("input[name=address]").val(t.address),$("input[name=postcode]").val(t.postcode),$("input[name=phone]").val(t.phone),$("input[name=mphone]").val(t.mphone),$("input[name=question]").val(t.question),$("input[name=answer]").val(t.answer),$("input[name=score]").val(t.score)}})}function updateUser(){$.ajax({url:"http://localhost:8080/ipet/adminUpdateUserServlet",type:"POST",data:{userID:$("input[name=userID]").val(),userName:$("input[name=userName]").val(),password:$("input[name=password]").val(),email:$("input[name=email]").val(),trueName:$("input[name=trueName]").val(),sex:$("input[name=sex]").val(),birthday:$("input[name=birthday]").val(),address:$("input[name=address]").val(),postcode:$("input[name=postcode]").val(),phone:$("input[name=phone]").val(),mphone:$("input[name=mphone]").val(),question:$("input[name=question]").val(),answer:$("input[name=answer]").val(),score:$("input[name=score]").val()},success:function(e){alert(e),window.location.href="userManage.html"}})}function doSearch(){var e=$("#key").val();$("#dg").datagrid("load",{name:e}),$("#dg").datagrid("reload")}function reload(){$("#dg").datagrid("load",{})}function initOrderList(){$.ajax({url:"http://localhost:8080/ipet/returnAdminTypeServlet",type:"POST",success:function(e){var t=JSON.parse(e).adminType;2==t||4==t?$("#dg").datagrid({view:detailview,url:"http://localhost:8080/ipet/getOrderServlet",fitColumns:!0,striped:!0,rownumbers:!0,pagination:!0,title:"订单管理",toolbar:"#tb",loadFilter:pagerFilter,onDblClickCell:BeginEdit,checkOnSelect:!1,columns:[[{field:"ck",checkbox:"true"},{field:"orderId",title:"订单ID",width:30,align:"center"},{field:"name",title:"用户名",width:45,align:"center"},{field:"recvName",title:"收货人",width:40,align:"center",editor:"textbox"},{field:"address",title:"收货地址",width:200,align:"center",editor:"textbox"},{field:"postcode",title:"邮编",width:40,align:"center",editor:"text"},{field:"orderDate",title:"下单时间",width:120,align:"center"},{field:"flag",title:"",width:40,align:"center",formatter:function(e,t){return 0==e?"<a href='javascript:sendOrder("+t.orderId+")'>发货</a>":"<span>已完成</span>"}},{field:"flag1",width:40,align:"center",formatter:function(e,t,i){return"<a href='javascript:cancleEditor("+i+")'>取消</a>"}},{field:"flag2",width:40,align:"center",formatter:function(e,t,i){return"<a href='javascript:endEditor("+i+")'>提交修改</a>"}},{field:"flag4",width:40,align:"center",formatter:function(e,t){return"<a href='javascript:deleteOrder("+t.orderId+")' >删除</a>"}}]],onAfterEdit:function(e,t,i){$.isEmptyObject(i)?alert("您没有做修改"):$.ajax({url:"http://localhost:8080/ipet/updateOrderInfoServlet",type:"POST",data:{orderId:t.orderId,recvName:t.recvName,address:t.address,postcode:t.postcode},success:function(e){alert(e),window.location.reload(!0)}})},detailFormatter:function(e,t){return'<div class="ddv" style="padding:2px 20px"></div>'},onExpandRow:function(e,t){$(".ddv").datagrid({url:"http://localhost:8080/ipet/getOneOrderServlet?orderId="+t.orderId,fitColumns:!0,striped:!0,onDblClickCell:BeginEdit,columns:[[{field:"orderId",title:"订单项ID",width:70,align:"center"},{field:"goodsId",title:"商品ID",width:50,align:"center"},{field:"goodsTitle",title:"商品名称",width:100,align:"center"},{field:"nowPrice",title:"单价",width:50,align:"center",editor:"numberbox"},{field:"buyNum",title:"商品数量",width:70,align:"center",editor:"numberbox"}]],onLoadSuccess:function(){setTimeout(function(){$("#dg").datagrid("fixDetailRowHeight",e),$("#dg").datagrid("fixRowHeight",e)},10)}}),$("#dg").datagrid("fixDetailRowHeight",e)}}):window.location.href="error.html"}})}function deleteOrder(e){window.confirm("确认删除该订单？")&&$.ajax({url:"http://localhost:8080/ipet/deleteOrderServlet",type:"POST",data:{orderId:e},success:function(e){window.alert(e),window.location.reload(!0)}})}function deleteOrders(){var e=[],t=$("#dg").datagrid("getSelections");if(t){for(var i=0;i<t.length;i++){e.push(t[i].orderId);var n=e.join(",")}deleteOrder(n)}else alert("请选中要删除的项目")}function sendOrder(e){$.ajax({url:"http://localhost:8080/ipet/adminSendOrderServlet",type:"POST",data:{orderId:e},success:function(e){window.alert(e),window.location.reload(!0)}})}function doOrderSearch(){var e=$("#key").val();$("#dg").datagrid("load",{orderId:e}),$("#dg").datagrid("reload")}function seeAll(){$("#dg").datagrid("load",{})}function searchSendOrders(){$("#dg").datagrid("load",{flag:1}),$("#dg").datagrid("reload")}function searchNotSendOrders(){$("#dg").datagrid("load",{flag:0}),$("#dg").datagrid("reload")}function initInform(){$("#dg").datagrid({url:"http://localhost:8080/ipet/getInformServlet",fitColumns:!0,striped:!0,rownumbers:!0,pagination:!0,title:"公告管理",loadFilter:pagerFilter,toolbar:"#tb",onDblClickCell:BeginEdit,checkOnSelect:!1,columns:[[{field:"ck",checkbox:"true"},{field:"informId",title:"公告ID",width:60,align:"center"},{field:"informTitle",title:"公告标题",width:150,align:"center",editor:"textbox"},{field:"informContent",title:"公告内容",width:300,align:"center",editor:"textarea"},{field:"informTime",title:"发布时间",width:110,align:"center"},{field:"flag1",width:40,align:"center",formatter:function(e,t,i){return"<a href='javascript:cancleEditor("+i+")'>取消</a>"}},{field:"flag2",width:60,align:"center",formatter:function(e,t,i){return"<a href='javascript:endEditor("+i+")'>提交修改</a>"}},{field:"flag4",width:40,align:"center",formatter:function(e,t){return"<a href='javascript:deleteInform("+t.informId+")' >删除</a>"}}]],onAfterEdit:function(e,t,i){if($.isEmptyObject(i))alert("您没有做修改");else{var n=new Date,a=n.getFullYear(),d=n.getMonth(),r=n.getDate(),l=a+"-"+d+"-"+r;$.ajax({url:"http://localhost:8080/ipet/updateInformServlet",type:"POST",data:{informId:t.informId,informTitle:t.informTitle,informContent:t.informContent,informTime:l},success:function(e){alert(e),window.location.reload(!0)}})}}})}function doInformSearch(){var e=$("#key").val();$("#dg").datagrid("load",{informId:e}),$("#dg").datagrid("reload")}function deleteInform(e){alert(e),$.ajax({url:"http://localhost:8080/ipet/deleteInformServlet",type:"POST",data:{informId:e},success:function(e){window.alert(e),window.location.reload(!0)}})}function deleteInforms(){var e=[],t=$("#dg").datagrid("getSelections");if(t){for(var i=0;i<t.length;i++){e.push(t[i].informId);var n=e.join(",")}alert(n),deleteInform(n)}else alert("请选中要删除的项目")}function addInform(e){$.ajax({url:"http://localhost:8080/ipet/addInformServlet",type:"POST",data:{informTitle:$("input[name=informTitle]").val(),informContent:$("textarea[name=informContent]").val()},success:function(e){window.alert(e),window.location.href="informManage.html"}})}function initNoteList(){$("#dg").datagrid({url:"http://localhost:8080/ipet/getNoteServlet",fitColumns:!0,striped:!0,rownumbers:!0,pagination:!0,title:"留言管理",pageSize:10,loadFilter:pagerFilter,rownumbers:"true",columns:[[{field:"id",title:"留言ID",width:60,align:"center"},{field:"title",title:"标题",width:150,align:"center"},{field:"author",title:"作者",width:300,align:"center"},{field:"content",title:"内容",width:200,align:"center"},{field:"ly_time",title:"留言时间",width:200,align:"center"},{field:"flag4",width:100,align:"center",formatter:function(e,t){return"<a href='javascript:deleteNote("+t.id+")' >删除</a>"}}]]})}function deleteNote(e){$.ajax({url:"http://localhost:8080/ipet/deleteNoteServlet",type:"POST",data:{noteId:e},success:function(e){window.alert(e),window.location.reload(!0)}})}function initAdminList(){$.ajax({url:"http://localhost:8080/ipet/returnAdminTypeServlet",type:"POST",success:function(e){4==JSON.parse(e).adminType?$("#dg").datagrid({url:"http://localhost:8080/ipet/getAdminServlet",fitColumns:!0,striped:!0,rownumbers:!0,pagination:!0,title:"管理员管理",toolbar:"#tb",loadFilter:pagerFilter,columns:[[{field:"id",width:150,title:"管理员ID",align:"center"},{field:"adminType",width:150,title:"管理员类别",align:"center",formatter:function(e,t){switch(t.adminType){case 1:return"商品管理员";case 2:return"订单管理员";case 3:return"会员管理员";case 4:return"系统管理员"}}},{field:"loginName",width:200,title:"登录名",align:"center"},{field:"loginPwd",width:200,title:"密码",align:"center"},{field:"adminName",width:200,title:"管理员姓名",align:"center"},{field:"flag1",align:"center",formatter:function(e,t){return"<a href='adminUpdate.html?id="+t.id+"' >修改</a>"}},{field:"flag4",align:"center",formatter:function(e,t){return"<a href='javascript:deleteAdmin("+t.id+")' >删除</a>"}}]]}):window.location.href="error.html"}})}function deleteAdmin(e){window.confirm("确认删除管理员？")&&$.ajax({url:"http://localhost:8080/ipet/deleteAdmin",type:"POST",data:{adminIds:e},success:function(e){window.alert(e),window.location.reload(!0)}})}function seeGoodsAdmins(){$("#dg").datagrid("load",{adminType:1})}function seeOrdersAdmins(){$("#dg").datagrid("load",{adminType:2})}function seeUsersAdmins(){$("#dg").datagrid("load",{adminType:3})}function seeSystemAdmin(){$("#dg").datagrid("load",{adminType:4})}function doAdminSearch(){$("#dg").datagrid("load",{adminName:$("#key").val()}),$("#dg").datagrid("reload")}function addAdmin(){window.location.href="adminAdd.html"}function initGoodsList(){$.ajax({url:"http://localhost:8080/ipet/returnAdminTypeServlet",type:"POST",success:function(e){var t=JSON.parse(e).adminType;4==t||1==t?$("#dg").datagrid({url:"http://localhost:8080/ipet/GetGoodsServlet",fitColumns:!0,striped:!0,rownumbers:!0,pagination:!0,title:"商品管理",toolbar:"#tb",loadFilter:pagerFilter,onDblClickCell:BeginEdit,columns:[[{field:"goodsId",width:35,title:"商品ID",align:"center"},{field:"indexImg",width:45,title:"商品图片",align:"center",formatter:function(e,t){return"<img width=60px height:60px; src='../../img/"+t.indexImg+"' />"}},{field:"superTypeId",width:25,title:"大类ID",align:"center"},{field:"subTypeId",width:25,title:"小类ID",align:"center"},{field:"goodsTitle",width:90,title:"商品名称",align:"center",editor:"textbox"},{field:"introduce",width:130,title:"商品介绍",align:"center",editor:"textbox"},{field:"brandName",width:35,title:"品牌",align:"center",editor:"textbox"},{field:"price",width:25,title:"价格",align:"center",editor:"textbox"},{field:"nowPrice",width:25,title:"现价",align:"center",editor:"textbox"},{field:"goodsNum",width:20,title:"库存",align:"center",editor:"textbox"},{field:"key",width:80,title:"关键字",align:"center",editor:"textbox"},{field:"sale",width:20,title:"特价",align:"center",formatter:function(e,t){return t.sale?"是":"否"},editor:"textbox"},{field:"special",width:20,title:"推荐",align:"center",formatter:function(e,t){return t.special?"是":"否"},editor:"textbox"},{field:"flag1",width:20,align:"center",formatter:function(e,t,i){return"<a href='javascript:cancleEditor("+i+")'>取消</a>"}},{field:"flag2",width:40,align:"center",formatter:function(e,t,i){return"<a href='javascript:endEditor("+i+")'>提交修改</a>"}},{field:"flag4",width:20,align:"center",formatter:function(e,t){return"<a href='javascript:deleteGoods("+t.goodsId+")' >删除</a>"}}]],onAfterEdit:function(e,t,i){console.log(i),$.isEmptyObject(i)?alert("您没有做修改"):$.ajax({url:"http://localhost:8080/ipet/updateGoodsServlet",type:"POST",data:{goodsId:t.goodsId,goodsTitle:t.goodsTitle,introduce:t.introduce,brandName:t.brandName,price:t.price,nowPrice:t.nowPrice,goodsNum:t.goodsNum,key:t.key,sale:t.sale,special:t.special},success:function(e){alert(e),window.location.reload(!0)}})}}):window.location.href="error.html"}})}function getAdmin(){$.ajax({url:"http://localhost:8080/ipet/returnAdminTypeServlet",type:"POST",success:function(e){var t=JSON.parse(e).loginName;$(".admin span").html(t)}})}var editIndex=void 0;