!function(){function t(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function e(e,a,n){return a&&t(e.prototype,a),n&&t(e,n),e}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function n(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var a,n=u(t);if(e){var l=u(this).constructor;a=Reflect.construct(n,arguments,l)}else a=n.apply(this,arguments);return i(this,a)}}function i(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(self.webpackChunksmart=self.webpackChunksmart||[]).push([[3527],{37112:function(t,i,u){"use strict";u.d(i,{Ye:function(){return p},g0:function(){return A}});var o=u(87064),r=u(61116),s=u(35366),c=u(93169),d=["*",[["mat-toolbar-row"]]],T=["*","mat-toolbar-row"],Z=(0,o.pj)(function(){return function t(e){l(this,t),this._elementRef=e}}()),g=function(){var t=function t(){l(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=s.lG2({type:t,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]}),t}(),p=function(){var t=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(u,t);var i=n(u);function u(t,e,a){var n;return l(this,u),(n=i.call(this,t))._platform=e,n._document=a,n}return e(u,[{key:"ngAfterViewInit",value:function(){var t=this;this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(function(){return t._checkToolbarMixedModes()}))}},{key:"_checkToolbarMixedModes",value:function(){}}]),u}(Z);return t.\u0275fac=function(e){return new(e||t)(s.Y36(s.SBq),s.Y36(c.t4),s.Y36(r.K0))},t.\u0275cmp=s.Xpm({type:t,selectors:[["mat-toolbar"]],contentQueries:function(t,e,a){var n;(1&t&&s.Suo(a,g,5),2&t)&&(s.iGM(n=s.CRH())&&(e._toolbarRows=n))},hostAttrs:[1,"mat-toolbar"],hostVars:4,hostBindings:function(t,e){2&t&&s.ekj("mat-toolbar-multiple-rows",e._toolbarRows.length>0)("mat-toolbar-single-row",0===e._toolbarRows.length)},inputs:{color:"color"},exportAs:["matToolbar"],features:[s.qOj],ngContentSelectors:T,decls:2,vars:0,template:function(t,e){1&t&&(s.F$t(d),s.Hsn(0),s.Hsn(1,1))},styles:[".cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}\n"],encapsulation:2,changeDetection:0}),t}(),A=function(){var t=function t(){l(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[o.BQ],o.BQ]}),t}()},83527:function(t,a,n){"use strict";n.r(a),n.d(a,{StudentsModule:function(){return mt}});var i=n(61116),u=n(31041),o=n(39199),r=n(5609),s=n(13070),c=n(9550),d=n(63589),T=n(84369),Z=n(77307),g=n(13841),p=n(92935),A=n(59241),f=n(37112),m=n(69024),h=n(40994),S=n(1325),q=n(57173),b=n(97070),v=n(87672),D=n(44716),_=n(51601),I=n(35729),x=n(17647),U=n(529),N=n(35366),R=n(42693),E=n(91681),L=function(){var t=function(){function t(e){l(this,t),this.http=e}return e(t,[{key:"getStatusListPerRole",value:function(t){return this.http.post("".concat(U.N.apiUrl,"/instructor/getStatusListPerRole"),{custData:t}).pipe((0,E.U)(function(t){return t}))}},{key:"getStudentListPerInstructor",value:function(){return this.http.get("".concat(U.N.apiUrl,"/instructor/getStudentListPerInstructor")).pipe((0,E.U)(function(t){return t}))}},{key:"getParticularStudentDetails",value:function(t){return this.http.post("".concat(U.N.apiUrl,"/webRoutes/getParticularStudentDetails"),{studentId:t}).pipe((0,E.U)(function(t){return t}))}},{key:"updateStudentStatusInfo",value:function(t,e){return this.http.post("".concat(U.N.apiUrl,"/instructor/updateStudentStatusInfo"),{studentInfo:t,statusdt:e}).pipe((0,E.U)(function(t){return t}))}},{key:"checkScheduleCompleted",value:function(t,e){return this.http.post("".concat(U.N.apiUrl,"/instructor/checkScheduleCompleted"),{studData:t,status_id:e}).pipe((0,E.U)(function(t){return t}))}}]),t}();return t.\u0275fac=function(e){return new(e||t)(N.LFG(R.eN))},t.\u0275prov=N.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t}(),w=n(24486),O=n(50518),y=n(31269),C=n(87064),G=n(7436),k=n(60649);function Y(t,e){if(1&t&&(N.TgZ(0,"td",40),N._UZ(1,"img",41),N.qZA()),2&t){var a=e.value,n=N.oxw();N.xp6(1),N.s9C("src",a?n.apiURL+"/"+a:"assets/images/nologo.png",N.LSH)}}function j(t,e){if(1&t){var a=N.EpF();N.TgZ(0,"span"),N.TgZ(1,"button",42),N.NdJ("click",function(){var t=N.CHM(a),e=t.row,n=t.rowIndex;return N.oxw().viewStudent(e,n)}),N.TgZ(2,"mat-icon",43),N._uU(3,"visibility "),N.qZA(),N.qZA(),N.TgZ(4,"button",42),N.NdJ("click",function(){var t=N.CHM(a),e=t.row,n=t.rowIndex,i=N.oxw(),u=N.MAs(61);return i.editStudent(e,n,u)}),N.TgZ(5,"mat-icon",44),N._uU(6,"edit "),N.qZA(),N.qZA(),N.qZA()}}function J(t,e){if(1&t&&(N.TgZ(0,"mat-option",65),N._uU(1),N.qZA()),2&t){var a=e.$implicit;N.Q6J("value",a.id),N.xp6(1),N.hij(" ",a.status," ")}}function P(t,e){1&t&&(N.TgZ(0,"div",60),N.TgZ(1,"mat-label"),N._uU(2,"Result"),N.qZA(),N.TgZ(3,"mat-radio-group",66),N.TgZ(4,"mat-radio-button",67),N._uU(5," Pass "),N.qZA(),N.TgZ(6,"mat-radio-button",68),N._uU(7," Fail "),N.qZA(),N.qZA(),N.qZA())}function M(t,e){1&t&&(N.TgZ(0,"div",60),N.TgZ(1,"mat-form-field",69),N.TgZ(2,"mat-label"),N._uU(3,"Marks"),N.qZA(),N._UZ(4,"input",70),N.qZA(),N.qZA())}function F(t,e){if(1&t){var a=N.EpF();N.TgZ(0,"div",60),N.TgZ(1,"mat-form-field",61),N.TgZ(2,"mat-label"),N._uU(3),N.ALo(4,"translate"),N.qZA(),N.TgZ(5,"mat-select",62),N.NdJ("selectionChange",function(){return N.CHM(a),N.oxw(2).checkScheduleCompleted()}),N.YNc(6,J,2,2,"mat-option",63),N.qZA(),N.qZA(),N.YNc(7,P,8,0,"div",55),N.YNc(8,M,5,0,"div",55),N.TgZ(9,"mat-form-field",61),N.TgZ(10,"mat-label"),N._uU(11),N.ALo(12,"translate"),N.qZA(),N.TgZ(13,"textarea",64),N._uU(14,"                          "),N.qZA(),N.qZA(),N.qZA()}if(2&t){var n=N.oxw(2);N.xp6(3),N.Oqu(N.lcZ(4,5,"STUDENT-REGISTRATION.LIST.STATUS")),N.xp6(3),N.Q6J("ngForOf",n.statusList),N.xp6(1),N.Q6J("ngIf","T"==n.statusDetail.test_flag||"R"==n.statusDetail.test_flag),N.xp6(1),N.Q6J("ngIf","T"==n.statusDetail.test_flag||"R"==n.statusDetail.test_flag),N.xp6(3),N.Oqu(N.lcZ(12,7,"STUDENT-REGISTRATION.LIST.REMARKS"))}}function Q(t,e){1&t&&(N.TgZ(0,"div",60),N.TgZ(1,"p"),N._uU(2,"No Status Found!!"),N.qZA(),N.qZA())}function B(t,e){if(1&t){var a=N.EpF();N.TgZ(0,"button",71),N.NdJ("click",function(){N.CHM(a);var t=N.oxw().$implicit;return N.oxw().updateStudentStatusInfo(),t.close()}),N._uU(1),N.ALo(2,"translate"),N.qZA()}if(2&t){var n=N.oxw(2);N.Q6J("disabled",!n.updateStatusForm.valid),N.xp6(1),N.Oqu(N.lcZ(2,2,"BUTTON.EDIT-BTN"))}}function H(t,e){if(1&t){var a=N.EpF();N.TgZ(0,"div",45),N.TgZ(1,"h4",46),N.TgZ(2,"div",47),N.TgZ(3,"div",48),N.TgZ(4,"div",49),N._uU(5),N.ALo(6,"translate"),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.TgZ(7,"button",50),N.NdJ("click",function(){return N.CHM(a).$implicit.dismiss("Cross click")}),N.TgZ(8,"span",51),N.TgZ(9,"i",52),N._uU(10,"close"),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.TgZ(11,"div",53),N.TgZ(12,"form",54),N.TgZ(13,"div",5),N.YNc(14,F,15,9,"div",55),N.YNc(15,Q,3,0,"div",55),N.qZA(),N.qZA(),N.qZA(),N.TgZ(16,"div",56),N.TgZ(17,"div",57),N.YNc(18,B,3,4,"button",58),N.TgZ(19,"button",59),N.NdJ("click",function(){return N.CHM(a).$implicit.close()}),N._uU(20),N.ALo(21,"translate"),N.qZA(),N.qZA(),N.qZA()}if(2&t){var n=N.oxw();N.xp6(5),N.hij(" ",N.lcZ(6,6,"STUDENT-REGISTRATION.UPDATESTATUS"),""),N.xp6(7),N.Q6J("formGroup",n.updateStatusForm),N.xp6(2),N.Q6J("ngIf",n.showStatus),N.xp6(1),N.Q6J("ngIf",n.showNoStatus),N.xp6(3),N.Q6J("ngIf",n.showStatus),N.xp6(2),N.Oqu(N.lcZ(21,8,"BUTTON.CANCEL-BTN"))}}var V=function(){var t=function(){function t(e,a,n,i,o,r,s,c,d){l(this,t),this.httpClient=e,this.dialog=a,this.studentsService=n,this.snackBar=i,this.router=o,this.modalService=r,this.toastrService=s,this.fb=c,this.spinner=d,this.columns=[{name:"Name"},{name:"NRIC Number"},{name:"Passport Number"},{name:"Enrollment Number"},{name:"Gender"},{name:"Mobile"},{name:"Email"}],this.data=[],this.filteredData=[],this.translateVal="ml"==localStorage.lang?"malay":"english",this.apiURL=U.N.apiUrl,this.showNoStatus=!1,this.showStatus=!1,this.updateStatusForm=this.fb.group({status_id:["",[u.kI.required]],result:[""],marks:[""],remarks:[""]})}return e(t,[{key:"ngOnInit",value:function(){this.loadData()}},{key:"refresh",value:function(){this.loadData()}},{key:"addNewStudent",value:function(){this.router.navigate(["/admin/students/add-student"])}},{key:"getStatusListPerRole",value:function(t){var e=this;this.studentsService.getStatusListPerRole(t).subscribe(function(t){t.data.length>0?(e.showNoStatus=!1,e.showStatus=!0,e.statusList=t.data,e.statusDetail=t.data[0],console.log("statusList===",e.statusList)):(e.showNoStatus=!0,e.showStatus=!1)})}},{key:"loadData",value:function(){var t=this;this.studentsService.getStudentListPerInstructor().subscribe(function(e){for(var a=0;a<e.data.length;a++)e.data[a].id_number=null!=e.data[a].nric_number?e.data[a].nric_number:e.data[a].passport_number;t.data=e.data,t.filteredData=e.data,console.log(" this.data==========",t.data)})}},{key:"updateStudentStatusInfo",value:function(){var t=this;this.spinner.show(),console.log("status========",this.rowTobeUpdated,this.updateStatusForm.value.status_id),this.studentsService.updateStudentStatusInfo(this.rowTobeUpdated,this.updateStatusForm.value).subscribe(function(e){t.spinner.hide(),t.toastrService.success("Updated Successfully!!!")})}},{key:"checkScheduleCompleted",value:function(){var t=this;this.spinner.show(),console.log("--------",this.rowTobeUpdated),this.studentsService.checkScheduleCompleted(this.rowTobeUpdated,this.updateStatusForm.value.status_id).subscribe(function(e){t.spinner.hide();var a=e.data;console.log("resData====",a),8==t.updateStatusForm.value.status_id?6!=a[0].schedule_count&&(t.toastrService.warning("KPP02 is 6 hours and it is not Completed"),t.updateStatusForm.patchValue({status_id:""})):9==t.updateStatusForm.value.status_id?10!=a[0].schedule_count&&(t.updateStatusForm.patchValue({status_id:""}),t.toastrService.warning("KPP03 is 10 hours and it is not Completed")):11!=t.updateStatusForm.value.status_id&&12!=t.updateStatusForm.value.status_id||1!=a[0].schedule_count&&(t.updateStatusForm.patchValue({status_id:""}),t.toastrService.warning("QTI Test is 1 hour and it is not Completed"))})}},{key:"filterDatatable",value:function(t){var e=t.target.value.toLowerCase(),a=this.columns.length,n=Object.keys(this.filteredData[0]);this.data=this.filteredData.filter(function(t){for(var i=0;i<a;i++)if(-1!==t[n[i]].toString().toLowerCase().indexOf(e)||!e)return!0}),this.table.offset=0}},{key:"editStudent",value:function(t,e,a){this.modalService.open(a,{ariaLabelledBy:"modal-basic-title"}),this.rowTobeUpdated=t,console.log(t),this.getStatusListPerRole(t)}},{key:"viewStudent",value:function(t,e){this.router.navigate(["/pages/students/about-student",t.id])}}]),t}();return t.\u0275fac=function(e){return new(e||t)(N.Y36(R.eN),N.Y36(p.uw),N.Y36(L),N.Y36(d.ux),N.Y36(I.F0),N.Y36(w.FF),N.Y36(O._W),N.Y36(u.qu),N.Y36(y.t2))},t.\u0275cmp=N.Xpm({type:t,selectors:[["app-all-students"]],viewQuery:function(t,e){var a;(1&t&&N.Gf(x.nE,5),2&t)&&(N.iGM(a=N.CRH())&&(e.table=a.first))},decls:62,vars:40,consts:[["bdColor","rgba(51,51,51,0.8)","size","medium","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],[1,"content"],[1,"container-fluid"],[1,"block-header"],[1,"row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12"],[1,"breadcrumb","breadcrumb-style"],[1,"breadcrumb-item"],[1,"page-title"],[1,"col-md-12"],[1,"mt-5"],[1,"col-lg-12","col-md-12","col-sm-12","col-xs-12"],[1,"card"],[1,"body"],[1,"table-responsive"],[1,"materialTableHeader"],[1,"col-8"],[1,"header-buttons-left","ml-0"],[1,"dropdown"],[1,"dropdown","m-l-20"],["for","search-input"],[1,"material-icons","search-icon"],["placeholder","Search","type","text","aria-label","Search box",1,"browser-default","search-field",3,"keyup"],[1,"col-4"],[1,"header-buttons"],[1,"icon-button-demo"],["mat-mini-fab","","color","primary",3,"click"],[1,"col-white"],[1,"material",2,"overflow-x","visible",3,"rows","columns","sortType","columnMode","headerHeight","footerHeight","rowHeight","limit"],["table",""],["name","Image","sortable","false","prop","profile_img",3,"flexGrow"],["ngx-datatable-cell-template",""],["prop","name",3,"flexGrow","name"],["prop","id_number",3,"flexGrow","name"],["prop","enrollment_no",3,"flexGrow","name"],["prop","current_status",3,"flexGrow","name"],["prop","todisplay",3,"flexGrow","name"],["sortable","false",3,"flexGrow","name","width"],["updateStatus",""],[1,"table-img","padding-0"],["width","40",3,"src"],["mat-icon-button","","color","accent",1,"btn-tbl-edit",3,"click"],["aria-label","View",1,"col-white"],["aria-label","Edit",1,"col-white"],[1,"modal-header","deleteRowModal"],["id","modal-basic-title",1,"modal-title"],[1,"modal-header"],[1,"modal-about"],[1,"font-weight-bold","p-t-10","font-17"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"material-icons"],[1,"modal-body"],[1,"register-form",3,"formGroup"],["class","col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2",4,"ngIf"],[1,"modal-footer"],[1,"button-demo"],["mat-raised-button","","type","submit","color","primary",3,"disabled","click",4,"ngIf"],["mat-button","","type","button",3,"click"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],["appearance","outline",1,"example-full-width"],["formControlName","status_id","required","",3,"selectionChange"],[3,"value",4,"ngFor","ngForOf"],["matInput","","formControlName","remarks"],[3,"value"],["formControlName","result"],["value","Pass",1,"example-margin"],["value","Fail",1,"example-margin"],["appearance","fill",1,"example-full-width"],["matInput","","formControlName","marks"],["mat-raised-button","","type","submit","color","primary",3,"disabled","click"]],template:function(t,e){1&t&&(N.TgZ(0,"ngx-spinner",0),N.TgZ(1,"p",1),N._uU(2,"Loading..."),N.qZA(),N.qZA(),N.TgZ(3,"section",2),N.TgZ(4,"div",3),N.TgZ(5,"div",4),N.TgZ(6,"div",5),N.TgZ(7,"div",6),N.TgZ(8,"ul",7),N.TgZ(9,"li",8),N.TgZ(10,"h4",9),N._uU(11),N.ALo(12,"translate"),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.TgZ(13,"div",5),N.TgZ(14,"div",10),N.TgZ(15,"div",11),N.TgZ(16,"div",12),N.TgZ(17,"div",13),N.TgZ(18,"div",14),N.TgZ(19,"div",15),N.TgZ(20,"div",16),N.TgZ(21,"div",5),N.TgZ(22,"div",17),N.TgZ(23,"ul",18),N.TgZ(24,"li",19),N.TgZ(25,"h2"),N.TgZ(26,"strong"),N._uU(27),N.ALo(28,"translate"),N.qZA(),N.qZA(),N.qZA(),N.TgZ(29,"li",20),N.TgZ(30,"label",21),N.TgZ(31,"i",22),N._uU(32,"search"),N.qZA(),N.qZA(),N.TgZ(33,"input",23),N.NdJ("keyup",function(t){return e.filterDatatable(t)}),N.qZA(),N.qZA(),N._UZ(34,"li"),N.qZA(),N.qZA(),N.TgZ(35,"div",24),N.TgZ(36,"ul",25),N._UZ(37,"li"),N.TgZ(38,"li"),N.TgZ(39,"div",26),N.TgZ(40,"button",27),N.NdJ("click",function(){return e.refresh()}),N.TgZ(41,"mat-icon",28),N._uU(42,"refresh "),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.TgZ(43,"ngx-datatable",29,30),N.TgZ(45,"ngx-datatable-column",31),N.YNc(46,Y,2,1,"ng-template",32),N.qZA(),N._UZ(47,"ngx-datatable-column",33),N.ALo(48,"translate"),N._UZ(49,"ngx-datatable-column",34),N.ALo(50,"translate"),N._UZ(51,"ngx-datatable-column",35),N.ALo(52,"translate"),N._UZ(53,"ngx-datatable-column",36),N.ALo(54,"translate"),N._UZ(55,"ngx-datatable-column",37),N.ALo(56,"translate"),N.TgZ(57,"ngx-datatable-column",38),N.ALo(58,"translate"),N.YNc(59,j,7,0,"ng-template",32),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.YNc(60,H,22,10,"ng-template",null,39,N.W1O)),2&t&&(N.xp6(11),N.Oqu(N.lcZ(12,24,"STUDENT-REGISTRATION.LISTTITLE")),N.xp6(16),N.Oqu(N.lcZ(28,26,"STUDENT-REGISTRATION.LISTTITLE")),N.xp6(16),N.Q6J("rows",e.data)("columns",e.columns)("sortType","multi")("columnMode","flex")("headerHeight",50)("footerHeight",50)("rowHeight","auto")("limit",5),N.xp6(2),N.Q6J("flexGrow",1),N.xp6(2),N.s9C("name",N.lcZ(48,28,"STUDENT-REGISTRATION.LIST.NAME")),N.Q6J("flexGrow",1),N.xp6(2),N.s9C("name",N.lcZ(50,30,"STUDENT-REGISTRATION.LIST.ID")),N.Q6J("flexGrow",1),N.xp6(2),N.s9C("name",N.lcZ(52,32,"STUDENT-REGISTRATION.LIST.TRANSACTION")),N.Q6J("flexGrow",1),N.xp6(2),N.s9C("name",N.lcZ(54,34,"STUDENT-REGISTRATION.LIST.STATUS")),N.Q6J("flexGrow",1),N.xp6(2),N.s9C("name",N.lcZ(56,36,"STUDENT-REGISTRATION.LIST.NEXT-STATUS")),N.Q6J("flexGrow",1),N.xp6(2),N.s9C("name",N.lcZ(58,38,"STUDENT-REGISTRATION.ACTIONS")),N.Q6J("flexGrow",1)("width",120))},directives:[y.Ro,T.lW,Z.Hw,x.nE,x.UC,x.vq,u._Y,u.JL,u.sg,i.O5,s.KE,s.hX,g.gD,u.JJ,u.u,u.Q7,i.sg,c.Nt,u.Fj,C.ey,G.VQ,G.U0],pipes:[k.X$],styles:[".red[_ngcontent-%COMP%]{color:red}.green[_ngcontent-%COMP%]{color:green}"]}),t}(),X=n(94784);function z(t,e){1&t&&(N.TgZ(0,"mat-icon",32),N._uU(1,"face"),N.qZA(),N._uU(2," About Me "))}function $(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._uU(5),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.NRIC")," "),N.xp6(3),N.Oqu(null==a.studentData?null:a.studentData.nric_number)}}function K(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._uU(5),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.PASSPORT")," "),N.xp6(3),N.Oqu(null==a.studentData?null:a.studentData.passport_number)}}function W(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._uU(5),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.OTHERRACE")," "),N.xp6(3),N.Oqu(null==a.studentData?null:a.studentData.other_race)}}function tt(t,e){1&t&&(N.TgZ(0,"mat-icon",32),N._uU(1,"info"),N.qZA(),N._uU(2),N.ALo(3,"translate")),2&t&&(N.xp6(2),N.hij(" ",N.lcZ(3,1,"STUDENT-REGISTRATION.SUBTITLE2")," "))}function et(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._uU(5),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij(" ",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.EMERGENCY-NAME")," "),N.xp6(3),N.Oqu(null==a.studentData?null:a.studentData.emergency_name)}}function at(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._uU(5),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.EMERGENCY-NUMBER")," "),N.xp6(3),N.Oqu(null==a.studentData?null:a.studentData.emergency_number)}}function nt(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._uU(5),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.USERNAME")," "),N.xp6(3),N.Oqu(null==a.studentData?null:a.studentData.user_name)}}function it(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._uU(5),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.PASSWORD")," "),N.xp6(3),N.Oqu(null==a.studentData?null:a.studentData.password)}}function ut(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._uU(5),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.EXISTING-LICENSE")," "),N.xp6(3),N.Oqu(null==a.studentData?null:a.studentData.existenceLicense)}}function lt(t,e){1&t&&(N.TgZ(0,"mat-icon",32),N._uU(1,"file_present"),N.qZA(),N._uU(2),N.ALo(3,"translate")),2&t&&(N.xp6(2),N.hij(" ",N.lcZ(3,1,"STUDENT-REGISTRATION.SUBTITLE4")," "))}function ot(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._UZ(5,"img",33),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.NRIC-FRONT")," "),N.xp6(3),N.s9C("src",a.apiURL+"/"+(null==a.studentDocData?null:a.studentDocData.nric_front),N.LSH)}}function rt(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._UZ(5,"img",33),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij(" ",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.NRIC-REAR")," "),N.xp6(3),N.s9C("src",a.apiURL+"/"+(null==a.studentDocData?null:a.studentDocData.nric_rear),N.LSH)}}function st(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._UZ(5,"img",33),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.PASSPORT-FRONT")," "),N.xp6(3),N.s9C("src",a.apiURL+"/"+(null==a.studentDocData?null:a.studentDocData.passport_front),N.LSH)}}function ct(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._UZ(5,"img",33),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.WORK-PERMIT")," "),N.xp6(3),N.s9C("src",a.apiURL+"/"+(null==a.studentDocData?null:a.studentDocData.work_permit_front),N.LSH)}}function dt(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._UZ(5,"img",33),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.EXISTING-LICENSE-FRONT")," "),N.xp6(3),N.s9C("src",a.apiURL+"/"+a.studentDocData.existing_license_front,N.LSH)}}function Tt(t,e){if(1&t&&(N.TgZ(0,"li",29),N.TgZ(1,"b"),N._uU(2),N.ALo(3,"translate"),N.qZA(),N.TgZ(4,"div",30),N._UZ(5,"img",33),N.qZA(),N.qZA()),2&t){var a=N.oxw();N.xp6(2),N.hij("",N.lcZ(3,2,"STUDENT-REGISTRATION.LIST.EXISTING-LICENSE-REAR")," "),N.xp6(3),N.s9C("src",a.apiURL+"/"+a.studentDocData.existing_license_rear,N.LSH)}}var Zt,gt,pt=[{path:"view",component:V},{path:"about-student/:id",component:(Zt=function(){function t(e,a,n,i,u,o,r,s,c,d){l(this,t),this.cdRef=e,this.fb=a,this.studentService=n,this.languageService=i,this.dialog=u,this.modalService=o,this.toastrService=r,this.router=s,this.route=c,this.spinner=d,this.translateVal="ml"==localStorage.lang?"malay":"english",this.apiURL=U.N.apiUrl,this.studentId=this.route.snapshot.paramMap.get("id")}return e(t,[{key:"ngOnInit",value:function(){var t=this;this.loadData(),this.languageService.languageChanged.subscribe(function(e){t.translateVal="ml"==localStorage.lang?"malay":"english",t.loadData()})}},{key:"loadData",value:function(){var t=this;this.studentService.getParticularStudentDetails(this.studentId).subscribe(function(e){t.studentData=e.studData[0],console.log("this.studentData=========",t.studentData),console.log(t.studentData["nric_"+t.translateVal]),t.studentData.nricType=t.studentData["nric_"+t.translateVal],t.studentData.placeBirth=t.studentData["place_"+t.translateVal],t.studentData.race=t.studentData["race_"+t.translateVal],t.studentData.preference=t.studentData["pref_"+t.translateVal],t.studentData.existenceLicense=t.studentData["existence_"+t.translateVal],t.studentDocData=e.docData[0]})}}]),t}(),Zt.\u0275fac=function(t){return new(t||Zt)(N.Y36(N.sBO),N.Y36(u.qu),N.Y36(L),N.Y36(X.T),N.Y36(p.uw),N.Y36(w.FF),N.Y36(O._W),N.Y36(I.F0),N.Y36(I.gz),N.Y36(y.t2))},Zt.\u0275cmp=N.Xpm({type:Zt,selectors:[["app-about-student"]],decls:193,vars:104,consts:[["bdColor","rgba(51,51,51,0.8)","size","medium","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],[1,"content"],[1,"container-fluid"],[1,"block-header"],[1,"row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12"],[1,"breadcrumb","breadcrumb-style"],[1,"breadcrumb-item"],[1,"page-title"],[1,"row","clearfix"],[1,"col-lg-4","col-md-12"],[1,"card"],[1,"m-b-20"],[1,"contact-grid"],[1,"profile-header","bg-dark"],[1,"user-name"],[1,"name-center"],["alt","",1,"user-img",3,"src"],[1,"phone"],[1,"material-icons"],[1,"col-4"],[1,"col-lg-8","col-md-12"],["mat-tab-label",""],[1,"col-lg-12","col-md-12","col-sm-12"],[1,"project_widget"],[1,"header"],[1,"body"],[1,"list-group","list-group-unbordered"],[1,"list-group-item"],[1,"profile-desc-item","float-end"],["class","list-group-item",4,"ngIf"],[1,"example-tab-icon","msr-2"],[2,"width","100%","height","100%",3,"src"]],template:function(t,e){1&t&&(N.TgZ(0,"ngx-spinner",0),N.TgZ(1,"p",1),N._uU(2,"Loading..."),N.qZA(),N.qZA(),N.TgZ(3,"section",2),N.TgZ(4,"div",3),N.TgZ(5,"div",4),N.TgZ(6,"div",5),N.TgZ(7,"div",6),N.TgZ(8,"ul",7),N.TgZ(9,"li",8),N.TgZ(10,"h4",9),N._uU(11,"Student Profile"),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.TgZ(12,"div",10),N.TgZ(13,"div",11),N.TgZ(14,"div",12),N.TgZ(15,"div",13),N.TgZ(16,"div",14),N.TgZ(17,"div",15),N.TgZ(18,"div",16),N._uU(19),N.qZA(),N.TgZ(20,"div",17),N._uU(21),N.qZA(),N.qZA(),N._UZ(22,"img",18),N.TgZ(23,"p"),N._uU(24),N._UZ(25,"br"),N._uU(26),N.qZA(),N.TgZ(27,"div"),N.TgZ(28,"span",19),N.TgZ(29,"i",20),N._uU(30,"phone"),N.qZA(),N._uU(31),N.qZA(),N.qZA(),N.TgZ(32,"div",5),N._UZ(33,"div",21),N.TgZ(34,"div",21),N.TgZ(35,"h5"),N._uU(36),N.qZA(),N.TgZ(37,"small"),N._uU(38,"Status"),N.qZA(),N.qZA(),N._UZ(39,"div",21),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.TgZ(40,"div",22),N.TgZ(41,"div",12),N.TgZ(42,"mat-tab-group"),N.TgZ(43,"mat-tab"),N.YNc(44,z,3,0,"ng-template",23),N.TgZ(45,"div",24),N.TgZ(46,"div",25),N.TgZ(47,"div",26),N.TgZ(48,"h2"),N.TgZ(49,"strong"),N._uU(50),N.ALo(51,"translate"),N.qZA(),N.qZA(),N.qZA(),N.TgZ(52,"div",27),N.TgZ(53,"ul",28),N.TgZ(54,"li",29),N.TgZ(55,"b"),N._uU(56),N.ALo(57,"translate"),N.qZA(),N.TgZ(58,"div",30),N._uU(59),N.qZA(),N.qZA(),N.TgZ(60,"li",29),N.TgZ(61,"b"),N._uU(62),N.ALo(63,"translate"),N.qZA(),N.TgZ(64,"div",30),N._uU(65),N.qZA(),N.qZA(),N.YNc(66,$,6,4,"li",31),N.YNc(67,K,6,4,"li",31),N.TgZ(68,"li",29),N.TgZ(69,"b"),N._uU(70),N.ALo(71,"translate"),N.qZA(),N.TgZ(72,"div",30),N._uU(73),N.ALo(74,"date"),N.qZA(),N.qZA(),N.TgZ(75,"li",29),N.TgZ(76,"b"),N._uU(77),N.ALo(78,"translate"),N.qZA(),N.TgZ(79,"div",30),N._uU(80),N.qZA(),N.qZA(),N.TgZ(81,"li",29),N.TgZ(82,"b"),N._uU(83),N.ALo(84,"translate"),N.qZA(),N.TgZ(85,"div",30),N._uU(86),N.qZA(),N.qZA(),N.TgZ(87,"li",29),N.TgZ(88,"b"),N._uU(89),N.ALo(90,"translate"),N.qZA(),N.TgZ(91,"div",30),N._uU(92),N.qZA(),N.qZA(),N.TgZ(93,"li",29),N.TgZ(94,"b"),N._uU(95),N.ALo(96,"translate"),N.qZA(),N.TgZ(97,"div",30),N._uU(98),N.qZA(),N.qZA(),N.TgZ(99,"li",29),N.TgZ(100,"b"),N._uU(101),N.ALo(102,"translate"),N.qZA(),N.TgZ(103,"div",30),N._uU(104),N.qZA(),N.qZA(),N.TgZ(105,"li",29),N.TgZ(106,"b"),N._uU(107),N.ALo(108,"translate"),N.qZA(),N.TgZ(109,"div",30),N._uU(110),N.qZA(),N.qZA(),N.TgZ(111,"li",29),N.TgZ(112,"b"),N._uU(113),N.ALo(114,"translate"),N.qZA(),N.TgZ(115,"div",30),N._uU(116),N.qZA(),N.qZA(),N.TgZ(117,"li",29),N.TgZ(118,"b"),N._uU(119),N.ALo(120,"translate"),N.qZA(),N.TgZ(121,"div",30),N._uU(122),N.qZA(),N.qZA(),N.TgZ(123,"li",29),N.TgZ(124,"b"),N._uU(125),N.ALo(126,"translate"),N.qZA(),N.TgZ(127,"div",30),N._uU(128),N.qZA(),N.qZA(),N.TgZ(129,"li",29),N.TgZ(130,"b"),N._uU(131),N.ALo(132,"translate"),N.qZA(),N.TgZ(133,"div",30),N._uU(134),N.qZA(),N.qZA(),N.TgZ(135,"li",29),N.TgZ(136,"b"),N._uU(137),N.ALo(138,"translate"),N.qZA(),N.TgZ(139,"div",30),N._uU(140),N.qZA(),N.qZA(),N.TgZ(141,"li",29),N.TgZ(142,"b"),N._uU(143),N.ALo(144,"translate"),N.qZA(),N.TgZ(145,"div",30),N._uU(146),N.qZA(),N.qZA(),N.YNc(147,W,6,4,"li",31),N.qZA(),N._UZ(148,"br"),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.TgZ(149,"mat-tab"),N.YNc(150,tt,4,3,"ng-template",23),N.TgZ(151,"div",26),N.TgZ(152,"h2"),N.TgZ(153,"strong"),N._uU(154),N.ALo(155,"translate"),N.qZA(),N.qZA(),N.qZA(),N.TgZ(156,"div",27),N.TgZ(157,"ul",28),N.TgZ(158,"li",29),N.TgZ(159,"b"),N._uU(160),N.ALo(161,"translate"),N.qZA(),N.TgZ(162,"div",30),N._uU(163),N.qZA(),N.qZA(),N.YNc(164,et,6,4,"li",31),N.YNc(165,at,6,4,"li",31),N.YNc(166,nt,6,4,"li",31),N.YNc(167,it,6,4,"li",31),N.YNc(168,ut,6,4,"li",31),N.TgZ(169,"li",29),N.TgZ(170,"b"),N._uU(171),N.ALo(172,"translate"),N.qZA(),N.TgZ(173,"div",30),N._uU(174),N.ALo(175,"date"),N.qZA(),N.qZA(),N.qZA(),N._UZ(176,"br"),N.qZA(),N.qZA(),N.TgZ(177,"mat-tab"),N.YNc(178,lt,4,3,"ng-template",23),N.TgZ(179,"div",26),N.TgZ(180,"h2"),N.TgZ(181,"strong"),N._uU(182),N.ALo(183,"translate"),N.qZA(),N.qZA(),N.qZA(),N.TgZ(184,"div",27),N.TgZ(185,"ul",28),N.YNc(186,ot,6,4,"li",31),N.YNc(187,rt,6,4,"li",31),N.YNc(188,st,6,4,"li",31),N.YNc(189,ct,6,4,"li",31),N.YNc(190,dt,6,4,"li",31),N.YNc(191,Tt,6,4,"li",31),N.qZA(),N._UZ(192,"br"),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA(),N.qZA()),2&t&&(N.xp6(19),N.Oqu(null==e.studentData?null:e.studentData.name),N.xp6(2),N.Oqu(null==e.studentData?null:e.studentData.nricType),N.xp6(1),N.s9C("src",e.apiURL+"/"+e.studentData.profile_img,N.LSH),N.xp6(2),N.hij(" ",null==e.studentData?null:e.studentData.address_nric," "),N.xp6(2),N.hij("",null==e.studentData?null:e.studentData.state," "),N.xp6(5),N.Oqu(null==e.studentData?null:e.studentData.mobile_number),N.xp6(5),N.Oqu(null==e.studentData?null:e.studentData.status),N.xp6(14),N.Oqu(N.lcZ(51,58,"STUDENT-REGISTRATION.SUBTITLE1")),N.xp6(6),N.hij("",N.lcZ(57,60,"STUDENT-REGISTRATION.LIST.NAME")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.name),N.xp6(3),N.hij(" ",N.lcZ(63,62,"STUDENT-REGISTRATION.LIST.IC-TYPE")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.nricType),N.xp6(1),N.Q6J("ngIf",null==e.studentData?null:e.studentData.nric_number),N.xp6(1),N.Q6J("ngIf",null==e.studentData?null:e.studentData.passport_number),N.xp6(3),N.hij("",N.lcZ(71,64,"STUDENT-REGISTRATION.LIST.DOB")," "),N.xp6(3),N.Oqu(N.xi3(74,66,null==e.studentData?null:e.studentData.date_of_birth,"dd-MM-yyyy")),N.xp6(4),N.hij("",N.lcZ(78,69,"STUDENT-REGISTRATION.LIST.GENDER")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.gender),N.xp6(3),N.hij("",N.lcZ(84,71,"STUDENT-REGISTRATION.LIST.PLACEBIRTH")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.placeBirth),N.xp6(3),N.hij("",N.lcZ(90,73,"STUDENT-REGISTRATION.LIST.NATIONALITY")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.country_name),N.xp6(3),N.hij("",N.lcZ(96,75,"STUDENT-REGISTRATION.LIST.IC-ADDRESS")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.address_nric),N.xp6(3),N.hij("",N.lcZ(102,77,"STUDENT-REGISTRATION.LIST.ADDRESS1")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.address1),N.xp6(3),N.hij("",N.lcZ(108,79,"STUDENT-REGISTRATION.LIST.ADDRESS2")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.address2),N.xp6(3),N.hij("",N.lcZ(114,81,"STUDENT-REGISTRATION.LIST.POSTAL-CODE")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.postal_code),N.xp6(3),N.hij("",N.lcZ(120,83,"STUDENT-REGISTRATION.LIST.CITY")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.city),N.xp6(3),N.hij("",N.lcZ(126,85,"STUDENT-REGISTRATION.LIST.STATE")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.state),N.xp6(3),N.hij("",N.lcZ(132,87,"STUDENT-REGISTRATION.LIST.EMAIL")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.email_id),N.xp6(3),N.hij("",N.lcZ(138,89,"STUDENT-REGISTRATION.LIST.MOBILENO")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.mobile_number),N.xp6(3),N.hij("",N.lcZ(144,91,"STUDENT-REGISTRATION.LIST.RACE")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.race),N.xp6(1),N.Q6J("ngIf",e.studentData.other_race),N.xp6(7),N.Oqu(N.lcZ(155,93,"STUDENT-REGISTRATION.SUBTITLE2")),N.xp6(6),N.hij("",N.lcZ(161,95,"STUDENT-REGISTRATION.LIST.PREFERENCE")," "),N.xp6(3),N.Oqu(null==e.studentData?null:e.studentData.preference),N.xp6(1),N.Q6J("ngIf",e.studentData.emergency_number),N.xp6(1),N.Q6J("ngIf",e.studentData.emergency_number),N.xp6(1),N.Q6J("ngIf",e.studentData.user_name),N.xp6(1),N.Q6J("ngIf",e.studentData.password),N.xp6(1),N.Q6J("ngIf",e.studentData.existenceLicense),N.xp6(3),N.hij("",N.lcZ(172,97,"STUDENT-REGISTRATION.LIST.EXPIRYDATE")," "),N.xp6(3),N.Oqu(N.xi3(175,99,null==e.studentData?null:e.studentData.license_expiry_date,"dd-MM-yyyy")),N.xp6(8),N.Oqu(N.lcZ(183,102,"STUDENT-REGISTRATION.SUBTITLE4")),N.xp6(4),N.Q6J("ngIf",null==e.studentDocData?null:e.studentDocData.nric_front),N.xp6(1),N.Q6J("ngIf",e.studentDocData.nric_rear),N.xp6(1),N.Q6J("ngIf",null==e.studentDocData?null:e.studentDocData.passport_front),N.xp6(1),N.Q6J("ngIf",null==e.studentDocData?null:e.studentDocData.work_permit_front),N.xp6(1),N.Q6J("ngIf",null==e.studentDocData?null:e.studentDocData.existing_license_front),N.xp6(1),N.Q6J("ngIf",null==e.studentDocData?null:e.studentDocData.existing_license_rear))},directives:[y.Ro,q.SP,q.uX,q.uD,i.O5,Z.Hw],pipes:[k.X$,i.uU],styles:[".card[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]{font-size:14px;color:#555;padding:50px}"]}),Zt)}],At=function(){var t=function t(){l(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=N.oAB({type:t}),t.\u0275inj=N.cJS({imports:[[I.Bz.forChild(pt)],I.Bz]}),t}(),ft=n(79961),mt=((gt=function t(){l(this,t)}).\u0275fac=function(t){return new(t||gt)},gt.\u0275mod=N.oAB({type:gt}),gt.\u0275inj=N.cJS({providers:[L],imports:[[y.ef,x.xD,i.ez,u.u5,u.UX,o.p0,r.TU,s.lN,c.c,d.ZX,T.ot,Z.Ps,p.Is,A.JX,f.g0,g.LD,m.FA,h.p9,q.Nh,b.Tx,S.Ad,At,v.Cq,D.T5,_.yI,k.aw,ft.Bb,G.Fk]]}),gt)}}])}();