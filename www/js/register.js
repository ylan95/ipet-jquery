function InputValidate(){var a=new RegExp("^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{3,16}$"),e=new RegExp("^(?![a-zA-z]+$)(?![0-9]+$)(?![!@#$%^&*]+$)[a-zA-Z0-9!@#$%^&*]{6,20}$"),s=new RegExp("^(?![a-zA-z]+$)(?![0-9]+$)(?![!@#$%^&*]+$)(?![a-zA-z0-9]+$)(?![a-zA-z!@#$%^&*]+$)(?![0-9!@#$%^&*]+$)[a-zA-Z0-9!@#$%^&*]+$"),t=new RegExp("^1[34578][0-9]{9}$");this.flag=[0,0,0,0,0];var l,n=this;this.usernameValidate=function(){var e=$("input[name=username]").val();""!=e&&a.test(e)?$.ajax({url:"http://localhost:8080/ipet/checkNameExist",data:{username:e},async:!1,type:"POST",success:function(a){parseInt(a)?($("input[name=username]").parent("div").addClass("success").removeClass("error"),n.flag[0]=1):($("input[name=username]").parent("div").addClass("error").removeClass("success"),$(".userTip").html("账户名已存在"),n.flag[0]=0)}}):($("input[name=username]").parent("div").addClass("error").removeClass("success"),this.flag[0]=0),this.allValidate()},this.pswValidate=function(){var a=$("input[name=psw]").val();$(".pswStrength b").removeClass("active"),""!=a&&e.test(a)?($("input[name=psw]").parent("div").addClass("success").removeClass("error"),this.flag[1]=1,a.length<=8&&$(".strength1").addClass("active"),a.length>8&&a.length<=13&&($(".strength1").addClass("active"),$(".strength2").addClass("active")),a.length>8&&s.test(a)&&($(".strength1").addClass("active"),$(".strength2").addClass("active"),$(".strength3").addClass("active"))):($("input[name=psw]").parent("div").addClass("error").removeClass("success"),this.flag[1]=0),this.allValidate()},this.confirmPsw=function(){var a=$("input[name=psw]").val(),e=$("input[name=psw2]").val();""!=e&&a===e?(this.flag[2]=1,$("input[name=psw2]").parent("div").addClass("success").removeClass("error")):(this.flag[2]=0,$("input[name=psw2]").parent("div").addClass("error").removeClass("success")),this.allValidate()},this.telValidate=function(){var a=$("input[name=tel]").val();""!=a?t.test(a)?(this.flag[3]=1,$("input[name=tel]").parent("div").addClass("success").removeClass("error")):($("input[name=tel]").parent("div").addClass("error").removeClass("success"),this.flag[3]=0):(this.flag[3]=0,$("input[name=tel]").parent("div").addClass("error").removeClass("success")),this.allValidate()},this.sendYZ=function(){if(this.telValidate(),l=parseInt(1e5*(Math.random()+1)),sRegNum=l.toString(),1==this.flag[3]){var a=$("input[name=tel]").val();$.ajax({url:"http://localhost:8080/ipet/sendMessageServlet",type:"POST",data:{phoneNum:a,regNum:sRegNum},success:function(a){console.log(a)},error:function(a){console.log(a)}})}},this.telyzValidate=function(){parseInt($("input[name=telYZ]").val())===l?(this.flag[4]=1,$("input[name=telYZ]").parent("div").addClass("success").removeClass("error")):(this.flag[4]=0,$("input[name=telYZ]").parent("div").addClass("error").removeClass("succces")),this.allValidate()},this.allValidate=function(){1==this.flag[0]&&1==this.flag[1]&&1==this.flag[2]&&1==this.flag[3]&&1==this.flag[4]&&$("input[name=read]").is(":checked")?$(".reg-btn").addClass("reg-able").removeAttr("disabled"):$(".reg-btn").removeClass("reg-able").attr("disabled","disabled")},this.read=function(){this.allValidate()}}function register(){$.ajax({url:"http://localhost:8080/ipet/register",data:{tel:$("input[name=tel]").val(),username:$("input[name=username]").val(),psw:$("input[name=psw]").val()},success:function(a){parseInt(a)?window.location.href="index.html":(alert("注册失败，再试一次吧"),window.location.reload(!0))}})}var inputValidate=new InputValidate;