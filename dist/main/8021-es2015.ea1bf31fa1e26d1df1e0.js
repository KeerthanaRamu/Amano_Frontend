(self.webpackChunksmart=self.webpackChunksmart||[]).push([[8021],{58021:function(e,t,i){"use strict";i.r(t),i.d(t,{EmployeeModule:function(){return ne}});var o=i(61116),l=i(33919),a=i(17647),s=i(12031),r=i(16184),n=i(77307),c=i(84369),p=i(97070),d=i(13070),m=i(9550),u=i(63589),Z=i(13841),g=i(31041),h=i(1325),A=i(35729),T=i(529),f=i(99235),q=i(35366),E=i(91681),L=i(42693);let v=(()=>{class e{constructor(e){this.http=e}getLicenseClassList(){return this.http.get(`${T.N.apiUrl}/webRoutes/getLicenseClassList`).pipe((0,E.U)(e=>e))}getEmployeeList(){return this.http.get(`${T.N.apiUrl}/superAdmin/getEmployeeList`).pipe((0,E.U)(e=>e))}setEmployeeDetails(e){return this.http.post(`${T.N.apiUrl}/superAdmin/setEmployeeDetails`,e).pipe((0,E.U)(e=>e))}updateUserDetails(e){return this.http.post(`${T.N.apiUrl}/superAdmin/updateUserDetails`,e).pipe((0,E.U)(e=>e))}deleteEmployeeDetails(e){return this.http.post(`${T.N.apiUrl}/superAdmin/deleteUserDetails`,{userData:e}).pipe((0,E.U)(e=>e))}getRoleList(){return this.http.get(`${T.N.apiUrl}/superAdmin/getRoleList`).pipe((0,E.U)(e=>e))}}return e.\u0275fac=function(t){return new(t||e)(q.LFG(L.eN))},e.\u0275prov=q.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var _=i(24486),b=i(50518),y=i(31269),x=i(95522),I=i(79961),U=i(87064),S=i(40994),O=i(60649);const N=["autocompleteTrigger"],w=["licenceInput"];function C(e,t){if(1&e&&(q.TgZ(0,"td",35),q._UZ(1,"img",36),q.qZA()),2&e){const e=t.value,i=q.oxw();q.xp6(1),q.s9C("src",e?i.apiURL+"/"+e:"assets/images/nouser.png",q.LSH)}}function M(e,t){if(1&e){const e=q.EpF();q.TgZ(0,"span"),q.TgZ(1,"button",37),q.NdJ("click",function(){const t=q.CHM(e),i=t.row,o=t.rowIndex,l=q.oxw(),a=q.MAs(51);return l.editRow(i,o,a)}),q.TgZ(2,"mat-icon",38),q._uU(3,"edit "),q.qZA(),q.qZA(),q.TgZ(4,"button",39),q.NdJ("click",function(){const t=q.CHM(e),i=t.row,o=t.rowIndex,l=q.oxw(),a=q.MAs(53);return l.deleteRow(i,o,a)}),q.TgZ(5,"mat-icon",40),q._uU(6,"delete "),q.qZA(),q.qZA(),q.qZA()}}function Y(e,t){if(1&e&&(q.TgZ(0,"mat-option",79),q._uU(1),q.qZA()),2&e){const e=t.$implicit;q.Q6J("value",e.id),q.xp6(1),q.hij(" ",e.role," ")}}function J(e,t){if(1&e){const e=q.EpF();q.TgZ(0,"mat-chip",80),q.NdJ("removed",function(){const t=q.CHM(e).$implicit;return q.oxw(2).remove(t)}),q._uU(1),q.qZA()}if(2&e){const e=t.$implicit,i=q.oxw(2);q.Q6J("selectable",i.selectable)("removable",i.removable),q.xp6(1),q.hij(" ",e," ")}}function k(e,t){if(1&e&&(q.TgZ(0,"mat-option",79),q._UZ(1,"mat-checkbox",81),q._uU(2),q.qZA()),2&e){const e=t.$implicit,i=q.oxw(2);q.Q6J("value",e.license_class),q.xp6(1),q.Q6J("checked",i.license_selected.indexOf(e.license_class)>=0),q.xp6(1),q.hij(" ",e.license_class," ")}}function R(e,t){1&e&&(q.TgZ(0,"mat-error"),q._uU(1),q.ALo(2,"translate"),q.qZA()),2&e&&(q.xp6(1),q.hij(" ",q.lcZ(2,1,"EMPLOYEE.LIST.NAME")," is required "))}function P(e,t){1&e&&(q.TgZ(0,"mat-error"),q._uU(1),q.ALo(2,"translate"),q.qZA()),2&e&&(q.xp6(1),q.hij(" ",q.lcZ(2,1,"EMPLOYEE.LIST.LNAME")," is required "))}function D(e,t){1&e&&(q.TgZ(0,"mat-error"),q._uU(1),q.ALo(2,"translate"),q.qZA()),2&e&&(q.xp6(1),q.hij(" ",q.lcZ(2,1,"EMPLOYEE.LIST.USERNAME")," is required "))}function F(e,t){1&e&&(q.TgZ(0,"mat-error"),q._uU(1),q.ALo(2,"translate"),q.qZA()),2&e&&(q.xp6(1),q.hij(" ",q.lcZ(2,1,"EMPLOYEE.LIST.PASSWORD")," is required "))}function Q(e,t){1&e&&(q.TgZ(0,"mat-error"),q._uU(1),q.ALo(2,"translate"),q.qZA()),2&e&&(q.xp6(1),q.hij(" Please enter a valid ",q.lcZ(2,1,"EMPLOYEE.LIST.EMAILID")," "))}function H(e,t){if(1&e&&(q.TgZ(0,"div",53),q._UZ(1,"img",82),q.qZA()),2&e){const e=q.oxw(2);q.xp6(1),q.hYB("src","",e.apiURL,"/",e.imagePreview,"",q.LSH)}}function j(e,t){if(1&e){const e=q.EpF();q.TgZ(0,"div",41),q.TgZ(1,"h4",42),q.TgZ(2,"div",43),q.TgZ(3,"div",44),q.TgZ(4,"div",45),q._uU(5),q.ALo(6,"translate"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.TgZ(7,"button",46),q.NdJ("click",function(){return q.CHM(e).$implicit.dismiss("Cross click")}),q.TgZ(8,"span",47),q.TgZ(9,"i",48),q._uU(10,"close"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.TgZ(11,"div",49),q.TgZ(12,"form",50),q.NdJ("ngSubmit",function(){return q.CHM(e),q.oxw().updateEmployeeDetails()}),q.TgZ(13,"div",51),q._UZ(14,"input",52),q.qZA(),q.TgZ(15,"div",5),q.TgZ(16,"div",53),q.TgZ(17,"mat-form-field",54),q.TgZ(18,"mat-label"),q._uU(19),q.ALo(20,"translate"),q.qZA(),q.TgZ(21,"mat-select",55),q.YNc(22,Y,2,2,"mat-option",56),q.qZA(),q.qZA(),q.qZA(),q.TgZ(23,"div",53),q.TgZ(24,"mat-form-field",54),q.TgZ(25,"mat-chip-list",57,58),q.YNc(27,J,2,3,"mat-chip",59),q.TgZ(28,"mat-label"),q._uU(29),q.ALo(30,"translate"),q.qZA(),q.TgZ(31,"input",60,61),q.NdJ("matChipInputTokenEnd",function(t){return q.CHM(e),q.oxw().add(t)}),q.qZA(),q.qZA(),q.TgZ(34,"mat-autocomplete",62,63),q.NdJ("optionSelected",function(t){return q.CHM(e),q.oxw().selectedListType(t)}),q.YNc(36,k,3,3,"mat-option",56),q.ALo(37,"async"),q.qZA(),q.qZA(),q.qZA(),q.TgZ(38,"div",53),q.TgZ(39,"mat-form-field",54),q.TgZ(40,"mat-label"),q._uU(41),q.ALo(42,"translate"),q.qZA(),q._UZ(43,"input",64),q.TgZ(44,"mat-icon",65),q._uU(45,"face"),q.qZA(),q.YNc(46,R,3,3,"mat-error",66),q.qZA(),q.qZA(),q.TgZ(47,"div",53),q.TgZ(48,"mat-form-field",54),q.TgZ(49,"mat-label"),q._uU(50),q.ALo(51,"translate"),q.qZA(),q._UZ(52,"input",67),q.TgZ(53,"mat-icon",65),q._uU(54,"face"),q.qZA(),q.YNc(55,P,3,3,"mat-error",66),q.qZA(),q.qZA(),q.qZA(),q.TgZ(56,"div",5),q.TgZ(57,"div",53),q.TgZ(58,"mat-form-field",54),q.TgZ(59,"mat-label"),q._uU(60),q.ALo(61,"translate"),q.qZA(),q._UZ(62,"input",68),q.TgZ(63,"mat-icon",65),q._uU(64,"face"),q.qZA(),q.YNc(65,D,3,3,"mat-error",66),q.qZA(),q.qZA(),q.TgZ(66,"div",53),q.TgZ(67,"mat-form-field",54),q.TgZ(68,"mat-label"),q._uU(69),q.ALo(70,"translate"),q.qZA(),q._UZ(71,"input",69),q.TgZ(72,"a",70),q.NdJ("click",function(){q.CHM(e);const t=q.oxw();return t.hide=!t.hide}),q.TgZ(73,"mat-icon"),q._uU(74),q.qZA(),q.qZA(),q.YNc(75,F,3,3,"mat-error",66),q.qZA(),q.qZA(),q.qZA(),q.TgZ(76,"div",5),q.TgZ(77,"div",53),q.TgZ(78,"mat-form-field",54),q.TgZ(79,"mat-label"),q._uU(80),q.ALo(81,"translate"),q.qZA(),q._UZ(82,"input",71),q.TgZ(83,"mat-icon",65),q._uU(84,"phone"),q.qZA(),q.qZA(),q.qZA(),q.TgZ(85,"div",53),q.TgZ(86,"mat-form-field",54),q.TgZ(87,"mat-label"),q._uU(88),q.ALo(89,"translate"),q.qZA(),q._UZ(90,"input",72),q.TgZ(91,"mat-icon",65),q._uU(92,"email"),q.qZA(),q.YNc(93,Q,3,3,"mat-error",66),q.qZA(),q.qZA(),q.qZA(),q.TgZ(94,"div",5),q.TgZ(95,"div",53),q.TgZ(96,"mat-form-field",54),q.TgZ(97,"ngx-mat-file-input",73),q.NdJ("change",function(t){return q.CHM(e),q.oxw().onFileChangeUpdate(t)}),q.ALo(98,"translate"),q.qZA(),q.TgZ(99,"mat-icon",65),q._uU(100,"cloud_upload"),q.qZA(),q.qZA(),q.qZA(),q.YNc(101,H,2,2,"div",74),q.qZA(),q.TgZ(102,"div",75),q.TgZ(103,"div",76),q.TgZ(104,"button",77),q._uU(105),q.ALo(106,"translate"),q.qZA(),q.TgZ(107,"button",78),q.NdJ("click",function(){return q.CHM(e).$implicit.close()}),q._uU(108),q.ALo(109,"translate"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA()}if(2&e){const e=q.MAs(26),t=q.MAs(35),i=q.oxw();q.xp6(5),q.hij(" ",q.lcZ(6,30,"EMPLOYEE.EDITTITLE"),""),q.xp6(7),q.Q6J("formGroup",i.editEmployee),q.xp6(7),q.Oqu(q.lcZ(20,32,"EMPLOYEE.LIST.ROLE")),q.xp6(3),q.Q6J("ngForOf",i.roleList),q.xp6(5),q.Q6J("ngForOf",i.license_selected),q.xp6(2),q.Oqu(q.lcZ(30,34,"PACKAGE.LIST.LICENSE-TYPE")),q.xp6(2),q.Q6J("matChipInputFor",e)("matChipInputSeparatorKeyCodes",i.separatorKeysCodes)("formControl",i.license_type)("matAutocomplete",t),q.xp6(5),q.Q6J("ngForOf",q.lcZ(37,36,i.licenseTypeList)),q.xp6(5),q.Oqu(q.lcZ(42,38,"EMPLOYEE.LIST.NAME")),q.xp6(5),q.Q6J("ngIf",i.editEmployee.get("name").hasError("required")),q.xp6(4),q.Oqu(q.lcZ(51,40,"EMPLOYEE.LIST.LNAME")),q.xp6(5),q.Q6J("ngIf",i.editEmployee.get("last_name").hasError("required")),q.xp6(5),q.Oqu(q.lcZ(61,42,"EMPLOYEE.LIST.USERNAME")),q.xp6(5),q.Q6J("ngIf",i.editEmployee.get("user_name").hasError("required")),q.xp6(4),q.Oqu(q.lcZ(70,44,"EMPLOYEE.LIST.PASSWORD")),q.xp6(2),q.Q6J("type",i.hide?"password":"text"),q.xp6(1),q.uIk("aria-label","Hide password")("aria-pressed",i.hide),q.xp6(2),q.Oqu(i.hide?"visibility_off":"visibility"),q.xp6(1),q.Q6J("ngIf",i.editEmployee.get("password").hasError("required")),q.xp6(5),q.Oqu(q.lcZ(81,46,"EMPLOYEE.LIST.MOBILENO")),q.xp6(8),q.Oqu(q.lcZ(89,48,"EMPLOYEE.LIST.EMAILID")),q.xp6(5),q.Q6J("ngIf",i.editEmployee.get("email_id").hasError("email")&&i.editEmployee.get("email_id").touched),q.xp6(4),q.s9C("placeholder",q.lcZ(98,50,"EMPLOYEE.LIST.PROFILE-IMG")),q.xp6(4),q.Q6J("ngIf",""!=i.imagePreview),q.xp6(4),q.Oqu(q.lcZ(106,52,"BUTTON.EDIT-BTN")),q.xp6(3),q.Oqu(q.lcZ(109,54,"BUTTON.CANCEL-BTN"))}}function B(e,t){if(1&e){const e=q.EpF();q.TgZ(0,"div",83),q.TgZ(1,"h4",42),q.TgZ(2,"div",43),q.TgZ(3,"div",44),q.TgZ(4,"div",45),q._uU(5),q.ALo(6,"translate"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.TgZ(7,"button",46),q.NdJ("click",function(){return q.CHM(e).$implicit.dismiss("Cross click")}),q.TgZ(8,"span",47),q.TgZ(9,"i",48),q._uU(10,"close"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.TgZ(11,"div",49),q.TgZ(12,"p"),q._uU(13),q.ALo(14,"translate"),q.qZA(),q.TgZ(15,"div",75),q.TgZ(16,"div",76),q.TgZ(17,"button",84),q.NdJ("click",function(){return q.CHM(e),q.oxw().deleteEmployeeDetails()}),q._uU(18),q.ALo(19,"translate"),q.qZA(),q.TgZ(20,"button",78),q.NdJ("click",function(){return q.CHM(e).$implicit.close()}),q._uU(21),q.ALo(22,"translate"),q.qZA(),q.qZA(),q.qZA(),q.qZA()}2&e&&(q.xp6(5),q.hij(" ",q.lcZ(6,4,"EMPLOYEE.DELETETITLE"),""),q.xp6(8),q.Oqu(q.lcZ(14,6,"BUTTON.CONFIRMATION")),q.xp6(5),q.Oqu(q.lcZ(19,8,"BUTTON.DEL-BTN")),q.xp6(3),q.Oqu(q.lcZ(22,10,"BUTTON.CANCEL-BTN")))}let G=(()=>{class e{constructor(e,t,i,o,l,a){this.fb=e,this.employeeService=t,this.modalService=i,this.toastrService=o,this.spinner=l,this.router=a,this.selectable=!0,this.removable=!0,this.separatorKeysCodes=[f.K5,f.OC],this.license_selected=[],this.data=[],this.filteredData=[],this.apiURL=T.N.apiUrl,this.hide=!0,this.license_type=new g.NI("",{validators:[e=>"string"==typeof e.value?{invalidAutocompleteObject:{value:e.value}}:null,g.kI.required]}),this.columns=[{name:"Name"},{name:"User Name"},{name:"Role"}]}ngOnInit(){this.getEmployeeList(),this.getRoleList(),this.editEmployee=this.fb.group({id:[""],name:["",g.kI.required],last_name:["",g.kI.required],user_name:["",g.kI.required],password:["",g.kI.required],role:["",g.kI.required],img:["",g.kI.required],img_type:[""],mobile_no:[""],email_id:[""]})}getEmployeeList(){this.employeeService.getEmployeeList().subscribe(e=>{console.log("empppppp--------",e),this.data=e,this.filteredData=e})}addRow(){this.router.navigate(["/admin/employee/add-employee"])}getRoleList(){this.employeeService.getRoleList().subscribe(e=>{console.log("client--------",e),this.roleList=e})}editRow(e,t,i){this.imagePreview="",console.log("row---------",e),this.modalService.open(i,{ariaLabelledBy:"modal-basic-title",size:"lg"}),this.editEmployee.patchValue({id:e.id,name:e.name,last_name:e.last_name,user_name:e.user_name,password:e.password,role:e.role_id,img:e.img,mobile_no:e.mobile_no,email_id:e.email_id}),this.license_selected=e.license_list,this.imagePreview=e.img}onFileChangeUpdate(e){if(e.target.files&&e.target.files.length){const t=new FileReader,[i]=e.target.files;t.readAsDataURL(i),t.onload=()=>{this.editEmployee.patchValue({img:i})}}}updateEmployeeDetails(){this.spinner.show();var e=new FormData;e.append("baseRoot","root/Employee/"+this.editEmployee.value.user_name),e.append("UserData",JSON.stringify(this.editEmployee.value)),e.append("file",this.editEmployee.value.img),this.employeeService.updateUserDetails(e).subscribe(e=>{this.spinner.hide(),"Success"==e.status?(this.toastrService.success("Updated Successfully!!"),this.getEmployeeList(),this.modalService.dismissAll()):"Session Expired"==e.status?(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"])):this.toastrService.error(e.status)})}deleteRow(e,t,i){this.modalService.open(i,{ariaLabelledBy:"modal-basic-title"}),this.rowToDelete=e}deleteEmployeeDetails(){this.spinner.show(),this.employeeService.deleteEmployeeDetails(this.rowToDelete).subscribe(e=>{this.spinner.hide(),"Success"==e.status?(this.toastrService.success("Deleted Successfully!!"),this.getEmployeeList(),this.modalService.dismissAll()):"Session Expired"==e.status?(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"])):this.toastrService.error(e.status)})}filterDatatable(e){const t=e.target.value.toLowerCase(),i=this.columns.length,o=Object.keys(this.filteredData[0]);this.data=this.filteredData.filter(function(e){for(let l=0;l<i;l++)if(-1!==e[o[l]].toString().toLowerCase().indexOf(t)||!t)return!0}),this.table.offset=0}}return e.\u0275fac=function(t){return new(t||e)(q.Y36(g.qu),q.Y36(v),q.Y36(_.FF),q.Y36(b._W),q.Y36(y.t2),q.Y36(A.F0))},e.\u0275cmp=q.Xpm({type:e,selectors:[["app-employee-list"]],viewQuery:function(e,t){if(1&e&&(q.Gf(N,5),q.Gf(w,5),q.Gf(a.nE,5)),2&e){let e;q.iGM(e=q.CRH())&&(t.matACTrigger=e.first),q.iGM(e=q.CRH())&&(t.licenceInput=e.first),q.iGM(e=q.CRH())&&(t.table=e.first)}},decls:54,vars:34,consts:[["bdColor","rgba(51,51,51,0.8)","size","medium","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],[1,"content"],[1,"container-fluid"],[1,"block-header"],[1,"row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12"],[1,"breadcrumb","breadcrumb-style"],[1,"breadcrumb-item"],[1,"page-title"],[1,"row","clearfix"],[1,"col-lg-12","col-md-12","col-sm-12","col-xs-12"],[1,"card"],[1,"body"],[1,"col-sm-12"],[1,"ngxTableHeader"],[1,"header-buttons-left","ms-0","mb-0"],[1,"dropdown"],[1,"dropdown","m-l-20"],["for","search-input"],[1,"material-icons","search-icon"],["placeholder","Search","type","text","aria-label","Search box",1,"browser-default","search-field",3,"keyup"],[1,"header-buttons"],["mat-mini-fab","","color","primary",3,"click"],[1,"col-white"],[1,"material",3,"rows","columns","sortType","columnMode","headerHeight","footerHeight","rowHeight","limit"],["table",""],["sortable","false","prop","img",3,"name","width"],["ngx-datatable-cell-template",""],["prop","name",3,"name","width"],["prop","user_name",3,"name","width"],["prop","role",3,"name","width"],["sortable","false",3,"name","width"],["editRecord",""],["deleteRecord",""],[1,"table-img","padding-0"],["width","40",3,"src"],["mat-icon-button","","color","accent",1,"btn-tbl-edit",3,"click"],["aria-label","Edit",1,"col-white"],["mat-icon-button","","color","accent",1,"btn-tbl-delete",3,"click"],["aria-label","Delete",1,"col-white"],[1,"modal-header","editRowModal"],["id","modal-basic-title",1,"modal-title"],[1,"modal-header"],[1,"modal-about"],[1,"font-weight-bold","p-t-10","font-17"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"material-icons"],[1,"modal-body"],[3,"formGroup","ngSubmit"],[1,"input-field","col","s12","d-none"],["formControlName","id","type","hidden",1,"form-control"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-2"],[1,"example-full-width"],["formControlName","role","required","","disabled",""],[3,"value",4,"ngFor","ngForOf"],["aria-label","Fruit selection"],["chipList",""],[3,"selectable","removable","removed",4,"ngFor","ngForOf"],["type","text","matInput","",3,"matChipInputFor","matChipInputSeparatorKeyCodes","formControl","matAutocomplete","matChipInputTokenEnd"],["licenceInput","","autocompleteTrigger","matAutocompleteTrigger"],["autoActiveFirstOption","",3,"optionSelected"],["autoLicense","matAutocomplete"],["matInput","","formControlName","name","required",""],["matSuffix",""],[4,"ngIf"],["matInput","","formControlName","last_name","required",""],["matInput","","formControlName","user_name","readonly","","required",""],["matInput","","formControlName","password","required","",3,"type"],["href","#","onClick","return false;","matSuffix","",1,"show-pwd-icon",3,"click"],["matInput","","formControlName","mobile_no"],["matInput","","formControlName","email_id"],[3,"placeholder","change"],["class","col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2",4,"ngIf"],[1,"modal-footer"],[1,"button-demo"],["mat-raised-button","","type","submit","color","primary"],["mat-button","","type","button",3,"click"],[3,"value"],[3,"selectable","removable","removed"],["color","primary",2,"padding","0 12px",3,"checked"],[2,"width","100%","height","50%",3,"src"],[1,"modal-header","deleteRowModal"],["mat-raised-button","","type","submit","color","primary",3,"click"]],template:function(e,t){1&e&&(q.TgZ(0,"ngx-spinner",0),q.TgZ(1,"p",1),q._uU(2,"Loading..."),q.qZA(),q.qZA(),q.TgZ(3,"section",2),q.TgZ(4,"div",3),q.TgZ(5,"div",4),q.TgZ(6,"div",5),q.TgZ(7,"div",6),q.TgZ(8,"ul",7),q.TgZ(9,"li",8),q.TgZ(10,"h4",9),q._uU(11),q.ALo(12,"translate"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.TgZ(13,"div",10),q.TgZ(14,"div",11),q.TgZ(15,"div",12),q.TgZ(16,"div",13),q.TgZ(17,"div",5),q.TgZ(18,"div",14),q.TgZ(19,"div",15),q.TgZ(20,"ul",16),q.TgZ(21,"li",17),q.TgZ(22,"h2"),q.TgZ(23,"strong"),q._uU(24),q.ALo(25,"translate"),q.qZA(),q.qZA(),q.qZA(),q.TgZ(26,"li",18),q.TgZ(27,"label",19),q.TgZ(28,"i",20),q._uU(29,"search"),q.qZA(),q.qZA(),q.TgZ(30,"input",21),q.NdJ("keyup",function(e){return t.filterDatatable(e)}),q.qZA(),q.qZA(),q.qZA(),q.TgZ(31,"ul",22),q.TgZ(32,"li"),q.TgZ(33,"button",23),q.NdJ("click",function(){return t.addRow()}),q.TgZ(34,"mat-icon",24),q._uU(35,"add"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.TgZ(36,"ngx-datatable",25,26),q.TgZ(38,"ngx-datatable-column",27),q.ALo(39,"translate"),q.YNc(40,C,2,1,"ng-template",28),q.qZA(),q._UZ(41,"ngx-datatable-column",29),q.ALo(42,"translate"),q._UZ(43,"ngx-datatable-column",30),q.ALo(44,"translate"),q._UZ(45,"ngx-datatable-column",31),q.ALo(46,"translate"),q.TgZ(47,"ngx-datatable-column",32),q.ALo(48,"translate"),q.YNc(49,M,7,0,"ng-template",28),q.qZA(),q.qZA(),q.YNc(50,j,110,56,"ng-template",null,33,q.W1O),q.YNc(52,B,23,12,"ng-template",null,34,q.W1O),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA()),2&e&&(q.xp6(11),q.Oqu(q.lcZ(12,20,"EMPLOYEE.LISTTITLE")),q.xp6(13),q.Oqu(q.lcZ(25,22,"EMPLOYEE.LISTTITLE")),q.xp6(12),q.Q6J("rows",t.data)("columns",t.columns)("sortType","multi")("columnMode","force")("headerHeight",50)("footerHeight",50)("rowHeight","60")("limit",5),q.xp6(2),q.s9C("name",q.lcZ(39,24,"EMPLOYEE.LIST.PROFILE-IMG")),q.Q6J("width",100),q.xp6(3),q.s9C("name",q.lcZ(42,26,"EMPLOYEE.LIST.NAME")),q.Q6J("width",130),q.xp6(2),q.s9C("name",q.lcZ(44,28,"EMPLOYEE.LIST.USERNAME")),q.Q6J("width",200),q.xp6(2),q.s9C("name",q.lcZ(46,30,"EMPLOYEE.LIST.ROLE")),q.Q6J("width",200),q.xp6(2),q.s9C("name",q.lcZ(48,32,"EMPLOYEE.ACTION")),q.Q6J("width",120))},directives:[y.Ro,c.lW,n.Hw,a.nE,a.UC,a.vq,g._Y,g.JL,g.sg,g.Fj,g.JJ,g.u,d.KE,d.hX,Z.gD,g.Q7,o.sg,x.qn,m.Nt,x.oH,I.ZL,g.oH,I.XC,d.R9,o.O5,h.Yh,U.ey,x.HS,S.oG,d.TO],pipes:[O.X$,o.Ov],styles:[""]}),e})();var $=i(81258);const K=["autocompleteTrigger"],X=["licenceInput"];function W(e,t){if(1&e&&(q.TgZ(0,"mat-option",42),q._uU(1),q.qZA()),2&e){const e=t.$implicit;q.Q6J("value",e.id),q.xp6(1),q.hij(" ",e.role," ")}}function z(e,t){1&e&&(q.TgZ(0,"mat-icon",45),q._uU(1,"cancel"),q.qZA())}function V(e,t){if(1&e){const e=q.EpF();q.TgZ(0,"mat-chip",43),q.NdJ("removed",function(){const t=q.CHM(e).$implicit;return q.oxw().remove(t)}),q._uU(1),q.YNc(2,z,2,0,"mat-icon",44),q.qZA()}if(2&e){const e=t.$implicit,i=q.oxw();q.Q6J("selectable",i.selectable)("removable",i.removable),q.xp6(1),q.hij(" ",e," "),q.xp6(1),q.Q6J("ngIf",i.removable)}}function ee(e,t){if(1&e&&(q.TgZ(0,"mat-option",42),q._UZ(1,"mat-checkbox",46),q._uU(2),q.qZA()),2&e){const e=t.$implicit,i=q.oxw();q.Q6J("value",e),q.xp6(1),q.Q6J("checked",i.license_display.indexOf(e.license_class)>=0),q.xp6(1),q.hij(" ",e.license_class," ")}}function te(e,t){1&e&&(q.TgZ(0,"mat-error"),q._uU(1),q.ALo(2,"translate"),q.qZA()),2&e&&(q.xp6(1),q.hij(" ",q.lcZ(2,1,"EMPLOYEE.LIST.NAME")," is required "))}function ie(e,t){1&e&&(q.TgZ(0,"mat-error"),q._uU(1),q.ALo(2,"translate"),q.qZA()),2&e&&(q.xp6(1),q.hij(" ",q.lcZ(2,1,"EMPLOYEE.LIST.LNAME")," is required "))}function oe(e,t){1&e&&(q.TgZ(0,"mat-error"),q._uU(1),q.ALo(2,"translate"),q.qZA()),2&e&&(q.xp6(1),q.hij(" ",q.lcZ(2,1,"EMPLOYEE.LIST.USERNAME")," is required "))}function le(e,t){1&e&&(q.TgZ(0,"mat-error"),q._uU(1),q.ALo(2,"translate"),q.qZA()),2&e&&(q.xp6(1),q.hij(" ",q.lcZ(2,1,"EMPLOYEE.LIST.PASSWORD")," is required "))}function ae(e,t){1&e&&(q.TgZ(0,"mat-error"),q._uU(1," Please enter a valid email address "),q.qZA())}const se=[{path:"employee-list",component:G},{path:"add-employee",component:(()=>{class e{constructor(e,t,i,o,l,a){this.fb=e,this.employeeService=t,this.modalService=i,this.toastrService=o,this.spinner=l,this.router=a,this.selectable=!0,this.removable=!0,this.separatorKeysCodes=[f.K5,f.OC],this.license_selected=[],this.license_display=[],this.hide=!0,this.license_type=new g.NI("",{validators:[e=>"string"==typeof e.value?{invalidAutocompleteObject:{value:e.value}}:null,g.kI.required]})}ngOnInit(){this.getLicenseList(),this.getRoleList(),this.addEmployee=this.fb.group({name:["",g.kI.required],last_name:["",g.kI.required],user_name:["",g.kI.required],password:["",g.kI.required],role:["",g.kI.required],img_type:[""],img:[""],mobile_no:[""],email_id:["",[g.kI.required,g.kI.email,g.kI.minLength(5)]]})}getRoleList(){this.employeeService.getRoleList().subscribe(e=>{console.log("client--------",e),this.roleList=e})}getLicenseList(){this.employeeService.getLicenseClassList().subscribe(e=>{console.log("client--------",e),this.licenseTypeData=e.data,console.log("this.this.license_type=========",this.license_type),this.licenseTypeList=this.license_type.valueChanges.pipe((0,$.O)(""),(0,E.U)(e=>e?this._filterLicenseType(e):this.licenseTypeData.slice()))})}displayFn(e){return e&&e.license_class?e.license_class:""}_filterLicenseType(e){console.log("name=====",e);const t=e.toLowerCase();return this.licenseTypeData.filter(e=>e.license_class.toLowerCase().includes(t))}add(e){const t=e.input,i=e.value;console.log("------------",i),(i||"").trim()&&this.license_selected.push(i),t&&(t.value=""),this.license_type.setValue(null)}remove(e){const t=this.license_display.indexOf(e);t>=0&&this.license_display.splice(t,1),this.license_selected=this.license_selected.filter(t=>t.license_class!=e)}selectedListType(e){const t=e.option.value.license_class;console.log("newValue=======",t,this.license_selected.length),this.license_display.includes(t)?(this.license_display=[...this.license_display.filter(e=>e!==t)],this.license_selected=[...this.license_selected.filter(t=>t.id!==e.option.value.id)]):(this.license_display.push(t),this.license_selected.push({id:e.option.value.id,license_class:e.option.value.license_class})),this.licenceInput.nativeElement.value="",this.license_type.setValue(null),requestAnimationFrame(()=>{this.openAuto(this.matACTrigger)})}openAuto(e){e.openPanel(),this.licenceInput.nativeElement.focus(),console.log(e)}onFileChange(e){const t=new FileReader;if(e.target.files&&e.target.files.length){const[i]=e.target.files;t.readAsDataURL(i),t.onload=()=>{this.addEmployee.patchValue({img:i})}}}setEmployeeDetails(){var e=new FormData;e.append("baseRoot","root/Employee/"+this.addEmployee.value.user_name),e.append("UserData",JSON.stringify(this.addEmployee.value)),e.append("license_type",JSON.stringify(this.license_selected)),e.append("file",this.addEmployee.value.img),5==this.addEmployee.value.role||6==this.addEmployee.value.role?this.license_selected.length>0?(this.spinner.show(),this.employeeService.setEmployeeDetails(e).subscribe(e=>{this.spinner.hide(),"Success"==e.status?(this.toastrService.success("Created Successfully!!"),this.modalService.dismissAll(),this.router.navigate(["/admin/employee/employee-list"])):"Session Expired"==e.status?(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"])):this.toastrService.error(e.status)})):this.toastrService.warning("Please Select the License Class!!"):(this.spinner.show(),this.employeeService.setEmployeeDetails(e).subscribe(e=>{this.spinner.hide(),"Success"==e.status?(this.toastrService.success("Created Successfully!!"),this.modalService.dismissAll(),this.router.navigate(["/admin/employee/employee-list"])):"Session Expired"==e.status?(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"])):this.toastrService.error(e.status)}))}backToEmployeeList(){this.router.navigate(["/admin/employee/employee-list"])}}return e.\u0275fac=function(t){return new(t||e)(q.Y36(g.qu),q.Y36(v),q.Y36(_.FF),q.Y36(b._W),q.Y36(y.t2),q.Y36(A.F0))},e.\u0275cmp=q.Xpm({type:e,selectors:[["app-add-employee"]],viewQuery:function(e,t){if(1&e&&(q.Gf(K,5),q.Gf(X,5)),2&e){let e;q.iGM(e=q.CRH())&&(t.matACTrigger=e.first),q.iGM(e=q.CRH())&&(t.licenceInput=e.first)}},decls:119,vars:59,consts:[["bdColor","rgba(51,51,51,0.8)","size","medium","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],[1,"content"],[1,"container-fluid"],[1,"block-header"],[1,"row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12"],[1,"breadcrumb","breadcrumb-style"],[1,"breadcrumb-item"],[1,"page-title"],[1,"row","clearfix"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12"],[1,"card"],[1,"header"],[1,"body"],[1,"m-4",3,"formGroup"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-2"],[1,"example-full-width"],["formControlName","role","required",""],[3,"value",4,"ngFor","ngForOf"],["aria-label","Fruit selection"],["chipList",""],[3,"selectable","removable","removed",4,"ngFor","ngForOf"],["type","text","matInput","",3,"matChipInputFor","matChipInputSeparatorKeyCodes","formControl","matAutocomplete","matChipInputTokenEnd"],["licenceInput","","autocompleteTrigger","matAutocompleteTrigger"],["autoActiveFirstOption","",3,"optionSelected"],["autoLicense","matAutocomplete"],["mat-icon-button","","matSuffix","",2,"width","34px","height","34px",3,"click"],[2,"width","34px"],["matInput","","formControlName","name","required",""],["matSuffix",""],[4,"ngIf"],["matInput","","formControlName","last_name","required",""],["matInput","","formControlName","user_name","required",""],["matInput","","formControlName","password","required","",3,"type"],["href","#","onClick","return false;","matSuffix","",1,"show-pwd-icon",3,"click"],["matInput","","formControlName","mobile_no"],["matInput","","formControlName","email_id"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],[3,"placeholder","change"],["mat-raised-button","","color","primary",1,"btn-space",3,"disabled","click"],["type","button","mat-button","",3,"click"],[3,"value"],[3,"selectable","removable","removed"],["matChipRemove","",4,"ngIf"],["matChipRemove",""],["color","primary",2,"padding","0 12px",3,"checked"]],template:function(e,t){if(1&e){const e=q.EpF();q.TgZ(0,"ngx-spinner",0),q.TgZ(1,"p",1),q._uU(2,"Loading..."),q.qZA(),q.qZA(),q.TgZ(3,"section",2),q.TgZ(4,"div",3),q.TgZ(5,"div",4),q.TgZ(6,"div",5),q.TgZ(7,"div",6),q.TgZ(8,"ul",7),q.TgZ(9,"li",8),q.TgZ(10,"h4",9),q._uU(11),q.ALo(12,"translate"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.TgZ(13,"div",10),q.TgZ(14,"div",11),q.TgZ(15,"div",12),q.TgZ(16,"div",13),q.TgZ(17,"h2"),q._uU(18),q.ALo(19,"translate"),q.qZA(),q.qZA(),q.TgZ(20,"div",14),q.TgZ(21,"form",15),q.TgZ(22,"div",5),q.TgZ(23,"div",16),q.TgZ(24,"mat-form-field",17),q.TgZ(25,"mat-label"),q._uU(26),q.ALo(27,"translate"),q.qZA(),q.TgZ(28,"mat-select",18),q.YNc(29,W,2,2,"mat-option",19),q.qZA(),q.qZA(),q.qZA(),q.TgZ(30,"div",16),q.TgZ(31,"mat-form-field",17),q.TgZ(32,"mat-chip-list",20,21),q.YNc(34,V,3,4,"mat-chip",22),q.TgZ(35,"mat-label"),q._uU(36),q.ALo(37,"translate"),q.qZA(),q.TgZ(38,"input",23,24),q.NdJ("matChipInputTokenEnd",function(e){return t.add(e)}),q.qZA(),q.qZA(),q.TgZ(41,"mat-autocomplete",25,26),q.NdJ("optionSelected",function(e){return t.selectedListType(e)}),q.YNc(43,ee,3,3,"mat-option",19),q.ALo(44,"async"),q.qZA(),q.TgZ(45,"button",27),q.NdJ("click",function(){q.CHM(e);const i=q.MAs(40);return t.openAuto(i)}),q.TgZ(46,"mat-icon",28),q._uU(47,"expand_more"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.TgZ(48,"div",16),q.TgZ(49,"mat-form-field",17),q.TgZ(50,"mat-label"),q._uU(51),q.ALo(52,"translate"),q.qZA(),q._UZ(53,"input",29),q.TgZ(54,"mat-icon",30),q._uU(55,"face"),q.qZA(),q.YNc(56,te,3,3,"mat-error",31),q.qZA(),q.qZA(),q.TgZ(57,"div",16),q.TgZ(58,"mat-form-field",17),q.TgZ(59,"mat-label"),q._uU(60),q.ALo(61,"translate"),q.qZA(),q._UZ(62,"input",32),q.TgZ(63,"mat-icon",30),q._uU(64,"face"),q.qZA(),q.YNc(65,ie,3,3,"mat-error",31),q.qZA(),q.qZA(),q.qZA(),q.TgZ(66,"div",5),q.TgZ(67,"div",16),q.TgZ(68,"mat-form-field",17),q.TgZ(69,"mat-label"),q._uU(70),q.ALo(71,"translate"),q.qZA(),q._UZ(72,"input",33),q.TgZ(73,"mat-icon",30),q._uU(74,"face"),q.qZA(),q.YNc(75,oe,3,3,"mat-error",31),q.qZA(),q.qZA(),q.TgZ(76,"div",16),q.TgZ(77,"mat-form-field",17),q.TgZ(78,"mat-label"),q._uU(79),q.ALo(80,"translate"),q.qZA(),q._UZ(81,"input",34),q.TgZ(82,"a",35),q.NdJ("click",function(){return t.hide=!t.hide}),q.TgZ(83,"mat-icon"),q._uU(84),q.qZA(),q.qZA(),q.YNc(85,le,3,3,"mat-error",31),q.qZA(),q.qZA(),q.qZA(),q.TgZ(86,"div",5),q.TgZ(87,"div",16),q.TgZ(88,"mat-form-field",17),q.TgZ(89,"mat-label"),q._uU(90),q.ALo(91,"translate"),q.qZA(),q._UZ(92,"input",36),q.TgZ(93,"mat-icon",30),q._uU(94,"phone"),q.qZA(),q.qZA(),q.qZA(),q.TgZ(95,"div",16),q.TgZ(96,"mat-form-field",17),q.TgZ(97,"mat-label"),q._uU(98),q.ALo(99,"translate"),q.qZA(),q._UZ(100,"input",37),q.TgZ(101,"mat-icon",30),q._uU(102,"email"),q.qZA(),q.YNc(103,ae,2,0,"mat-error",31),q.qZA(),q.qZA(),q.qZA(),q.TgZ(104,"div",5),q.TgZ(105,"div",38),q.TgZ(106,"mat-form-field",17),q.TgZ(107,"ngx-mat-file-input",39),q.NdJ("change",function(e){return t.onFileChange(e)}),q.ALo(108,"translate"),q.qZA(),q.TgZ(109,"mat-icon",30),q._uU(110,"cloud_upload"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.TgZ(111,"div",5),q.TgZ(112,"div",38),q.TgZ(113,"button",40),q.NdJ("click",function(){return t.setEmployeeDetails()}),q._uU(114),q.ALo(115,"translate"),q.qZA(),q.TgZ(116,"button",41),q.NdJ("click",function(){return t.backToEmployeeList()}),q._uU(117),q.ALo(118,"translate"),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q.qZA()}if(2&e){const e=q.MAs(33),i=q.MAs(42);q.xp6(11),q.hij(" ",q.lcZ(12,31,"EMPLOYEE.TITLE"),""),q.xp6(7),q.hij(" ",q.lcZ(19,33,"EMPLOYEE.TITLE"),""),q.xp6(3),q.Q6J("formGroup",t.addEmployee),q.xp6(5),q.Oqu(q.lcZ(27,35,"EMPLOYEE.LIST.ROLE")),q.xp6(3),q.Q6J("ngForOf",t.roleList),q.xp6(5),q.Q6J("ngForOf",t.license_display),q.xp6(2),q.Oqu(q.lcZ(37,37,"PACKAGE.LIST.LICENSE-TYPE")),q.xp6(2),q.Q6J("matChipInputFor",e)("matChipInputSeparatorKeyCodes",t.separatorKeysCodes)("formControl",t.license_type)("matAutocomplete",i),q.xp6(5),q.Q6J("ngForOf",q.lcZ(44,39,t.licenseTypeList)),q.xp6(8),q.Oqu(q.lcZ(52,41,"EMPLOYEE.LIST.NAME")),q.xp6(5),q.Q6J("ngIf",t.addEmployee.get("name").hasError("required")),q.xp6(4),q.Oqu(q.lcZ(61,43,"EMPLOYEE.LIST.LNAME")),q.xp6(5),q.Q6J("ngIf",t.addEmployee.get("last_name").hasError("required")),q.xp6(5),q.Oqu(q.lcZ(71,45,"EMPLOYEE.LIST.USERNAME")),q.xp6(5),q.Q6J("ngIf",t.addEmployee.get("user_name").hasError("required")),q.xp6(4),q.Oqu(q.lcZ(80,47,"EMPLOYEE.LIST.PASSWORD")),q.xp6(2),q.Q6J("type",t.hide?"password":"text"),q.xp6(1),q.uIk("aria-label","Hide password")("aria-pressed",t.hide),q.xp6(2),q.Oqu(t.hide?"visibility_off":"visibility"),q.xp6(1),q.Q6J("ngIf",t.addEmployee.get("password").hasError("required")),q.xp6(5),q.Oqu(q.lcZ(91,49,"EMPLOYEE.LIST.MOBILENO")),q.xp6(8),q.Oqu(q.lcZ(99,51,"EMPLOYEE.LIST.EMAILID")),q.xp6(5),q.Q6J("ngIf",t.addEmployee.get("email_id").hasError("email")&&t.addEmployee.get("email_id").touched),q.xp6(4),q.s9C("placeholder",q.lcZ(108,53,"EMPLOYEE.LIST.PROFILE-IMG")),q.xp6(6),q.Q6J("disabled",!t.addEmployee.valid),q.xp6(1),q.Oqu(q.lcZ(115,55,"BUTTON.ADD-BTN")),q.xp6(3),q.Oqu(q.lcZ(118,57,"BUTTON.BACK-BTN"))}},directives:[y.Ro,g._Y,g.JL,g.sg,d.KE,d.hX,Z.gD,g.JJ,g.u,g.Q7,o.sg,x.qn,m.Nt,x.oH,g.Fj,I.ZL,g.oH,I.XC,c.lW,d.R9,n.Hw,o.O5,h.Yh,U.ey,x.HS,x.qH,S.oG,d.TO],pipes:[O.X$,o.Ov],styles:[""]}),e})()}];let re=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=q.oAB({type:e}),e.\u0275inj=q.cJS({imports:[[A.Bz.forChild(se)],A.Bz]}),e})(),ne=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=q.oAB({type:e}),e.\u0275inj=q.cJS({providers:[v],imports:[[o.ez,I.Bb,a.xD,y.ef,d.lN,m.c,u.ZX,Z.LD,g.u5,g.UX,h.Ad,re,O.aw,s.Ns.forRoot({echarts:()=>i.e(4981).then(i.t.bind(i,74981,23))}),l.Xd,n.Ps,r.X,c.ot,p.Tx,S.p9,x.Hi]]}),e})()}}]);