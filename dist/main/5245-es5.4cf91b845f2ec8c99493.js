!function(){function e(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,i){if(!e)return;if("string"==typeof e)return t(e,i);var s=Object.prototype.toString.call(e).slice(8,-1);"Object"===s&&e.constructor&&(s=e.constructor.name);if("Map"===s||"Set"===s)return Array.from(e);if("Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))return t(e,i)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,s=new Array(t);i<t;i++)s[i]=e[i];return s}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function n(e,t,i){return t&&s(e.prototype,t),i&&s(e,i),e}(self.webpackChunksmart=self.webpackChunksmart||[]).push([[5245],{25245:function(t,s,r){"use strict";r.r(s),r.d(s,{PreRequisiteModule:function(){return oe}});var o=r(61116),a=r(35729),l=r(17647),u=r(35366),c=r(42693),d=r(92935),m=r(91681),g=r(529),p=function(){var e=function(){function e(t){i(this,e),this.http=t}return n(e,[{key:"getLicenseClassList",value:function(){return this.http.get("".concat(g.N.apiUrl,"/webRoutes/getLicenseClassList")).pipe((0,m.U)(function(e){return e}))}},{key:"setPreRequisiteDetails",value:function(e,t,i){return this.http.post("".concat(g.N.apiUrl,"/webRoutes/setPreRequisiteDetails"),{license_type:e,preRequisitesList:t,reqDocumentsList:i}).pipe((0,m.U)(function(e){return e}))}},{key:"updatePreRequisiteDetails",value:function(e,t,i){return this.http.post("".concat(g.N.apiUrl,"/webRoutes/updatePreRequisiteDetails"),{license_type:e,preRequisitesList:t,reqDocumentsList:i}).pipe((0,m.U)(function(e){return e}))}},{key:"getPreRequisitesDetails",value:function(){return this.http.get("".concat(g.N.apiUrl,"/webRoutes/getPreRequisitesDetails")).pipe((0,m.U)(function(e){return e}))}},{key:"checkPreRequistiesExistence",value:function(e){return this.http.post("".concat(g.N.apiUrl,"/webRoutes/checkPreRequistiesExistence"),{license_type:e}).pipe((0,m.U)(function(e){return e}))}},{key:"deletePrequisitesDetails",value:function(e){return this.http.post("".concat(g.N.apiUrl,"/webRoutes/deletePrequisitesDetails"),{rowToDelete:e}).pipe((0,m.U)(function(e){return e}))}},{key:"getPreRequisitesDetailsToEdit",value:function(e){return this.http.post("".concat(g.N.apiUrl,"/webRoutes/getPreRequisitesDetailsToEdit"),{license_type:e}).pipe((0,m.U)(function(e){return e}))}}]),e}();return e.\u0275fac=function(t){return new(t||e)(u.LFG(c.eN))},e.\u0275prov=u.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e}(),q=r(63589),Z=r(24486),h=r(31269),f=r(94784),v=r(50518),T=r(84369),A=r(77307),y=r(60649);function R(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"span"),u.TgZ(1,"button",35),u.NdJ("click",function(){var e=u.CHM(i),t=e.row,s=e.rowIndex;return u.oxw().editPreRequisite(t,s)}),u.TgZ(2,"mat-icon",36),u._uU(3,"edit "),u.qZA(),u.qZA(),u.TgZ(4,"button",37),u.NdJ("click",function(){var e=u.CHM(i),t=e.row,s=e.rowIndex,n=u.oxw(),r=u.MAs(55);return n.deletePreRequisite(t,s,r)}),u.TgZ(5,"mat-icon",38),u._uU(6,"delete "),u.qZA(),u.qZA(),u.qZA()}}function b(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",39),u.TgZ(1,"h4",40),u.TgZ(2,"div",41),u.TgZ(3,"div",42),u.TgZ(4,"div",43),u._uU(5," Delete PreRequisites"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(6,"button",44),u.NdJ("click",function(){return u.CHM(i).$implicit.dismiss("Cross click")}),u.TgZ(7,"span",45),u.TgZ(8,"i",46),u._uU(9,"close"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(10,"div",47),u.TgZ(11,"p"),u._uU(12,"Are you sure?"),u.qZA(),u.TgZ(13,"div",48),u.TgZ(14,"div",49),u.TgZ(15,"button",50),u.NdJ("click",function(){return u.CHM(i),u.oxw().deletePrequisitesDetails()}),u._uU(16,"Delete"),u.qZA(),u.TgZ(17,"button",51),u.NdJ("click",function(){return u.CHM(i).$implicit.close()}),u._uU(18,"Cancel"),u.qZA(),u.qZA(),u.qZA(),u.qZA()}}var _=function(){var e=function(){function e(t,s,n,r,o,a,l,u,c){i(this,e),this.httpClient=t,this.dialog=s,this.preRequisiteService=n,this.snackBar=r,this.router=o,this.modalService=a,this.spinner=l,this.languageService=u,this.toastrService=c,this.columns=[{name:"License Code"},{name:"License Type"}],this.data=[],this.filteredData=[],this.translateVal="ml"==localStorage.lang?"malay":"english"}return n(e,[{key:"ngOnInit",value:function(){var e=this;this.loadData(),this.languageService.languageChanged.subscribe(function(t){e.translateVal="ml"==localStorage.lang?"malay":"english",e.loadData()})}},{key:"refresh",value:function(){this.loadData()}},{key:"addNewPreRequisite",value:function(){this.router.navigate(["/admin/pre-requisite/add-pre-requisite"])}},{key:"loadData",value:function(){var e=this;this.spinner.show(),this.preRequisiteService.getPreRequisitesDetails().subscribe(function(t){console.log("res['data']=========",t.data),e.spinner.hide();for(var i=0;i<t.data.length;i++)t.data[i].license_type=t.data[i][e.translateVal];e.data=t.data,e.filteredData=t.data})}},{key:"filterDatatable",value:function(e){var t=e.target.value.toLowerCase(),i=this.columns.length,s=Object.keys(this.filteredData[0]);this.data=this.filteredData.filter(function(e){for(var n=0;n<i;n++)if(-1!==e[s[n]].toString().toLowerCase().indexOf(t)||!t)return!0}),this.table.offset=0}},{key:"editPreRequisite",value:function(e,t){console.log("rowww===",e),this.router.navigate(["/admin/pre-requisite/edit-pre-requisite",e.license_type_id])}},{key:"deletePreRequisite",value:function(e,t,i){this.modalService.open(i,{ariaLabelledBy:"modal-basic-title"}),this.rowToDelete=e}},{key:"deletePrequisitesDetails",value:function(){var e=this;this.spinner.show(),this.preRequisiteService.deletePrequisitesDetails(this.rowToDelete).subscribe(function(t){e.spinner.hide(),"Session Expired"==t.status?(e.toastrService.error("Session Expired!!!"),e.router.navigate(["/authentication/signin"])):(e.toastrService.success("Deleted Successfully!!!"),e.modalService.dismissAll(),e.loadData())})}}]),e}();return e.\u0275fac=function(t){return new(t||e)(u.Y36(c.eN),u.Y36(d.uw),u.Y36(p),u.Y36(q.ux),u.Y36(a.F0),u.Y36(Z.FF),u.Y36(h.t2),u.Y36(f.T),u.Y36(v._W))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-pre-requisite-list"]],viewQuery:function(e,t){var i;(1&e&&u.Gf(l.nE,5),2&e)&&(u.iGM(i=u.CRH())&&(t.table=i.first))},decls:56,vars:22,consts:[["bdColor","rgba(51,51,51,0.8)","size","medium","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],[1,"content"],[1,"container-fluid"],[1,"block-header"],[1,"row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12"],[1,"breadcrumb","breadcrumb-style"],[1,"breadcrumb-item"],[1,"page-title"],[1,"col-md-12"],[1,"mt-5"],[1,"col-lg-12","col-md-12","col-sm-12","col-xs-12"],[1,"card"],[1,"body"],[1,"table-responsive"],[1,"materialTableHeader"],[1,"col-8"],[1,"header-buttons-left","ml-0"],[1,"dropdown"],[1,"dropdown","m-l-20"],["for","search-input"],[1,"material-icons","search-icon"],["placeholder","Search","type","text","aria-label","Search box",1,"browser-default","search-field",3,"keyup"],[1,"col-4"],[1,"header-buttons"],[1,"icon-button-demo"],["mat-mini-fab","","color","primary",3,"click"],[1,"col-white"],[1,"material",3,"rows","columns","sortType","columnMode","headerHeight","footerHeight","rowHeight","limit"],["table",""],["prop","license_type",3,"name","width"],["sortable","false",3,"name","width"],["ngx-datatable-cell-template",""],["deleteRecord",""],["mat-icon-button","","color","accent",1,"btn-tbl-edit",3,"click"],["aria-label","Edit",1,"col-white"],["mat-icon-button","","color","accent",1,"btn-tbl-delete",3,"click"],["aria-label","Delete",1,"col-white"],[1,"modal-header","deleteRowModal"],["id","modal-basic-title",1,"modal-title"],[1,"modal-header"],[1,"modal-about"],[1,"font-weight-bold","p-t-10","font-17"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"material-icons"],[1,"modal-body"],[1,"modal-footer"],[1,"button-demo"],["mat-raised-button","","type","submit","color","primary",3,"click"],["mat-button","","type","button",3,"click"]],template:function(e,t){1&e&&(u.TgZ(0,"ngx-spinner",0),u.TgZ(1,"p",1),u._uU(2,"Loading..."),u.qZA(),u.qZA(),u.TgZ(3,"section",2),u.TgZ(4,"div",3),u.TgZ(5,"div",4),u.TgZ(6,"div",5),u.TgZ(7,"div",6),u.TgZ(8,"ul",7),u.TgZ(9,"li",8),u.TgZ(10,"h4",9),u._uU(11),u.ALo(12,"translate"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(13,"div",5),u.TgZ(14,"div",10),u.TgZ(15,"div",11),u.TgZ(16,"div",12),u.TgZ(17,"div",13),u.TgZ(18,"div",14),u.TgZ(19,"div",15),u.TgZ(20,"div",16),u.TgZ(21,"div",5),u.TgZ(22,"div",17),u.TgZ(23,"ul",18),u.TgZ(24,"li",19),u.TgZ(25,"h2"),u.TgZ(26,"strong"),u._uU(27),u.ALo(28,"translate"),u.qZA(),u.qZA(),u.qZA(),u.TgZ(29,"li",20),u.TgZ(30,"label",21),u.TgZ(31,"i",22),u._uU(32,"search"),u.qZA(),u.qZA(),u.TgZ(33,"input",23),u.NdJ("keyup",function(e){return t.filterDatatable(e)}),u.qZA(),u.qZA(),u._UZ(34,"li"),u.qZA(),u.qZA(),u.TgZ(35,"div",24),u.TgZ(36,"ul",25),u.TgZ(37,"li"),u.TgZ(38,"div",26),u.TgZ(39,"button",27),u.NdJ("click",function(){return t.addNewPreRequisite()}),u.TgZ(40,"mat-icon",28),u._uU(41,"add"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(42,"li"),u.TgZ(43,"div",26),u.TgZ(44,"button",27),u.NdJ("click",function(){return t.refresh()}),u.TgZ(45,"mat-icon",28),u._uU(46,"refresh "),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(47,"ngx-datatable",29,30),u._UZ(49,"ngx-datatable-column",31),u.ALo(50,"translate"),u.TgZ(51,"ngx-datatable-column",32),u.ALo(52,"translate"),u.YNc(53,R,7,0,"ng-template",33),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.YNc(54,b,19,0,"ng-template",null,34,u.W1O)),2&e&&(u.xp6(11),u.Oqu(u.lcZ(12,14,"PRE-REQUISITE.LISTTITLE")),u.xp6(16),u.Oqu(u.lcZ(28,16,"PRE-REQUISITE.LISTTITLE")),u.xp6(20),u.Q6J("rows",t.data)("columns",t.columns)("sortType","multi")("columnMode","force")("headerHeight",50)("footerHeight",50)("rowHeight","60")("limit",5),u.xp6(2),u.s9C("name",u.lcZ(50,18,"PRE-REQUISITE.LICENSE-TYPE")),u.Q6J("width",130),u.xp6(2),u.s9C("name",u.lcZ(52,20,"PRE-REQUISITE.ACTION")),u.Q6J("width",120))},directives:[h.Ro,T.lW,A.Hw,l.nE,l.UC,l.vq],pipes:[y.X$],styles:[""]}),e}(),x=r(31041),E=r(81258),D=r(99235),k=r(13070),L=r(95522),P=r(9550),N=r(79961),w=r(87064),U=r(40994),C=["autocompleteTrigger"],F=["licenceInput"];function I(e,t){1&e&&(u.TgZ(0,"mat-icon",41),u._uU(1,"cancel"),u.qZA())}function S(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"mat-chip",39),u.NdJ("removed",function(){var e=u.CHM(i).$implicit;return u.oxw().remove(e)}),u._uU(1),u.YNc(2,I,2,0,"mat-icon",40),u.qZA()}if(2&e){var s=t.$implicit,n=u.oxw();u.Q6J("selectable",n.selectable)("removable",n.removable),u.xp6(1),u.hij(" ",s," "),u.xp6(1),u.Q6J("ngIf",n.removable)}}function J(e,t){if(1&e&&(u.TgZ(0,"mat-option",42),u._UZ(1,"mat-checkbox",43),u._uU(2),u.qZA()),2&e){var i=t.$implicit,s=u.oxw();u.Q6J("value",i.license_class),u.xp6(1),u.Q6J("checked",s.license_selected.indexOf(i.license_class)>=0),u.xp6(1),u.hij(" ",i.license_class," ")}}function Q(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",44),u.TgZ(1,"mat-form-field",45),u._UZ(2,"input",46),u.TgZ(3,"button",47),u.NdJ("click",function(){var e=u.CHM(i).index;return u.oxw().removePreRequisiteEnglish(e)}),u.TgZ(4,"mat-icon"),u._uU(5,"remove"),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&e){var s=t.index;u.xp6(2),u.Q6J("formControlName",s),u.xp6(1),u.Q6J("disabled",0==s)}}function O(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",44),u.TgZ(1,"mat-form-field",45),u._UZ(2,"input",46),u.TgZ(3,"button",47),u.NdJ("click",function(){var e=u.CHM(i).index;return u.oxw().removePreRequisiteMalay(e)}),u.TgZ(4,"mat-icon"),u._uU(5,"remove"),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&e){var s=t.index;u.xp6(2),u.Q6J("formControlName",s),u.xp6(1),u.Q6J("disabled",0==s)}}function M(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",44),u.TgZ(1,"mat-form-field",45),u._UZ(2,"input",46),u.TgZ(3,"button",47),u.NdJ("click",function(){var e=u.CHM(i).index;return u.oxw().removeReqDocumentsEnglish(e)}),u.TgZ(4,"mat-icon"),u._uU(5,"remove"),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&e){var s=t.index;u.xp6(2),u.Q6J("formControlName",s),u.xp6(1),u.Q6J("disabled",0==s)}}function Y(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",44),u.TgZ(1,"mat-form-field",45),u._UZ(2,"input",46),u.TgZ(3,"button",47),u.NdJ("click",function(){var e=u.CHM(i).index;return u.oxw().removeReqDocumentsMalay(e)}),u.TgZ(4,"mat-icon"),u._uU(5,"remove"),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&e){var s=t.index;u.xp6(2),u.Q6J("formControlName",s),u.xp6(1),u.Q6J("disabled",0==s)}}function H(e,t){if(1&e&&(u.TgZ(0,"mat-option",34),u._uU(1),u.qZA()),2&e){var i=t.$implicit,s=u.oxw();u.Q6J("value",i),u.xp6(1),u.AsE(" ",i[s.translateVal]," - ",i.code," ")}}function j(e,t){if(1&e&&(u.TgZ(0,"div"),u._uU(1),u.qZA()),2&e){var i=u.oxw().$implicit;u.xp6(1),u.hij(" ",i.message," ")}}function B(e,t){if(1&e&&(u.TgZ(0,"mat-error"),u.YNc(1,j,2,1,"div",35),u.qZA()),2&e){var i=t.$implicit,s=u.oxw();u.xp6(1),u.Q6J("ngIf",s.license_type.hasError(i.type))}}function V(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",36),u.TgZ(1,"mat-form-field",17),u._UZ(2,"input",37),u.TgZ(3,"button",38),u.NdJ("click",function(){var e=u.CHM(i).index;return u.oxw().removePreRequisiteEnglish(e)}),u.TgZ(4,"mat-icon"),u._uU(5,"remove"),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&e){var s=t.index;u.xp6(2),u.Q6J("formControlName",s),u.xp6(1),u.Q6J("disabled",0==s)}}function G(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",36),u.TgZ(1,"mat-form-field",17),u._UZ(2,"input",37),u.TgZ(3,"button",38),u.NdJ("click",function(){var e=u.CHM(i).index;return u.oxw().removePreRequisiteMalay(e)}),u.TgZ(4,"mat-icon"),u._uU(5,"remove"),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&e){var s=t.index;u.xp6(2),u.Q6J("formControlName",s),u.xp6(1),u.Q6J("disabled",0==s)}}function z(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",36),u.TgZ(1,"mat-form-field",17),u._UZ(2,"input",37),u.TgZ(3,"button",38),u.NdJ("click",function(){var e=u.CHM(i).index;return u.oxw().removeReqDocumentsEnglish(e)}),u.TgZ(4,"mat-icon"),u._uU(5,"remove"),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&e){var s=t.index;u.xp6(2),u.Q6J("formControlName",s),u.xp6(1),u.Q6J("disabled",0==s)}}function X(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",36),u.TgZ(1,"mat-form-field",17),u._UZ(2,"input",37),u.TgZ(3,"button",38),u.NdJ("click",function(){var e=u.CHM(i).index;return u.oxw().removeReqDocumentsMalay(e)}),u.TgZ(4,"mat-icon"),u._uU(5,"remove"),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&e){var s=t.index;u.xp6(2),u.Q6J("formControlName",s),u.xp6(1),u.Q6J("disabled",0==s)}}var $,W,K,ee=[{path:"pre-requisite-list",component:_},{path:"add-pre-requisite",component:(W=function(){function t(e,s,n,r,o,a,l,u){i(this,t),this.cdRef=e,this.fb=s,this.languageService=n,this.toastrService=r,this.router=o,this.route=a,this.preRequisiteService=l,this.spinner=u,this.preRequisitesList=[],this.reqDocumentsList=[],this.selectable=!0,this.removable=!0,this.separatorKeysCodes=[D.K5,D.OC],this.license_selected=[],this.license_type=new x.NI("",{validators:[function(e){return"string"==typeof e.value?{invalidAutocompleteObject:{value:e.value}}:null},x.kI.required]}),this.translateVal="ml"==localStorage.lang?"malay":"english",this.validation_msgs={license_type:[{type:"invalidAutocompleteObject",message:"License Type not recognized. Click one of the options."},{type:"required",message:"License Type is required."}]},this.addPreRequisiteForm=this.fb.group({preRequisites_english:this.fb.array([this.fb.control("")]),preRequisites_malay:this.fb.array([this.fb.control("")]),reqDocuments_english:this.fb.array([this.fb.control("")]),reqDocuments_malay:this.fb.array([this.fb.control("")])})}return n(t,[{key:"ngOnInit",value:function(){var e=this;this.getLicenseList(),this.languageService.languageChanged.subscribe(function(t){e.translateVal="ml"==localStorage.lang?"malay":"english",e.getLicenseList()})}},{key:"getLicenseList",value:function(){var e=this;this.preRequisiteService.getLicenseClassList().subscribe(function(t){console.log("client--------",t),e.licenseTypeData=t.data,console.log("this.this.license_type=========",e.license_type),e.licenseTypeList=e.license_type.valueChanges.pipe((0,E.O)(""),(0,m.U)(function(t){return t?e._filterLicenseType(t):e.licenseTypeData.slice()}))})}},{key:"add",value:function(e){var t=e.input,i=e.value;console.log("------------",i),(i||"").trim()&&this.license_selected.push(i),t&&(t.value=""),this.license_type.setValue(null)}},{key:"remove",value:function(e){var t=this.license_selected.indexOf(e);t>=0&&this.license_selected.splice(t,1)}},{key:"selectedListType",value:function(t){var i=this,s=t.option.viewValue;console.log("newValue=======",t.option.viewValue),this.license_selected.includes(s)?this.license_selected=e(this.license_selected.filter(function(e){return e!==s})):this.license_selected.push(t.option.viewValue),this.licenceInput.nativeElement.value="",this.license_type.setValue(null),requestAnimationFrame(function(){i.openAuto(i.matACTrigger)})}},{key:"openAuto",value:function(e){e.openPanel(),this.licenceInput.nativeElement.focus(),console.log(e)}},{key:"displayFn",value:function(e){return e&&e.license_class?e.license_class:""}},{key:"_filterLicenseType",value:function(e){console.log("name=====",e);var t=e.toLowerCase();return this.licenseTypeData.filter(function(e){return e.license_class.toLowerCase().includes(t)})}},{key:"preRequisites_english",get:function(){return this.addPreRequisiteForm.get("preRequisites_english")}},{key:"preRequisites_malay",get:function(){return this.addPreRequisiteForm.get("preRequisites_malay")}},{key:"reqDocuments_english",get:function(){return this.addPreRequisiteForm.get("reqDocuments_english")}},{key:"reqDocuments_malay",get:function(){return this.addPreRequisiteForm.get("reqDocuments_malay")}},{key:"addNewPreRequisiteEnglish",value:function(){this.preRequisites_english.push(this.fb.control(""))}},{key:"removePreRequisiteEnglish",value:function(e){this.addPreRequisiteForm.get("preRequisites_english").removeAt(e)}},{key:"addNewPreRequisiteMalay",value:function(){this.preRequisites_malay.push(this.fb.control(""))}},{key:"removePreRequisiteMalay",value:function(e){this.addPreRequisiteForm.get("preRequisites_malay").removeAt(e)}},{key:"addNewReqDocumentsEnglish",value:function(){this.reqDocuments_english.push(this.fb.control(""))}},{key:"removeReqDocumentsEnglish",value:function(e){this.addPreRequisiteForm.get("reqDocuments_english").removeAt(e)}},{key:"addNewReqDocumentsMalay",value:function(){this.reqDocuments_malay.push(this.fb.control(""))}},{key:"removeReqDocumentsMalay",value:function(e){this.addPreRequisiteForm.get("reqDocuments_malay").removeAt(e)}},{key:"onSelectionChange",value:function(){var e=this;this.preRequisiteService.checkPreRequistiesExistence(this.license_type.value.id).subscribe(function(t){"Exists"==t.status&&(e.toastrService.error("Already Exists!!!"),e.license_type.setValue(""))})}},{key:"setPreRequisiteDetails",value:function(){this.preRequisitesList=[],this.reqDocumentsList=[],console.log("this.preRequisites_english=====",this.addPreRequisiteForm.value,this.license_selected)}},{key:"goBack",value:function(){this.router.navigate(["/admin/pre-requisite/pre-requisite-list"])}}]),t}(),W.\u0275fac=function(e){return new(e||W)(u.Y36(u.sBO),u.Y36(x.qu),u.Y36(f.T),u.Y36(v._W),u.Y36(a.F0),u.Y36(a.gz),u.Y36(p),u.Y36(h.t2))},W.\u0275cmp=u.Xpm({type:W,selectors:[["app-add-pre-requisite"]],viewQuery:function(e,t){var i;1&e&&(u.Gf(C,5),u.Gf(F,5)),2&e&&(u.iGM(i=u.CRH())&&(t.matACTrigger=i.first),u.iGM(i=u.CRH())&&(t.licenceInput=i.first))},decls:100,vars:41,consts:[["bdColor","rgba(51,51,51,0.8)","size","medium","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],[1,"content"],[1,"container-fluid"],[1,"block-header"],[1,"row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12"],[1,"breadcrumb","breadcrumb-style"],[1,"breadcrumb-item"],[1,"page-title"],[1,"row","clearfix"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12"],[1,"card"],[1,"header"],[1,"body"],[1,"m-4",3,"formGroup"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-2"],["appearance","outline",1,"example-full-width"],["aria-label","Fruit selection"],["chipList",""],[3,"selectable","removable","removed",4,"ngFor","ngForOf"],["type","text","matInput","",3,"matChipInputFor","matChipInputSeparatorKeyCodes","formControl","matAutocomplete","matChipInputTokenEnd"],["licenceInput","","autocompleteTrigger","matAutocompleteTrigger"],["autoActiveFirstOption","",3,"optionSelected"],["autoLicense","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["mat-icon-button","","matSuffix","",2,"width","34px","height","34px",3,"click"],[2,"width","34px"],[1,"col-xl-11","col-lg-11","col-md-11","col-sm-11","mb-2"],["formArrayName","preRequisites_english"],["style","margin-top: 10px;margin-bottom: 10px;",4,"ngFor","ngForOf"],[1,"col-xl-1","col-lg-1","col-md-1","col-sm-1","mb-2",2,"padding-top","50px"],[2,"cursor","pointer",3,"click"],["formArrayName","preRequisites_malay"],["formArrayName","reqDocuments_english"],["formArrayName","reqDocuments_malay"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],["mat-raised-button","","color","primary",1,"btn-space",3,"disabled","click"],["type","button","mat-button","",3,"click"],[3,"selectable","removable","removed"],["matChipRemove","",4,"ngIf"],["matChipRemove",""],[3,"value"],["color","primary",2,"padding","0 12px",3,"checked"],[2,"margin-top","10px","margin-bottom","10px"],["appearance","outline",1,"example-full-width","mb-3"],["type","text","matInput","","required","",3,"formControlName"],["matSuffix","",2,"cursor","pointer","border-style","none","background-color","white",3,"disabled","click"]],template:function(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"ngx-spinner",0),u.TgZ(1,"p",1),u._uU(2,"Loading..."),u.qZA(),u.qZA(),u.TgZ(3,"section",2),u.TgZ(4,"div",3),u.TgZ(5,"div",4),u.TgZ(6,"div",5),u.TgZ(7,"div",6),u.TgZ(8,"ul",7),u.TgZ(9,"li",8),u.TgZ(10,"h4",9),u._uU(11),u.ALo(12,"translate"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(13,"div",10),u.TgZ(14,"div",11),u.TgZ(15,"div",12),u.TgZ(16,"div",13),u.TgZ(17,"h2"),u._uU(18),u.ALo(19,"translate"),u.qZA(),u.qZA(),u.TgZ(20,"div",14),u.TgZ(21,"form",15),u.TgZ(22,"div",5),u.TgZ(23,"div",16),u.TgZ(24,"mat-form-field",17),u.TgZ(25,"mat-chip-list",18,19),u.YNc(27,S,3,4,"mat-chip",20),u.TgZ(28,"mat-label"),u._uU(29),u.ALo(30,"translate"),u.qZA(),u.TgZ(31,"input",21,22),u.NdJ("matChipInputTokenEnd",function(e){return t.add(e)}),u.qZA(),u.qZA(),u.TgZ(34,"mat-autocomplete",23,24),u.NdJ("optionSelected",function(e){return t.selectedListType(e)}),u.YNc(36,J,3,3,"mat-option",25),u.ALo(37,"async"),u.qZA(),u.TgZ(38,"button",26),u.NdJ("click",function(){u.CHM(i);var e=u.MAs(33);return t.openAuto(e)}),u.TgZ(39,"mat-icon",27),u._uU(40,"expand_more"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u._UZ(41,"div",16),u.qZA(),u.TgZ(42,"div",5),u.TgZ(43,"div",16),u.TgZ(44,"div",5),u.TgZ(45,"div",28),u.TgZ(46,"label"),u._uU(47),u.ALo(48,"translate"),u.qZA(),u.TgZ(49,"div",29),u.YNc(50,Q,6,2,"div",30),u.qZA(),u.qZA(),u.TgZ(51,"div",31),u.TgZ(52,"a",32),u.NdJ("click",function(){return t.addNewPreRequisiteEnglish()}),u.TgZ(53,"mat-icon"),u._uU(54,"add"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(55,"div",16),u.TgZ(56,"div",5),u.TgZ(57,"div",28),u.TgZ(58,"label"),u._uU(59),u.ALo(60,"translate"),u.qZA(),u.TgZ(61,"div",33),u.YNc(62,O,6,2,"div",30),u.qZA(),u.qZA(),u.TgZ(63,"div",31),u.TgZ(64,"a",32),u.NdJ("click",function(){return t.addNewPreRequisiteMalay()}),u.TgZ(65,"mat-icon"),u._uU(66,"add"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(67,"div",5),u.TgZ(68,"div",16),u.TgZ(69,"div",5),u.TgZ(70,"div",28),u.TgZ(71,"label"),u._uU(72),u.ALo(73,"translate"),u.qZA(),u.TgZ(74,"div",34),u.YNc(75,M,6,2,"div",30),u.qZA(),u.qZA(),u.TgZ(76,"div",31),u.TgZ(77,"a",32),u.NdJ("click",function(){return t.addNewReqDocumentsEnglish()}),u.TgZ(78,"mat-icon"),u._uU(79,"add"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(80,"div",16),u.TgZ(81,"div",5),u.TgZ(82,"div",28),u.TgZ(83,"label"),u._uU(84),u.ALo(85,"translate"),u.qZA(),u.TgZ(86,"div",35),u.YNc(87,Y,6,2,"div",30),u.qZA(),u.qZA(),u.TgZ(88,"div",31),u.TgZ(89,"a",32),u.NdJ("click",function(){return t.addNewReqDocumentsMalay()}),u.TgZ(90,"mat-icon"),u._uU(91,"add"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(92,"div",5),u.TgZ(93,"div",36),u.TgZ(94,"button",37),u.NdJ("click",function(){return t.setPreRequisiteDetails()}),u._uU(95),u.ALo(96,"translate"),u.qZA(),u.TgZ(97,"button",38),u.NdJ("click",function(){return t.goBack()}),u._uU(98),u.ALo(99,"translate"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&e){var s=u.MAs(26),n=u.MAs(35);u.xp6(11),u.Oqu(u.lcZ(12,21,"PRE-REQUISITE.TITLE")),u.xp6(7),u.Oqu(u.lcZ(19,23,"PRE-REQUISITE.TITLE")),u.xp6(3),u.Q6J("formGroup",t.addPreRequisiteForm),u.xp6(6),u.Q6J("ngForOf",t.license_selected),u.xp6(2),u.Oqu(u.lcZ(30,25,"PACKAGE.LIST.LICENSE-TYPE")),u.xp6(2),u.Q6J("matChipInputFor",s)("matChipInputSeparatorKeyCodes",t.separatorKeysCodes)("formControl",t.license_type)("matAutocomplete",n),u.xp6(5),u.Q6J("ngForOf",u.lcZ(37,27,t.licenseTypeList)),u.xp6(11),u.hij("",u.lcZ(48,29,"PRE-REQUISITE.PRE-REQUISITE-ENG"),"*"),u.xp6(3),u.Q6J("ngForOf",t.preRequisites_english.controls),u.xp6(9),u.hij("",u.lcZ(60,31,"PRE-REQUISITE.PRE-REQUISITE-MALAY"),"*"),u.xp6(3),u.Q6J("ngForOf",t.preRequisites_malay.controls),u.xp6(10),u.hij("",u.lcZ(73,33,"PRE-REQUISITE.REQ-DOCUMENT-ENG"),"*"),u.xp6(3),u.Q6J("ngForOf",t.reqDocuments_english.controls),u.xp6(9),u.hij("",u.lcZ(85,35,"PRE-REQUISITE.REQ-DOCUMENT-MALAY"),"*"),u.xp6(3),u.Q6J("ngForOf",t.reqDocuments_malay.controls),u.xp6(7),u.Q6J("disabled",0==t.license_selected.length||!t.addPreRequisiteForm.valid||0==t.addPreRequisiteForm.value.preRequisites_english.length||0==t.addPreRequisiteForm.value.preRequisites_malay.length||0==t.addPreRequisiteForm.value.reqDocuments_english.length||0==t.addPreRequisiteForm.value.reqDocuments_malay.length),u.xp6(1),u.Oqu(u.lcZ(96,37,"BUTTON.ADD-BTN")),u.xp6(3),u.Oqu(u.lcZ(99,39,"BUTTON.CANCEL-BTN"))}},directives:[h.Ro,x._Y,x.JL,x.sg,k.KE,L.qn,o.sg,k.hX,P.Nt,L.oH,x.Fj,N.ZL,x.JJ,x.oH,N.XC,T.lW,k.R9,A.Hw,x.CE,L.HS,o.O5,L.qH,w.ey,U.oG,x.Q7,x.u],pipes:[y.X$,o.Ov],styles:[""]}),W)},{path:"edit-pre-requisite/:id",component:($=function(){function e(t,s,n,r,o,a,l,u){i(this,e),this.cdRef=t,this.fb=s,this.languageService=n,this.toastrService=r,this.router=o,this.route=a,this.spinner=l,this.preRequisiteService=u,this.preRequisitesList=[],this.reqDocumentsList=[],this.preRequisitesEngList=[],this.preRequisitesMalayList=[],this.reqDocumentsEngList=[],this.reqDocumentsMalayList=[],this.license_type=new x.NI("",{validators:[function(e){return"string"==typeof e.value?{invalidAutocompleteObject:{value:e.value}}:null},x.kI.required]}),this.translateVal="ml"==localStorage.lang?"malay":"english",this.validation_msgs={license_type:[{type:"invalidAutocompleteObject",message:"License Type not recognized. Click one of the options."},{type:"required",message:"License Type is required."}]},this.preRequisiteId=this.route.snapshot.paramMap.get("id"),this.editPreRequisiteForm=this.fb.group({preRequisites_english:this.fb.array([this.fb.control("")]),preRequisites_malay:this.fb.array([this.fb.control("")]),reqDocuments_english:this.fb.array([this.fb.control("")]),reqDocuments_malay:this.fb.array([this.fb.control("")])})}return n(e,[{key:"ngOnInit",value:function(){var e=this;this.getLicenseTypeList(),this.getPreRequisitesDetailsToEdit(),this.languageService.languageChanged.subscribe(function(t){e.translateVal="ml"==localStorage.lang?"malay":"english",e.getLicenseTypeList()})}},{key:"getLicenseTypeList",value:function(){var e=this;this.preRequisiteService.getLicenseClassList().subscribe(function(t){e.licenseTypeData=t.data,console.log("this.licenseTypeData-----111111--",e.licenseTypeData),e.licenseTypeList=e.license_type.valueChanges.pipe((0,E.O)(""),(0,m.U)(function(t){return"string"==typeof t?t:t[e.translateVal]}),(0,m.U)(function(t){return t?e._filterLicenseType(t):e.licenseTypeData.slice()}))})}},{key:"getPreRequisitesDetailsToEdit",value:function(){var e=this;this.spinner.show(),this.preRequisiteService.getPreRequisitesDetailsToEdit(this.preRequisiteId).subscribe(function(t){e.spinner.hide(),console.log("res['preReqData']=====",t.preReqData);for(var i=0;i<t.preReqData.length;i++)e.addNewPreRequisiteEnglish(),e.addNewPreRequisiteMalay(),e.preRequisitesEngList.push(t.preReqData[i].pre_requisites_english),e.preRequisitesMalayList.push(t.preReqData[i].pre_requisites_malay);for(var s=0;s<t.reqDocData.length;s++)e.addNewReqDocumentsEnglish(),e.addNewReqDocumentsMalay(),e.reqDocumentsEngList.push(t.reqDocData[s].req_documents_english),e.reqDocumentsMalayList.push(t.reqDocData[s].req_documents_malay);e.editPreRequisiteForm.patchValue({preRequisites_english:e.preRequisitesEngList,preRequisites_malay:e.preRequisitesMalayList,reqDocuments_english:e.reqDocumentsEngList,reqDocuments_malay:e.reqDocumentsMalayList}),console.log("this.licenseTypeData=----",e.licenseTypeData);var n=e.licenseTypeData.filter(function(t){return t.id==e.preRequisiteId});e.license_type.setValue(n[0]),console.log("this.license_type=========",e.license_type)})}},{key:"displayFnLicenseType",value:function(e){return e&&e["ml"==localStorage.lang?"malay":"english"]?e["ml"==localStorage.lang?"malay":"english"]:""}},{key:"_filterLicenseType",value:function(e){var t=this,i=e.toLowerCase();return this.licenseTypeData.filter(function(e){return e[t.translateVal].toLowerCase().includes(i)})}},{key:"preRequisites_english",get:function(){return this.editPreRequisiteForm.get("preRequisites_english")}},{key:"preRequisites_malay",get:function(){return this.editPreRequisiteForm.get("preRequisites_malay")}},{key:"reqDocuments_english",get:function(){return this.editPreRequisiteForm.get("reqDocuments_english")}},{key:"reqDocuments_malay",get:function(){return this.editPreRequisiteForm.get("reqDocuments_malay")}},{key:"addNewPreRequisiteEnglish",value:function(){this.preRequisites_english.push(this.fb.control(""))}},{key:"removePreRequisiteEnglish",value:function(e){this.editPreRequisiteForm.get("preRequisites_english").removeAt(e)}},{key:"addNewPreRequisiteMalay",value:function(){this.preRequisites_malay.push(this.fb.control(""))}},{key:"removePreRequisiteMalay",value:function(e){this.editPreRequisiteForm.get("preRequisites_malay").removeAt(e)}},{key:"addNewReqDocumentsEnglish",value:function(){this.reqDocuments_english.push(this.fb.control(""))}},{key:"removeReqDocumentsEnglish",value:function(e){this.editPreRequisiteForm.get("reqDocuments_english").removeAt(e)}},{key:"addNewReqDocumentsMalay",value:function(){this.reqDocuments_malay.push(this.fb.control(""))}},{key:"removeReqDocumentsMalay",value:function(e){this.editPreRequisiteForm.get("reqDocuments_malay").removeAt(e)}},{key:"onSelectionChange",value:function(){var e=this;this.preRequisiteService.checkPreRequistiesExistence(this.license_type.value.id).subscribe(function(t){"Exists"==t.status&&(e.toastrService.error("Already Exists!!!"),e.license_type.setValue(""))})}},{key:"updatePreRequisiteDetails",value:function(){var e=this;if(this.preRequisitesList=[],this.reqDocumentsList=[],console.log("this.preRequisites_english=====",this.editPreRequisiteForm.value),this.editPreRequisiteForm.value.preRequisites_english.length==this.editPreRequisiteForm.value.preRequisites_malay.length)for(var t=0;t<this.editPreRequisiteForm.value.preRequisites_english.length;t++)this.preRequisitesList.push({preReq_english:this.editPreRequisiteForm.value.preRequisites_english[t],preReq_malay:this.editPreRequisiteForm.value.preRequisites_malay[t]});else this.toastrService.error("Please check with Pre-requisites Info!!!");if(this.editPreRequisiteForm.value.reqDocuments_english.length==this.editPreRequisiteForm.value.reqDocuments_malay.length)for(var i=0;i<this.editPreRequisiteForm.value.reqDocuments_english.length;i++)this.reqDocumentsList.push({reqDoc_english:this.editPreRequisiteForm.value.reqDocuments_english[i],reqDoc_malay:this.editPreRequisiteForm.value.reqDocuments_malay[i]});else this.toastrService.error("Please check with Required Documents Info!!!");this.editPreRequisiteForm.value.preRequisites_english.length==this.preRequisitesList.length&&this.editPreRequisiteForm.value.preRequisites_malay.length==this.preRequisitesList.length&&this.editPreRequisiteForm.value.reqDocuments_english.length==this.reqDocumentsList.length&&this.editPreRequisiteForm.value.reqDocuments_malay.length==this.reqDocumentsList.length&&this.preRequisiteService.updatePreRequisiteDetails(this.license_type.value,this.preRequisitesList,this.reqDocumentsList).subscribe(function(t){"Success"==t.status&&(e.toastrService.success("Updated Successfully!!!!"),e.router.navigate(["/admin/pre-requisite/pre-requisite-list"])),"Session Expired"==t.status&&(e.toastrService.error("Session Expired!!!"),e.router.navigate(["/authentication/signin"]))})}},{key:"goBack",value:function(){this.router.navigate(["/admin/pre-requisite/pre-requisite-list"])}}]),e}(),$.\u0275fac=function(e){return new(e||$)(u.Y36(u.sBO),u.Y36(x.qu),u.Y36(f.T),u.Y36(v._W),u.Y36(a.F0),u.Y36(a.gz),u.Y36(h.t2),u.Y36(p))},$.\u0275cmp=u.Xpm({type:$,selectors:[["app-edit-pre-requisite"]],decls:93,vars:40,consts:[["bdColor","rgba(51,51,51,0.8)","size","medium","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],[1,"content"],[1,"container-fluid"],[1,"block-header"],[1,"row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12"],[1,"breadcrumb","breadcrumb-style"],[1,"breadcrumb-item"],[1,"page-title"],[1,"row","clearfix"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12"],[1,"card"],[1,"header"],[1,"body"],[1,"m-4",3,"formGroup"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-2"],["appearance","outline",1,"example-full-width","mb-3"],["type","text","matInput","","readonly","",3,"formControl","matAutocomplete"],[3,"displayWith","optionSelected"],["autoLicense","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],[1,"col-xl-11","col-lg-11","col-md-11","col-sm-11","mb-2"],["formArrayName","preRequisites_english"],["style","margin-top: 10px;margin-bottom: 10px;",4,"ngFor","ngForOf"],[1,"col-xl-1","col-lg-1","col-md-1","col-sm-1","mb-2",2,"padding-top","50px"],[2,"cursor","pointer",3,"click"],["formArrayName","preRequisites_malay"],["formArrayName","reqDocuments_english"],["formArrayName","reqDocuments_malay"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],["mat-raised-button","","color","primary",1,"btn-space",3,"disabled","click"],["type","button","mat-button","",3,"click"],[3,"value"],[4,"ngIf"],[2,"margin-top","10px","margin-bottom","10px"],["type","text","matInput","","required","",3,"formControlName"],["matSuffix","",2,"cursor","pointer","border-style","none","background-color","white",3,"disabled","click"]],template:function(e,t){if(1&e&&(u.TgZ(0,"ngx-spinner",0),u.TgZ(1,"p",1),u._uU(2,"Loading..."),u.qZA(),u.qZA(),u.TgZ(3,"section",2),u.TgZ(4,"div",3),u.TgZ(5,"div",4),u.TgZ(6,"div",5),u.TgZ(7,"div",6),u.TgZ(8,"ul",7),u.TgZ(9,"li",8),u.TgZ(10,"h4",9),u._uU(11),u.ALo(12,"translate"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(13,"div",10),u.TgZ(14,"div",11),u.TgZ(15,"div",12),u.TgZ(16,"div",13),u.TgZ(17,"h2"),u._uU(18),u.ALo(19,"translate"),u.qZA(),u.qZA(),u.TgZ(20,"div",14),u.TgZ(21,"form",15),u.TgZ(22,"div",5),u.TgZ(23,"div",16),u.TgZ(24,"mat-form-field",17),u.TgZ(25,"mat-label"),u._uU(26),u.ALo(27,"translate"),u.qZA(),u._UZ(28,"input",18),u.TgZ(29,"mat-autocomplete",19,20),u.NdJ("optionSelected",function(){return t.onSelectionChange()}),u.YNc(31,H,2,3,"mat-option",21),u.ALo(32,"async"),u.qZA(),u.YNc(33,B,2,1,"mat-error",22),u.qZA(),u.qZA(),u._UZ(34,"div",16),u.qZA(),u.TgZ(35,"div",5),u.TgZ(36,"div",16),u.TgZ(37,"div",5),u.TgZ(38,"div",23),u.TgZ(39,"label"),u._uU(40),u.ALo(41,"translate"),u.qZA(),u.TgZ(42,"div",24),u.YNc(43,V,6,2,"div",25),u.qZA(),u.qZA(),u.TgZ(44,"div",26),u.TgZ(45,"a",27),u.NdJ("click",function(){return t.addNewPreRequisiteEnglish()}),u.TgZ(46,"mat-icon"),u._uU(47,"add"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(48,"div",16),u.TgZ(49,"div",5),u.TgZ(50,"div",23),u.TgZ(51,"label"),u._uU(52),u.ALo(53,"translate"),u.qZA(),u.TgZ(54,"div",28),u.YNc(55,G,6,2,"div",25),u.qZA(),u.qZA(),u.TgZ(56,"div",26),u.TgZ(57,"a",27),u.NdJ("click",function(){return t.addNewPreRequisiteMalay()}),u.TgZ(58,"mat-icon"),u._uU(59,"add"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(60,"div",5),u.TgZ(61,"div",16),u.TgZ(62,"div",5),u.TgZ(63,"div",23),u.TgZ(64,"label"),u._uU(65),u.ALo(66,"translate"),u.qZA(),u.TgZ(67,"div",29),u.YNc(68,z,6,2,"div",25),u.qZA(),u.qZA(),u.TgZ(69,"div",26),u.TgZ(70,"a",27),u.NdJ("click",function(){return t.addNewReqDocumentsEnglish()}),u.TgZ(71,"mat-icon"),u._uU(72,"add"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(73,"div",16),u.TgZ(74,"div",5),u.TgZ(75,"div",23),u.TgZ(76,"label"),u._uU(77),u.ALo(78,"translate"),u.qZA(),u.TgZ(79,"div",30),u.YNc(80,X,6,2,"div",25),u.qZA(),u.qZA(),u.TgZ(81,"div",26),u.TgZ(82,"a",27),u.NdJ("click",function(){return t.addNewReqDocumentsMalay()}),u.TgZ(83,"mat-icon"),u._uU(84,"add"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(85,"div",5),u.TgZ(86,"div",31),u.TgZ(87,"button",32),u.NdJ("click",function(){return t.updatePreRequisiteDetails()}),u._uU(88),u.ALo(89,"translate"),u.qZA(),u.TgZ(90,"button",33),u.NdJ("click",function(){return t.goBack()}),u._uU(91),u.ALo(92,"translate"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&e){var i=u.MAs(30);u.xp6(11),u.Oqu(u.lcZ(12,20,"PRE-REQUISITE.EDITTITLE")),u.xp6(7),u.Oqu(u.lcZ(19,22,"PRE-REQUISITE.EDITTITLE")),u.xp6(3),u.Q6J("formGroup",t.editPreRequisiteForm),u.xp6(5),u.hij("",u.lcZ(27,24,"PRE-REQUISITE.LICENSE-TYPE"),"*"),u.xp6(2),u.Q6J("formControl",t.license_type)("matAutocomplete",i),u.xp6(1),u.Q6J("displayWith",t.displayFnLicenseType),u.xp6(2),u.Q6J("ngForOf",u.lcZ(32,26,t.licenseTypeList)),u.xp6(2),u.Q6J("ngForOf",t.validation_msgs.license_type),u.xp6(7),u.hij("",u.lcZ(41,28,"PRE-REQUISITE.PRE-REQUISITE-ENG"),"*"),u.xp6(3),u.Q6J("ngForOf",t.preRequisites_english.controls),u.xp6(9),u.hij("",u.lcZ(53,30,"PRE-REQUISITE.PRE-REQUISITE-MALAY"),"*"),u.xp6(3),u.Q6J("ngForOf",t.preRequisites_malay.controls),u.xp6(10),u.hij("",u.lcZ(66,32,"PRE-REQUISITE.REQ-DOCUMENT-ENG"),"*"),u.xp6(3),u.Q6J("ngForOf",t.reqDocuments_english.controls),u.xp6(9),u.hij("",u.lcZ(78,34,"PRE-REQUISITE.REQ-DOCUMENT-MALAY"),"*"),u.xp6(3),u.Q6J("ngForOf",t.reqDocuments_malay.controls),u.xp6(7),u.Q6J("disabled",!t.license_type.valid||!t.editPreRequisiteForm.valid||0==t.editPreRequisiteForm.value.preRequisites_english.length||0==t.editPreRequisiteForm.value.preRequisites_malay.length||0==t.editPreRequisiteForm.value.reqDocuments_english.length||0==t.editPreRequisiteForm.value.reqDocuments_malay.length),u.xp6(1),u.Oqu(u.lcZ(89,36,"BUTTON.EDIT-BTN")),u.xp6(3),u.Oqu(u.lcZ(92,38,"BUTTON.CANCEL-BTN"))}},directives:[h.Ro,x._Y,x.JL,x.sg,k.KE,k.hX,P.Nt,x.Fj,N.ZL,x.JJ,x.oH,N.XC,o.sg,x.CE,A.Hw,T.lW,w.ey,k.TO,o.O5,x.Q7,x.u,k.R9],pipes:[y.X$,o.Ov],styles:[""]}),$)}],te=function(){var e=function e(){i(this,e)};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[a.Bz.forChild(ee)],a.Bz]}),e}(),ie=r(13841),se=r(1325),ne=r(97070),re=r(57173),oe=((K=function e(){i(this,e)}).\u0275fac=function(e){return new(e||K)},K.\u0275mod=u.oAB({type:K}),K.\u0275inj=u.cJS({providers:[p],imports:[[o.ez,te,h.ef,ne.Tx,T.ot,A.Ps,se.Ad,x.u5,x.UX,ie.LD,q.ZX,P.c,N.Bb,k.lN,U.p9,re.Nh,y.aw,l.xD,d.Is,L.Hi]]}),K)}}])}();