(self.webpackChunksmart=self.webpackChunksmart||[]).push([[9348],{9348:function(e,t,s){"use strict";s.r(t),s.d(t,{MessageModule:function(){return Y}});var i=s(61116),a=s(33919),r=s(17647),o=s(12031),l=s(16184),n=s(77307),c=s(84369),g=s(97070),u=s(13070),d=s(9550),Z=s(63589),m=s(13841),p=s(31041),A=s(1325),h=s(35729),T=s(35366),q=s(91681),f=s(529),S=s(42693);let b=(()=>{class e{constructor(e){this.http=e}getMessageList(){return this.http.get(`${f.N.apiUrl}/webRoutes/getMessageList`).pipe((0,q.U)(e=>e))}getMessageDetails(){return this.http.get(`${f.N.apiUrl}/webRoutes/getMessageDetails`).pipe((0,q.U)(e=>e))}checkMessagetExists(e){return this.http.post(`${f.N.apiUrl}/webRoutes/checkMessagetExists`,{msg_status:e}).pipe((0,q.U)(e=>e))}setMessageDetails(e){return this.http.post(`${f.N.apiUrl}/webRoutes/setMessageDetails`,{msgData:e}).pipe((0,q.U)(e=>e))}updateMessageDetails(e){return this.http.post(`${f.N.apiUrl}/webRoutes/updateMessageDetails`,{msgData:e}).pipe((0,q.U)(e=>e))}deleteMessageDetails(e){return this.http.post(`${f.N.apiUrl}/webRoutes/deleteMessageDetails`,{msgData:e}).pipe((0,q.U)(e=>e))}}return e.\u0275fac=function(t){return new(t||e)(T.LFG(S.eN))},e.\u0275prov=T.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var E=s(24486),M=s(50518),v=s(31269),x=s(87064),L=s(60649);function _(e,t){if(1&e){const e=T.EpF();T.TgZ(0,"span"),T.TgZ(1,"button",33),T.NdJ("click",function(){const t=T.CHM(e),s=t.row,i=t.rowIndex,a=T.oxw(),r=T.MAs(46);return a.editRow(s,i,r)}),T.TgZ(2,"mat-icon",34),T._uU(3,"edit "),T.qZA(),T.qZA(),T.TgZ(4,"button",35),T.NdJ("click",function(){const t=T.CHM(e),s=t.row,i=t.rowIndex,a=T.oxw(),r=T.MAs(48);return a.deleteRow(s,i,r)}),T.TgZ(5,"mat-icon",36),T._uU(6,"delete "),T.qZA(),T.qZA(),T.qZA()}}function U(e,t){if(1&e&&(T.TgZ(0,"mat-option",58),T._uU(1),T.qZA()),2&e){const e=t.$implicit;T.Q6J("value",e.id),T.xp6(1),T.hij(" ",e.status," ")}}function w(e,t){1&e&&(T.TgZ(0,"mat-error"),T._uU(1),T.ALo(2,"translate"),T.qZA()),2&e&&(T.xp6(1),T.hij(" ",T.lcZ(2,1,"MESSAGE.LIST.MESSAGE-ENG")," is required "))}function N(e,t){1&e&&(T.TgZ(0,"mat-error"),T._uU(1),T.ALo(2,"translate"),T.qZA()),2&e&&(T.xp6(1),T.hij(" ",T.lcZ(2,1,"MESSAGE.LIST.MESSAGE-MALAY")," is required "))}function y(e,t){if(1&e){const e=T.EpF();T.TgZ(0,"div",37),T.TgZ(1,"h4",38),T.TgZ(2,"div",39),T.TgZ(3,"div",40),T.TgZ(4,"div",41),T._uU(5),T.ALo(6,"translate"),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.TgZ(7,"button",42),T.NdJ("click",function(){return T.CHM(e).$implicit.dismiss()}),T.TgZ(8,"span",43),T.TgZ(9,"i",44),T._uU(10,"close"),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.TgZ(11,"div",45),T.TgZ(12,"form",46),T.NdJ("ngSubmit",function(){return T.CHM(e),T.oxw().setMessageDetails()}),T.TgZ(13,"div",5),T.TgZ(14,"div",47),T.TgZ(15,"mat-form-field",48),T.TgZ(16,"mat-label"),T._uU(17),T.ALo(18,"translate"),T.qZA(),T.TgZ(19,"mat-select",49),T.NdJ("selectionChange",function(){return T.CHM(e),T.oxw().checkMessagetExists()}),T.YNc(20,U,2,2,"mat-option",50),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.TgZ(21,"div",5),T.TgZ(22,"div",47),T.TgZ(23,"mat-form-field",48),T.TgZ(24,"mat-label"),T._uU(25),T.ALo(26,"translate"),T.qZA(),T._UZ(27,"textarea",51),T.TgZ(28,"mat-icon",52),T._uU(29,"message"),T.qZA(),T.YNc(30,w,3,3,"mat-error",53),T.qZA(),T.qZA(),T.TgZ(31,"div",47),T.TgZ(32,"mat-form-field",48),T.TgZ(33,"mat-label"),T._uU(34),T.ALo(35,"translate"),T.qZA(),T._UZ(36,"textarea",54),T.TgZ(37,"mat-icon",52),T._uU(38,"message"),T.qZA(),T.YNc(39,N,3,3,"mat-error",53),T.qZA(),T.qZA(),T.qZA(),T.TgZ(40,"div",5),T.TgZ(41,"div",55),T.TgZ(42,"button",56),T._uU(43),T.ALo(44,"translate"),T.qZA(),T.TgZ(45,"button",57),T.NdJ("click",function(){return T.CHM(e).$implicit.close()}),T._uU(46),T.ALo(47,"translate"),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.qZA()}if(2&e){const e=T.oxw();T.xp6(5),T.hij(" ",T.lcZ(6,11,"MESSAGE.TITLE"),""),T.xp6(7),T.Q6J("formGroup",e.addMessageForm),T.xp6(5),T.Oqu(T.lcZ(18,13,"MESSAGE.LIST.MESSAGE-TYPE")),T.xp6(3),T.Q6J("ngForOf",e.messageList),T.xp6(5),T.Oqu(T.lcZ(26,15,"MESSAGE.LIST.MESSAGE-ENG")),T.xp6(5),T.Q6J("ngIf",e.addMessageForm.get("message_english").hasError("required")),T.xp6(4),T.Oqu(T.lcZ(35,17,"MESSAGE.LIST.MESSAGE-MALAY")),T.xp6(5),T.Q6J("ngIf",e.addMessageForm.get("message_malay").hasError("required")),T.xp6(3),T.Q6J("disabled",!e.addMessageForm.valid),T.xp6(1),T.Oqu(T.lcZ(44,19,"BUTTON.ADD-BTN")),T.xp6(3),T.Oqu(T.lcZ(47,21,"BUTTON.CANCEL-BTN"))}}function D(e,t){if(1&e&&(T.TgZ(0,"mat-option",58),T._uU(1),T.qZA()),2&e){const e=t.$implicit;T.Q6J("value",e.id),T.xp6(1),T.hij(" ",e.status," ")}}function C(e,t){1&e&&(T.TgZ(0,"mat-error"),T._uU(1),T.ALo(2,"translate"),T.qZA()),2&e&&(T.xp6(1),T.hij(" ",T.lcZ(2,1,"MESSAGE.LIST.MESSAGE-ENG")," is required "))}function k(e,t){1&e&&(T.TgZ(0,"mat-error"),T._uU(1),T.ALo(2,"translate"),T.qZA()),2&e&&(T.xp6(1),T.hij(" ",T.lcZ(2,1,"MESSAGE.LIST.MESSAGE-MALAY")," is required "))}function I(e,t){if(1&e){const e=T.EpF();T.TgZ(0,"div",37),T.TgZ(1,"h4",38),T.TgZ(2,"div",39),T.TgZ(3,"div",40),T.TgZ(4,"div",41),T._uU(5),T.ALo(6,"translate"),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.TgZ(7,"button",42),T.NdJ("click",function(){return T.CHM(e).$implicit.dismiss("Cross click")}),T.TgZ(8,"span",43),T.TgZ(9,"i",44),T._uU(10,"close"),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.TgZ(11,"div",45),T.TgZ(12,"form",59),T.NdJ("ngSubmit",function(){return T.CHM(e),T.oxw().updateMessageDetails()}),T.TgZ(13,"div",60),T._UZ(14,"input",61),T.qZA(),T.TgZ(15,"div",5),T.TgZ(16,"div",47),T.TgZ(17,"mat-form-field",48),T.TgZ(18,"mat-label"),T._uU(19),T.ALo(20,"translate"),T.qZA(),T.TgZ(21,"mat-select",49),T.NdJ("selectionChange",function(){return T.CHM(e),T.oxw().checkRetestExists()}),T.YNc(22,D,2,2,"mat-option",50),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.TgZ(23,"div",5),T.TgZ(24,"div",47),T.TgZ(25,"mat-form-field",48),T.TgZ(26,"mat-label"),T._uU(27),T.ALo(28,"translate"),T.qZA(),T._UZ(29,"textarea",51),T.TgZ(30,"mat-icon",52),T._uU(31,"message"),T.qZA(),T.YNc(32,C,3,3,"mat-error",53),T.qZA(),T.qZA(),T.TgZ(33,"div",47),T.TgZ(34,"mat-form-field",48),T.TgZ(35,"mat-label"),T._uU(36),T.ALo(37,"translate"),T.qZA(),T._UZ(38,"textarea",54),T.TgZ(39,"mat-icon",52),T._uU(40,"message"),T.qZA(),T.YNc(41,k,3,3,"mat-error",53),T.qZA(),T.qZA(),T.qZA(),T.TgZ(42,"div",62),T.TgZ(43,"div",63),T.TgZ(44,"button",64),T._uU(45),T.ALo(46,"translate"),T.qZA(),T.TgZ(47,"button",65),T.NdJ("click",function(){return T.CHM(e).$implicit.close()}),T._uU(48),T.ALo(49,"translate"),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.qZA()}if(2&e){const e=T.oxw();T.xp6(5),T.hij(" ",T.lcZ(6,10,"MESSAGE.EDITTITLE"),""),T.xp6(7),T.Q6J("formGroup",e.editMessageForm),T.xp6(7),T.Oqu(T.lcZ(20,12,"MESSAGE.LIST.MESSAGE-TYPE")),T.xp6(3),T.Q6J("ngForOf",e.messageList),T.xp6(5),T.Oqu(T.lcZ(28,14,"MESSAGE.LIST.MESSAGE-ENG")),T.xp6(5),T.Q6J("ngIf",e.editMessageForm.get("message_english").hasError("required")),T.xp6(4),T.Oqu(T.lcZ(37,16,"MESSAGE.LIST.MESSAGE-MALAY")),T.xp6(5),T.Q6J("ngIf",e.editMessageForm.get("message_malay").hasError("required")),T.xp6(4),T.Oqu(T.lcZ(46,18,"BUTTON.EDIT-BTN")),T.xp6(3),T.Oqu(T.lcZ(49,20,"BUTTON.CANCEL-BTN"))}}function G(e,t){if(1&e){const e=T.EpF();T.TgZ(0,"div",66),T.TgZ(1,"h4",38),T.TgZ(2,"div",39),T.TgZ(3,"div",40),T.TgZ(4,"div",41),T._uU(5),T.ALo(6,"translate"),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.TgZ(7,"button",42),T.NdJ("click",function(){return T.CHM(e).$implicit.dismiss("Cross click")}),T.TgZ(8,"span",43),T.TgZ(9,"i",44),T._uU(10,"close"),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.TgZ(11,"div",45),T.TgZ(12,"p"),T._uU(13),T.ALo(14,"translate"),T.qZA(),T.TgZ(15,"div",62),T.TgZ(16,"div",63),T.TgZ(17,"button",67),T.NdJ("click",function(){return T.CHM(e),T.oxw().deleteMessageDetails()}),T._uU(18),T.ALo(19,"translate"),T.qZA(),T.TgZ(20,"button",65),T.NdJ("click",function(){return T.CHM(e).$implicit.close()}),T._uU(21),T.ALo(22,"translate"),T.qZA(),T.qZA(),T.qZA(),T.qZA()}2&e&&(T.xp6(5),T.hij(" ",T.lcZ(6,4,"MESSAGE.DELETETITLE"),""),T.xp6(8),T.Oqu(T.lcZ(14,6,"BUTTON.CONFIRMATION")),T.xp6(5),T.Oqu(T.lcZ(19,8,"BUTTON.DEL-BTN")),T.xp6(3),T.Oqu(T.lcZ(22,10,"BUTTON.CANCEL-BTN")))}const O=[{path:"",component:(()=>{class e{constructor(e,t,s,i,a,r){this.fb=e,this.messageService=t,this.modalService=s,this.toastrService=i,this.router=a,this.spinner=r,this.data=[],this.filteredData=[],this.hide=!0,this.columns=[{name:"Message Type"}]}ngOnInit(){this.getMessageList(),this.getMessageDetails(),this.addMessageForm=this.fb.group({message_type:["",p.kI.required],message_english:["",p.kI.required],message_malay:["",p.kI.required]}),this.editMessageForm=this.fb.group({id:[""],message_type:["",p.kI.required],message_english:["",p.kI.required],message_malay:["",p.kI.required]})}getMessageList(){this.messageService.getMessageList().subscribe(e=>{console.log("getMessageList--------",e),this.messageList=e.data})}getMessageDetails(){this.messageService.getMessageDetails().subscribe(e=>{console.log("getRetestDetails--------",e),this.data=e.data,this.filteredData=e.data})}addRow(e){this.modalService.open(e,{ariaLabelledBy:"modal-basic-title",size:"lg"})}checkMessagetExists(){this.messageService.checkMessagetExists(this.addMessageForm.value.message_type).subscribe(e=>{"Exists"==e.status?(this.toastrService.error("Already Exists!!!"),this.addMessageForm.patchValue({message_type:""})):"Session Expired"==e.status&&(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"]))})}setMessageDetails(){this.spinner.show(),this.messageService.setMessageDetails(this.addMessageForm.value).subscribe(e=>{this.spinner.hide(),"Success"==e.status?(this.toastrService.success("Created Successfully!!"),this.getMessageDetails(),this.modalService.dismissAll()):"Session Expired"==e.status?(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"])):this.toastrService.error(e.status)})}editRow(e,t,s){this.modalService.open(s,{ariaLabelledBy:"modal-basic-title",size:"lg"}),console.log("row====",e),this.editMessageForm.patchValue({id:e.id,message_type:e.status_id,message_english:e.message_english,message_malay:e.message_malay})}updateMessageDetails(){this.spinner.show(),this.messageService.updateMessageDetails(this.editMessageForm.value).subscribe(e=>{this.spinner.hide(),"Success"==e.status?(this.toastrService.success("Updated Successfully!!"),this.getMessageDetails(),this.modalService.dismissAll()):"Session Expired"==e.status?(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"])):this.toastrService.error(e.status)})}deleteRow(e,t,s){this.modalService.open(s,{ariaLabelledBy:"modal-basic-title"}),this.rowToDelete=e}deleteMessageDetails(){this.spinner.show(),this.messageService.deleteMessageDetails(this.rowToDelete).subscribe(e=>{this.spinner.hide(),"Success"==e.status?(this.toastrService.success("Deleted Successfully!!"),this.getMessageDetails(),this.modalService.dismissAll()):"Session Expired"==e.status?(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"])):this.toastrService.error(e.status)})}filterDatatable(e){const t=e.target.value.toLowerCase(),s=this.columns.length,i=Object.keys(this.filteredData[0]);this.data=this.filteredData.filter(function(e){for(let a=0;a<s;a++)if(-1!==e[i[a]].toString().toLowerCase().indexOf(t)||!t)return!0}),this.table.offset=0}}return e.\u0275fac=function(t){return new(t||e)(T.Y36(p.qu),T.Y36(b),T.Y36(E.FF),T.Y36(M._W),T.Y36(h.F0),T.Y36(v.t2))},e.\u0275cmp=T.Xpm({type:e,selectors:[["app-message-list"]],viewQuery:function(e,t){if(1&e&&T.Gf(r.nE,5),2&e){let e;T.iGM(e=T.CRH())&&(t.table=e.first)}},decls:49,vars:22,consts:[["bdColor","rgba(51,51,51,0.8)","size","medium","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],[1,"content"],[1,"container-fluid"],[1,"block-header"],[1,"row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12"],[1,"breadcrumb","breadcrumb-style"],[1,"breadcrumb-item"],[1,"page-title"],[1,"row","clearfix"],[1,"col-lg-12","col-md-12","col-sm-12","col-xs-12"],[1,"card"],[1,"body"],[1,"col-sm-12"],[1,"ngxTableHeader"],[1,"header-buttons-left","ms-0","mb-0"],[1,"dropdown"],[1,"dropdown","m-l-20"],["for","search-input"],[1,"material-icons","search-icon"],["placeholder","Search","type","text","aria-label","Search box",1,"browser-default","search-field",3,"keyup"],[1,"header-buttons"],["mat-mini-fab","","color","primary",3,"click"],[1,"col-white"],[1,"material",3,"rows","columns","sortType","columnMode","headerHeight","footerHeight","rowHeight","limit"],["table",""],["prop","status",3,"name","width"],["sortable","false",3,"name","width"],["ngx-datatable-cell-template",""],["addRecord",""],["editRecord",""],["deleteRecord",""],["mat-icon-button","","color","accent",1,"btn-tbl-edit",3,"click"],["aria-label","Edit",1,"col-white"],["mat-icon-button","","color","accent",1,"btn-tbl-delete",3,"click"],["aria-label","Delete",1,"col-white"],[1,"modal-header","editRowModal"],["id","modal-basic-title",1,"modal-title"],[1,"modal-header"],[1,"modal-about"],[1,"font-weight-bold","p-t-10","font-17"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"material-icons"],[1,"modal-body"],[1,"register-form",3,"formGroup","ngSubmit"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-2"],["appearance","outline",1,"example-full-width"],["formControlName","message_type","required","",3,"selectionChange"],[3,"value",4,"ngFor","ngForOf"],["matInput","","formControlName","message_english","required","",2,"height","100px"],["matSuffix",""],[4,"ngIf"],["matInput","","formControlName","message_malay","required","",2,"height","100px"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],["mat-raised-button","","color","primary",1,"btn-space",3,"disabled"],["type","button","mat-button","",3,"click"],[3,"value"],[3,"formGroup","ngSubmit"],[1,"input-field","col","s12","d-none"],["formControlName","id","type","hidden",1,"form-control"],[1,"modal-footer"],[1,"button-demo"],["mat-raised-button","","type","submit","color","primary"],["mat-button","","type","button",3,"click"],[1,"modal-header","deleteRowModal"],["mat-raised-button","","type","submit","color","primary",3,"click"]],template:function(e,t){if(1&e){const e=T.EpF();T.TgZ(0,"ngx-spinner",0),T.TgZ(1,"p",1),T._uU(2,"Loading..."),T.qZA(),T.qZA(),T.TgZ(3,"section",2),T.TgZ(4,"div",3),T.TgZ(5,"div",4),T.TgZ(6,"div",5),T.TgZ(7,"div",6),T.TgZ(8,"ul",7),T.TgZ(9,"li",8),T.TgZ(10,"h4",9),T._uU(11),T.ALo(12,"translate"),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.TgZ(13,"div",10),T.TgZ(14,"div",11),T.TgZ(15,"div",12),T.TgZ(16,"div",13),T.TgZ(17,"div",5),T.TgZ(18,"div",14),T.TgZ(19,"div",15),T.TgZ(20,"ul",16),T.TgZ(21,"li",17),T.TgZ(22,"h2"),T.TgZ(23,"strong"),T._uU(24),T.ALo(25,"translate"),T.qZA(),T.qZA(),T.qZA(),T.TgZ(26,"li",18),T.TgZ(27,"label",19),T.TgZ(28,"i",20),T._uU(29,"search"),T.qZA(),T.qZA(),T.TgZ(30,"input",21),T.NdJ("keyup",function(e){return t.filterDatatable(e)}),T.qZA(),T.qZA(),T.qZA(),T.TgZ(31,"ul",22),T.TgZ(32,"li"),T.TgZ(33,"button",23),T.NdJ("click",function(){T.CHM(e);const s=T.MAs(44);return t.addRow(s)}),T.TgZ(34,"mat-icon",24),T._uU(35,"add"),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.TgZ(36,"ngx-datatable",25,26),T._UZ(38,"ngx-datatable-column",27),T.ALo(39,"translate"),T.TgZ(40,"ngx-datatable-column",28),T.ALo(41,"translate"),T.YNc(42,_,7,0,"ng-template",29),T.qZA(),T.qZA(),T.YNc(43,y,48,23,"ng-template",null,30,T.W1O),T.YNc(45,I,50,22,"ng-template",null,31,T.W1O),T.YNc(47,G,23,12,"ng-template",null,32,T.W1O),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.qZA(),T.qZA()}2&e&&(T.xp6(11),T.Oqu(T.lcZ(12,14,"MESSAGE.LISTTITLE")),T.xp6(13),T.Oqu(T.lcZ(25,16,"MESSAGE.LISTTITLE")),T.xp6(12),T.Q6J("rows",t.data)("columns",t.columns)("sortType","multi")("columnMode","force")("headerHeight",50)("footerHeight",50)("rowHeight","60")("limit",5),T.xp6(2),T.s9C("name",T.lcZ(39,18,"MESSAGE.LIST.MESSAGE-TYPE")),T.Q6J("width",130),T.xp6(2),T.s9C("name",T.lcZ(41,20,"MESSAGE.ACTION")),T.Q6J("width",120))},directives:[v.Ro,c.lW,n.Hw,r.nE,r.UC,r.vq,p._Y,p.JL,p.sg,u.KE,u.hX,m.gD,p.JJ,p.u,p.Q7,i.sg,d.Nt,p.Fj,u.R9,i.O5,x.ey,u.TO],pipes:[L.X$],styles:[""]}),e})()}];let J=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=T.oAB({type:e}),e.\u0275inj=T.cJS({imports:[[h.Bz.forChild(O)],h.Bz]}),e})();var F=s(79961);let Y=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=T.oAB({type:e}),e.\u0275inj=T.cJS({providers:[b],imports:[[i.ez,F.Bb,r.xD,v.ef,u.lN,d.c,Z.ZX,m.LD,p.u5,p.UX,A.Ad,J,L.aw,o.Ns.forRoot({echarts:()=>s.e(4981).then(s.t.bind(s,74981,23))}),a.Xd,n.Ps,l.X,c.ot,g.Tx]]}),e})()}}]);