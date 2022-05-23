(self.webpackChunksmart=self.webpackChunksmart||[]).push([[8791],{28791:function(e,t,i){"use strict";i.r(t),i.d(t,{ScheduleModule:function(){return Ae}});var s=i(61116),a=i(31041),n=i(39199),l=i(5609),r=i(13070),c=i(9550),o=i(63589),d=i(84369),h=i(77307),u=i(13841),p=i(92935),g=i(59241),m=i(37112),v=i(69024),f=i(40994),A=i(1325),Z=i(57173),T=i(97070),w=i(87672),_=i(44716),y=i(51601),b=i(35729),S=i(99235),D=i(81258),x=i(91681);class q{constructor(e){this.id=e.id||this.getRandomID(),this.lead_time=e.lead_time||"",this.schedule_name=e.schedule_name||"",this.schedule_owner=e.schedule_owner||"",this.schedule_view=e.schedule_view||"",this.schedule_view_assignment=e.schedule_view_assignment||"",this.startDate=(0,s.p6)(new Date,"yyyy-MM-dd","en")||"",this.endDate=(0,s.p6)(new Date,"yyyy-MM-dd","en")||""}getRandomID(){const e=()=>(65536*(1+Math.random())|0).toString(16).substring(1);return e()+e()}}var C=i(35366);let k=(()=>{class e{constructor(e,t){this.data=e,this.dialogRef=t,this.message="",this.confirmButtonText="",this.cancelButtonText="",this.btnColor="primary",this.dynamicMsg="",e&&(this.message=e.message||this.message,this.btnColor=e.btnColor||this.btnColor,this.dynamicMsg=e.dynamicMsg||"",e.buttonText&&(this.confirmButtonText=e.buttonText.ok||this.confirmButtonText,this.cancelButtonText=e.buttonText.cancel||this.cancelButtonText))}onConfirmClick(){this.dialogRef.close(!0)}onClose(){this.dialogRef.close(!0)}}return e.\u0275fac=function(t){return new(t||e)(C.Y36(p.WI),C.Y36(p.so))},e.\u0275cmp=C.Xpm({type:e,selectors:[["app-confirmation-dialog"]],decls:10,vars:5,consts:[[2,"text-align","center"],["align","center"],["mat-raised-button","","tabindex","1",3,"color","click"],["mat-raised-button","","mat-dialog-close","","tabindex","-1"]],template:function(e,t){1&e&&(C.TgZ(0,"mat-dialog-content"),C.TgZ(1,"p"),C._uU(2),C.qZA(),C.TgZ(3,"b",0),C._uU(4),C.qZA(),C.qZA(),C.TgZ(5,"mat-dialog-actions",1),C.TgZ(6,"button",2),C.NdJ("click",function(){return t.onConfirmClick()}),C._uU(7),C.qZA(),C.TgZ(8,"button",3),C._uU(9),C.qZA(),C.qZA()),2&e&&(C.xp6(2),C.hij(" ",t.message," "),C.xp6(2),C.Oqu(t.dynamicMsg),C.xp6(2),C.s9C("color",t.btnColor),C.xp6(1),C.Oqu(t.confirmButtonText),C.xp6(2),C.Oqu(t.cancelButtonText))},directives:[p.xY,p.H8,d.lW,p.ZT],styles:[""]}),e})();var I=i(97425),L=i(42693),E=i(89647),U=i(51816),N=i(529);let F=(()=>{class e{constructor(e){this.http=e,this.API_URL="assets/data/calendar.json",this.httpOptions={headers:new L.WM({"Content-Type":"application/json"})},this.dataChange=new I.X([])}get data(){return this.dataChange.value}getDialogData(){return this.dialogData}getAllCalendars(){return this.http.get(this.API_URL).pipe((0,U.K)(this.errorHandler))}deleteCalendar(e){this.dialogData=e}errorHandler(e){let t="";return t=e.error instanceof ErrorEvent?e.error.message:`Error Code: ${e.status}\nMessage: ${e.message}`,console.log(t),(0,E._)(t)}getScheduleViewAssignList(e,t){return this.http.post(`${N.N.apiUrl}/webRoutes/getScheduleViewAssignList`,{schedule_view:e,license_type:t}).pipe((0,x.U)(e=>e))}getScheduleList(){return this.http.get(`${N.N.apiUrl}/webRoutes/getScheduleList`).pipe((0,x.U)(e=>e))}setScheduleDetails(e,t,i,s){return this.http.post(`${N.N.apiUrl}/webRoutes/setScheduleDetails`,{calendarData:e,timeSlot:t,viewAssign_selected:i,license_type:s}).pipe((0,x.U)(e=>e))}getScheduleDetails(){return this.http.get(`${N.N.apiUrl}/webRoutes/getScheduleDetails`).pipe((0,x.U)(e=>e))}updateScheduleDetails(e,t){return this.http.post(`${N.N.apiUrl}/webRoutes/updateScheduleDetails`,{calendarData:e,timeslot:t}).pipe((0,x.U)(e=>e))}deleteScheduleDetails(e){return this.http.post(`${N.N.apiUrl}/webRoutes/deleteScheduleDetails`,{calendarData:e}).pipe((0,x.U)(e=>e))}getTimeDetails(){return this.http.get(`${N.N.apiUrl}/webRoutes/getTimeDetails`).pipe((0,x.U)(e=>e))}getLicenseClassList(){return this.http.get(`${N.N.apiUrl}/webRoutes/getLicenseClassList`).pipe((0,x.U)(e=>e))}getScheduleEditView(e){return this.http.post(`${N.N.apiUrl}/webRoutes/getScheduleEditView`,{editData:e}).pipe((0,x.U)(e=>e))}}return e.\u0275fac=function(t){return new(t||e)(C.LFG(L.eN))},e.\u0275prov=C.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var J=i(24486),O=i(50518),M=i(31269),Q=i(87064),R=i(79961),Y=i(95522),V=i(60649);const H=["autocompleteTrigger"],$=["licenceInput"];function B(e,t){if(1&e&&(C.TgZ(0,"mat-option",17),C._uU(1),C.qZA()),2&e){const e=t.$implicit;C.Q6J("value",e.id),C.xp6(1),C.hij(" ",e.status," ")}}function j(e,t){if(1&e&&(C.TgZ(0,"mat-option",17),C._uU(1),C.qZA()),2&e){const e=t.$implicit;C.Q6J("value",e),C.xp6(1),C.hij(" ",e.license_class," ")}}function P(e,t){if(1&e&&(C.TgZ(0,"div"),C._uU(1),C.qZA()),2&e){const e=C.oxw().$implicit;C.xp6(1),C.hij(" ",e.message," ")}}function G(e,t){if(1&e&&(C.TgZ(0,"mat-error"),C.YNc(1,P,2,1,"div",36),C.qZA()),2&e){const e=t.$implicit,i=C.oxw(2);C.xp6(1),C.Q6J("ngIf",i.license_type.hasError(e.type))}}function z(e,t){if(1&e){const e=C.EpF();C.TgZ(0,"div",11),C.TgZ(1,"div",12),C.TgZ(2,"mat-form-field",13),C.TgZ(3,"mat-label"),C._uU(4),C.ALo(5,"translate"),C.qZA(),C._UZ(6,"input",32),C.TgZ(7,"mat-autocomplete",33,34),C.NdJ("optionSelected",function(t){return C.CHM(e),C.oxw().selectedLicenseType(t)}),C.YNc(9,j,2,2,"mat-option",15),C.ALo(10,"async"),C.qZA(),C.YNc(11,G,2,1,"mat-error",35),C.qZA(),C.qZA(),C.qZA()}if(2&e){const e=C.MAs(8),t=C.oxw();C.xp6(4),C.Oqu(C.lcZ(5,7,"SCHEDULE.LIST.LICENSE")),C.xp6(2),C.Q6J("formControl",t.license_type)("matAutocomplete",e)("readonly","edit"==t.action),C.xp6(1),C.Q6J("displayWith",t.displayFnLicense),C.xp6(2),C.Q6J("ngForOf",C.lcZ(10,9,t.licenseClassList)),C.xp6(2),C.Q6J("ngForOf",t.validation_msgs.license_type)}}function W(e,t){1&e&&(C.TgZ(0,"mat-icon",48),C._uU(1,"cancel"),C.qZA())}function X(e,t){if(1&e){const e=C.EpF();C.TgZ(0,"mat-chip",46),C.NdJ("removed",function(){const t=C.CHM(e).$implicit;return C.oxw(2).remove(t.id)}),C._uU(1),C.YNc(2,W,2,0,"mat-icon",47),C.qZA()}if(2&e){const e=t.$implicit,i=C.oxw(2);C.Q6J("selectable",i.selectable)("removable",i.removable),C.xp6(1),C.hij(" ",e.name," "),C.xp6(1),C.Q6J("ngIf",i.removable)}}function K(e,t){if(1&e&&(C.TgZ(0,"mat-option",17),C._UZ(1,"mat-checkbox",49),C._uU(2),C.qZA()),2&e){const e=t.$implicit;C.Q6J("value",e.id),C.xp6(1),C.Q6J("checked",e.checked),C.xp6(1),C.hij(" ",e.name," ")}}function ee(e,t){if(1&e){const e=C.EpF();C.TgZ(0,"div",11),C.TgZ(1,"div",12),C.TgZ(2,"mat-form-field",13),C.TgZ(3,"mat-chip-list",37,38),C.YNc(5,X,3,4,"mat-chip",39),C.TgZ(6,"mat-label"),C._uU(7),C.ALo(8,"translate"),C.qZA(),C.TgZ(9,"input",40,41),C.NdJ("matChipInputTokenEnd",function(t){return C.CHM(e),C.oxw().add(t)}),C.qZA(),C.qZA(),C.TgZ(12,"mat-autocomplete",42,43),C.NdJ("optionSelected",function(t){return C.CHM(e),C.oxw().selectedViewAssignment(t)}),C.YNc(14,K,3,3,"mat-option",15),C.ALo(15,"async"),C.qZA(),C.TgZ(16,"button",44),C.NdJ("click",function(){C.CHM(e);const t=C.MAs(11);return C.oxw().openAuto(t)}),C.TgZ(17,"mat-icon",45),C._uU(18,"expand_more"),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.qZA()}if(2&e){const e=C.MAs(4),t=C.MAs(13),i=C.oxw();C.xp6(5),C.Q6J("ngForOf",i.viewAssign_selected),C.xp6(2),C.hij("",C.lcZ(8,7,"SCHEDULE.LIST.ASSIGNMENT"),"*"),C.xp6(2),C.Q6J("matChipInputFor",e)("matChipInputSeparatorKeyCodes",i.separatorKeysCodes)("formControl",i.schedule_view_assignment)("matAutocomplete",t),C.xp6(5),C.Q6J("ngForOf",C.lcZ(15,9,i.viewAssignTypeList))}}function te(e,t){if(1&e){const e=C.EpF();C.TgZ(0,"li",50),C.TgZ(1,"mat-checkbox",51),C.NdJ("change",function(t){const i=C.CHM(e).$implicit;return C.oxw().changeTimeDt(t,i)}),C._uU(2),C.qZA(),C.qZA()}if(2&e){const e=t.$implicit;C.xp6(1),C.Q6J("checked",1==e.checkValue),C.xp6(1),C.hij(" ",e.range," ")}}function ie(e,t){if(1&e){const e=C.EpF();C.TgZ(0,"div",27),C.TgZ(1,"button",52),C.NdJ("click",function(){return C.CHM(e),C.oxw().deleteEvent()}),C.TgZ(2,"mat-icon",53),C._uU(3,"delete"),C.qZA(),C.qZA(),C.qZA()}}let se=(()=>{class e{constructor(e,t,i,s,n,l,r,c,o){this.dialogRef=e,this.dialog=t,this.data=i,this.calendarService=s,this.modalService=n,this.fb=l,this.toastrService=r,this.spinner=c,this.router=o,this.showDeleteBtn=!1,this.selectable=!0,this.removable=!0,this.separatorKeysCodes=[S.K5,S.OC],this.viewAssign_selected=[],this.license_type=new a.NI("",{validators:[e=>"string"==typeof e.value?{invalidAutocompleteObject:{value:e.value}}:null,a.kI.required]}),this.schedule_view_assignment=new a.NI("",{validators:[e=>"string"==typeof e.value?{invalidAutocompleteObject:{value:e.value}}:null,a.kI.required]}),this.formControl=new a.NI("",[a.kI.required]),this.validation_msgs={license_type:[{type:"invalidAutocompleteObject",message:"License Class not recognized. Click one of the options."}]},this.action=i.action,this.actionData=i,this.timeArray=i.timeData,this.getScheduleList(),this.getLicenseList()}ngOnInit(){if("edit"===this.action)this.spinner.show(),this.timeSlotList=[],this.viewAssignTypeData=[],this.dialogTitle=this.actionData.calendar.title,this.calendar=this.actionData.calendar,this.showDeleteBtn=!0,this.calendarService.getScheduleEditView(this.actionData.calendar).subscribe(e=>{if("Success"==e.status){this.editInfo=e.data;let i=[];if(this.editInfo.length>0)for(let e=0;e<this.editInfo.length;e++)this.license_type.patchValue({id:this.editInfo[e].license_id,license_class:this.editInfo[e].license_class}),this.editInfo[e].TimeSlot.length<this.timeArray.length?(this.editInfo[e].TimeSlot=this.zeroPad(this.editInfo[e].TimeSlot,this.timeArray.length),i.push(this.editInfo[e].TimeSlot),this.timeSlotList.push(this.editInfo[e].TimeSlot)):(i.push(this.editInfo[e].TimeSlot),this.timeSlotList.push(this.editInfo[e].TimeSlot)),this.viewAssignTypeData.push({id:this.editInfo[e].employee_id,name:this.editInfo[e].employee_name,checked:!0}),this.spinner.hide();var t=i.reduce(function(e,t){return e||t});for(let e=0;e<this.timeArray.length;e++)1==t[e]?(this.timeArray[e].checkValue=1,this.timeArray[e].checked=!0):(this.timeArray[e].checkValue=0,this.timeArray[e].checked=!1);this.viewAssign_selected=this.viewAssignTypeData,this.viewAssignTypeList=this.schedule_view_assignment.valueChanges.pipe((0,D.O)(""),(0,x.U)(e=>"string"==typeof e?e:e.name),(0,x.U)(e=>e?this._filterviewAssignType(e):this.viewAssignTypeData.slice()))}"Session Expired"==e.status&&(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"]))}),this.calendarForm=this.editContactForm();else{for(let e=0;e<this.timeArray.length;e++)this.timeArray[e].checkValue=1,this.timeArray[e].checked=!0;this.dialogTitle="New Event",this.calendar=new q({}),this.showDeleteBtn=!1,this.calendarForm=this.createContactForm(this.actionData.calendar)}}getLicenseList(){this.calendarService.getLicenseClassList().subscribe(e=>{this.licenseClassData=e.data,this.licenseClassList=this.license_type.valueChanges.pipe((0,D.O)(""),(0,x.U)(e=>e?this._filterLicenseType(e):this.licenseClassData.slice()))})}getErrorMessage(){return this.formControl.hasError("required")?"Required field":this.formControl.hasError("email")?"Not a valid email":""}displayFnLicense(e){return e&&e.license_class?e.license_class:""}_filterLicenseType(e){const t=e.toLowerCase();return this.licenseClassData.filter(e=>e.license_class.toLowerCase().includes(t))}showScheduleView(){this.viewAssign_selected=[],this.viewAssignTypeData=[],this.license_type.patchValue("")}selectedLicenseType(e){this.viewAssign_selected=[],this.viewAssignTypeData=[],"All"!=this.calendarForm.value.schedule_view&&this.calendarService.getScheduleViewAssignList(this.calendarForm.value.schedule_view,this.license_type.value).subscribe(e=>{this.viewAssignTypeData=e.data,this.viewAssignTypeList=this.schedule_view_assignment.valueChanges.pipe((0,D.O)(""),(0,x.U)(e=>"string"==typeof e?e:e.name),(0,x.U)(e=>e?this._filterviewAssignType(e):this.viewAssignTypeData.slice()))})}zeroPad(e,t){return e.toString().padStart(Number(t),"0")}createContactForm(e){return this.fb.group({id:[this.calendar.id],schedule_name:[this.calendar.schedule_name],schedule_view:[this.calendar.schedule_view],startDate:[e.start,[a.kI.required]],endDate:[e.start,[a.kI.required]]})}editContactForm(){return this.fb.group({id:[this.calendar.id],schedule_name:[this.calendar.schedule_name],schedule_view:[this.calendar.schedule_view],startDate:[this.calendar.startDate,[a.kI.required]],endDate:[this.calendar.endDate,[a.kI.required]]})}deleteEvent(){this.dialog.open(k,{data:{message:"Are you sure want to delete the Schedule?",btnColor:"warn",buttonText:{ok:"Yes",cancel:"No"}}}).afterClosed().subscribe(e=>{e&&this.calendarService.deleteScheduleDetails(this.editInfo).subscribe(e=>{this.toastrService.success("Deleted Successfully!!!!"),this.dialogRef.close("delete")})})}onNoClick(){this.dialogRef.close()}setScheduleDetails(){if("add"==this.action){let e="",t=0;for(let i=0;i<this.timeArray.length;i++)e+=this.timeArray[i].checkValue,1==this.timeArray[i].checkValue&&t++;t>0?"All"==this.calendarForm.value.schedule_view||this.viewAssign_selected.length>0?this.calendarService.setScheduleDetails(this.calendarForm.value,e,this.viewAssign_selected,this.license_type.value).subscribe(e=>{"Success"==e.status?(this.toastrService.success("Updated Successfully!!!!"),this.dialogRef.close("submit")):"Session Expired"==e.status?(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"])):this.toastrService.error("Already Exists!!!!")}):this.toastrService.error("Please Select the Schedule View Assignment!!"):this.toastrService.error("Please Select the Schedule Time!!")}if("edit"==this.action)if("All"==this.calendarForm.value.schedule_view){let e="";for(let t=0;t<this.timeArray.length;t++)e+=this.timeArray[t].checkValue;this.calendarService.updateScheduleDetails(this.editInfo,e).subscribe(e=>{"Success"==e.status&&(this.toastrService.success("Updated Successfully!!!!"),this.dialogRef.close("submit")),"Session Expired"==e.status&&(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"]))})}else if(this.viewAssign_selected.length>0){let e=[],t=[];for(let i=0;i<this.viewAssign_selected.length;i++)e.push(this.viewAssign_selected[i].name),t.push(this.viewAssign_selected[i].id);this.dialog.open(k,{data:{message:"The Schedule will be updated for the selected Instructors",dynamicMsg:e,btnColor:"primary",buttonText:{ok:"OK",cancel:"Cancel"}}}).afterClosed().subscribe(e=>{if(e){let e="";for(let t=0;t<this.timeArray.length;t++)e+=this.timeArray[t].checkValue;let i=this.editInfo.filter(e=>t.includes(e.employee_id));this.calendarService.updateScheduleDetails(i,e).subscribe(e=>{"Success"==e.status&&(this.toastrService.success("Updated Successfully!!!!"),this.dialogRef.close("submit")),"Session Expired"==e.status&&(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"]))})}})}else this.toastrService.error("Please Select the Schedule View Assignment!!")}displayFn(e){return e&&e.name?e.name:""}_filterviewAssignType(e){const t=e.toLowerCase();return this.viewAssignTypeData.filter(e=>e.name.toLowerCase().includes(t))}add(e){const t=e.input,i=e.value;(i||"").trim()&&this.viewAssign_selected.push(i),t&&(t.value=""),this.schedule_view_assignment.setValue("")}remove(e){let t="";if(this.viewAssign_selected.findIndex(t=>t.id===e)>=0)if("edit"==this.action){for(let i=0;i<this.viewAssignTypeData.length;i++)this.viewAssignTypeData[i].id==e&&(t=this.viewAssignTypeData[i].name);this.dialog.open(k,{data:{message:"Are you sure, want to delete the Schedule for the Instructor?",dynamicMsg:t+" schedule will be removed permanently",btnColor:"warn",buttonText:{ok:"Yes",cancel:"No"}}}).afterClosed().subscribe(t=>{if(t){let t=this.editInfo.filter(t=>t.employee_id==e);this.calendarService.deleteScheduleDetails(t).subscribe(t=>{if("Success"==t.status){this.toastrService.success("Deleted Successfully!!!!"),this.viewAssign_selected=[...this.viewAssign_selected.filter(t=>t.id!==e)];for(let t=0;t<this.viewAssignTypeData.length;t++)this.viewAssignTypeData[t].id==e&&(this.viewAssignTypeData[t].checked=!1);this.dialogRef.close("delete")}"Session Expired"==t.status&&(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"]))})}})}else{this.viewAssign_selected=[...this.viewAssign_selected.filter(t=>t.id!==e)];for(let i=0;i<this.viewAssignTypeData.length;i++)this.viewAssignTypeData[i].id==e&&(t=this.viewAssignTypeData[i].name,this.viewAssignTypeData[i].checked=!1)}}openAuto(e){e.openPanel(),this.licenceInput.nativeElement.focus()}selectedViewAssignment(e){const t=e.option.viewValue;if(this.viewAssign_selected.findIndex(t=>t.id===e.option.value)>=0){this.viewAssign_selected=[...this.viewAssign_selected.filter(e=>e.name!==t)];for(let t=0;t<this.viewAssignTypeData.length;t++)this.viewAssignTypeData[t].id==e.option.value&&(this.viewAssignTypeData[t].checked=!1)}else for(let s=0;s<this.viewAssignTypeData.length;s++)this.viewAssignTypeData[s].id==e.option.value&&(this.viewAssignTypeData[s].checked=!0,this.viewAssign_selected.push(this.viewAssignTypeData[s]));if(this.viewAssign_selected.length>1){let e=[];this.timeSlotList=[];for(let t=0;t<this.editInfo.length;t++)for(let i=0;i<this.viewAssign_selected.length;i++)this.editInfo[t].employee_id==this.viewAssign_selected[i].id&&(e.push(this.editInfo[t].TimeSlot),this.timeSlotList.push(this.editInfo[t].TimeSlot));var i=e.reduce(function(e,t){return e||t});for(let t=0;t<this.timeArray.length;t++)1==i[t]?(this.timeArray[t].checkValue=1,this.timeArray[t].checked=!0):(this.timeArray[t].checkValue=0,this.timeArray[t].checked=!1)}else if(1==this.viewAssign_selected.length){let e;for(let t=0;t<this.editInfo.length;t++)this.editInfo[t].employee_id==this.viewAssign_selected[0].id&&(e=this.editInfo[t].TimeSlot);for(let t=0;t<this.timeArray.length;t++)1==e[t]?(this.timeArray[t].checkValue=1,this.timeArray[t].checked=!0):(this.timeArray[t].checkValue=0,this.timeArray[t].checked=!1)}else for(let s=0;s<this.timeArray.length;s++)this.timeArray[s].checkValue=0,this.timeArray[s].checked=!1;this.licenceInput.nativeElement.value="",this.schedule_view_assignment.setValue(""),requestAnimationFrame(()=>{this.openAuto(this.matACTrigger)})}getScheduleList(){this.calendarService.getScheduleList().subscribe(e=>{this.scheduleList=e.data})}changeTimeDt(e,t){if(1==e.checked)for(let i=0;i<this.timeArray.length;i++)this.timeArray[i].range==t.range&&(this.timeArray[i].checkValue=1);else for(let i=0;i<this.timeArray.length;i++)this.timeArray[i].range==t.range&&(this.timeArray[i].checkValue=0)}}return e.\u0275fac=function(t){return new(t||e)(C.Y36(p.so),C.Y36(p.uw),C.Y36(p.WI),C.Y36(F),C.Y36(J.FF),C.Y36(a.qu),C.Y36(O._W),C.Y36(M.t2),C.Y36(b.F0))},e.\u0275cmp=C.Xpm({type:e,selectors:[["app-form-dialog"]],viewQuery:function(e,t){if(1&e&&(C.Gf(H,5),C.Gf($,5)),2&e){let e;C.iGM(e=C.CRH())&&(t.matACTrigger=e.first),C.iGM(e=C.CRH())&&(t.licenceInput=e.first)}},decls:75,vars:40,consts:[["bdColor","rgba(51,51,51,0.8)","size","medium","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],[1,"addContainer"],[1,"modalHeader"],[1,"editRowModal"],[1,"modalHeader","clearfix"],[1,"modal-about"],[1,"font-weight-bold","p-t-5","p-l-10","font-17"],["mat-icon-button","","aria-label","Close dialog",3,"click"],["mat-dialog-content",""],[1,"register-form","m-4",3,"formGroup"],[1,"row"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12"],["appearance","outline",1,"example-full-width","mb-3"],["formControlName","schedule_name","required","",3,"disabled"],[3,"value",4,"ngFor","ngForOf"],["formControlName","schedule_view","required","",3,"disabled","selectionChange"],[3,"value"],["class","row",4,"ngIf"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12"],["matInput","","formControlName","startDate",3,"matDatepicker","disabled"],["matSuffix","",3,"for"],["picker",""],["matInput","","formControlName","endDate",3,"matDatepicker","disabled"],["picker1",""],["style","list-style: none;",4,"ngFor","ngForOf"],[1,"col-xl-10","col-lg-10","col-md-12","col-sm-12"],[1,"example-button-row"],["mat-raised-button","","color","primary",3,"disabled","click"],["mat-raised-button","","color","warn","tabindex","-1",3,"click"],[1,"col-xl-2","col-lg-2","col-md-12","col-sm-12"],["class","example-button-row",4,"ngIf"],["type","text","matInput","",3,"formControl","matAutocomplete","readonly"],[3,"displayWith","optionSelected"],["autoNric","matAutocomplete"],[4,"ngFor","ngForOf"],[4,"ngIf"],["aria-label","Fruit selection"],["chipList",""],[3,"selectable","removable","removed",4,"ngFor","ngForOf"],["type","text","matInput","",3,"matChipInputFor","matChipInputSeparatorKeyCodes","formControl","matAutocomplete","matChipInputTokenEnd"],["licenceInput","","autocompleteTrigger","matAutocompleteTrigger"],["autoActiveFirstOption","",3,"optionSelected"],["autoView","matAutocomplete"],["mat-icon-button","","matSuffix","",2,"width","34px","height","34px",3,"click"],[2,"width","34px"],[3,"selectable","removable","removed"],["matChipRemove","",4,"ngIf"],["matChipRemove",""],["color","primary",2,"padding","0 12px",3,"checked"],[2,"list-style","none"],["color","primary",3,"checked","change"],["mat-mini-fab","","aria-label","","color","warn",3,"click"],[1,"font-20"]],template:function(e,t){if(1&e&&(C.TgZ(0,"ngx-spinner",0),C.TgZ(1,"p",1),C._uU(2,"Loading..."),C.qZA(),C.qZA(),C.TgZ(3,"div",2),C.TgZ(4,"div",3),C.TgZ(5,"div",4),C.TgZ(6,"div",5),C.TgZ(7,"div",6),C.TgZ(8,"div",7),C._uU(9),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.TgZ(10,"button",8),C.NdJ("click",function(){return t.dialogRef.close()}),C.TgZ(11,"mat-icon"),C._uU(12,"close"),C.qZA(),C.qZA(),C.qZA(),C.TgZ(13,"div",9),C.TgZ(14,"form",10),C.TgZ(15,"div",11),C.TgZ(16,"div",12),C.TgZ(17,"mat-form-field",13),C.TgZ(18,"mat-label"),C._uU(19),C.ALo(20,"translate"),C.qZA(),C.TgZ(21,"mat-select",14),C.YNc(22,B,2,2,"mat-option",15),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.TgZ(23,"div",11),C.TgZ(24,"div",12),C.TgZ(25,"mat-form-field",13),C.TgZ(26,"mat-label"),C._uU(27),C.ALo(28,"translate"),C.qZA(),C.TgZ(29,"mat-select",16),C.NdJ("selectionChange",function(){return t.showScheduleView()}),C.TgZ(30,"mat-option",17),C._uU(31," Driving Institute "),C.qZA(),C.TgZ(32,"mat-option",17),C._uU(33," Instructor "),C.qZA(),C.TgZ(34,"mat-option",17),C._uU(35," QTI "),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.YNc(36,z,12,11,"div",18),C.YNc(37,ee,19,11,"div",18),C.TgZ(38,"div",11),C.TgZ(39,"div",19),C.TgZ(40,"mat-form-field",13),C.TgZ(41,"mat-label"),C._uU(42),C.ALo(43,"translate"),C.qZA(),C._UZ(44,"input",20),C._UZ(45,"mat-datepicker-toggle",21),C._UZ(46,"mat-datepicker",null,22),C.qZA(),C.qZA(),C.TgZ(48,"div",19),C.TgZ(49,"mat-form-field",13),C.TgZ(50,"mat-label"),C._uU(51),C.ALo(52,"translate"),C.qZA(),C._UZ(53,"input",23),C._UZ(54,"mat-datepicker-toggle",21),C._UZ(55,"mat-datepicker",null,24),C.qZA(),C.qZA(),C.qZA(),C.TgZ(57,"div",11),C.TgZ(58,"label"),C._uU(59),C.ALo(60,"translate"),C.qZA(),C.TgZ(61,"div",19),C.YNc(62,te,3,2,"li",25),C.qZA(),C.qZA(),C._UZ(63,"br"),C.TgZ(64,"div",11),C.TgZ(65,"div",26),C.TgZ(66,"div",27),C.TgZ(67,"button",28),C.NdJ("click",function(){return t.setScheduleDetails()}),C._uU(68),C.ALo(69,"translate"),C.qZA(),C.TgZ(70,"button",29),C.NdJ("click",function(){return t.dialogRef.close()}),C._uU(71),C.ALo(72,"translate"),C.qZA(),C.qZA(),C.qZA(),C.TgZ(73,"div",30),C.YNc(74,ie,4,0,"div",31),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.qZA()),2&e){const e=C.MAs(47),i=C.MAs(56);C.xp6(9),C.hij(" ",t.dialogTitle,""),C.xp6(5),C.Q6J("formGroup",t.calendarForm),C.xp6(5),C.Oqu(C.lcZ(20,26,"SCHEDULE.LIST.SCHEDULE")),C.xp6(2),C.Q6J("disabled","edit"==t.action),C.xp6(1),C.Q6J("ngForOf",t.scheduleList),C.xp6(5),C.Oqu(C.lcZ(28,28,"SCHEDULE.LIST.SCHEDULE-VIEW")),C.xp6(2),C.Q6J("disabled","edit"==t.action),C.xp6(1),C.Q6J("value","All"),C.xp6(2),C.Q6J("value","Instructor"),C.xp6(2),C.Q6J("value","QTI"),C.xp6(2),C.Q6J("ngIf",""!=t.calendarForm.value.schedule_view),C.xp6(1),C.Q6J("ngIf",""!=t.calendarForm.value.schedule_view&&"All"!=t.calendarForm.value.schedule_view&&""!=t.license_type.value),C.xp6(5),C.Oqu(C.lcZ(43,30,"SCHEDULE.LIST.START-DATE")),C.xp6(2),C.Q6J("matDatepicker",e)("disabled","edit"==t.action),C.xp6(1),C.Q6J("for",e),C.xp6(6),C.Oqu(C.lcZ(52,32,"SCHEDULE.LIST.END-DATE")),C.xp6(2),C.Q6J("matDatepicker",i)("disabled","edit"==t.action),C.xp6(1),C.Q6J("for",i),C.xp6(5),C.Oqu(C.lcZ(60,34,"SCHEDULE.LIST.SCHEDULE-TIME")),C.xp6(3),C.Q6J("ngForOf",t.timeArray),C.xp6(5),C.Q6J("disabled",!t.calendarForm.valid||!t.license_type.valid),C.xp6(1),C.Oqu(C.lcZ(69,36,"BUTTON.ADD-BTN")),C.xp6(3),C.Oqu(C.lcZ(72,38,"BUTTON.CANCEL-BTN")),C.xp6(3),C.Q6J("ngIf",t.showDeleteBtn)}},directives:[M.Ro,d.lW,h.Hw,p.xY,a._Y,a.JL,a.sg,r.KE,r.hX,u.gD,a.JJ,a.u,a.Q7,s.sg,Q.ey,s.O5,c.Nt,a.Fj,v.hl,v.nW,r.R9,v.Mq,R.ZL,a.oH,R.XC,r.TO,Y.qn,Y.oH,Y.HS,Y.qH,f.oG],pipes:[V.X$,s.Ov],styles:[""]}),e})();var ae=i(60352),ne=i(2867),le=i(11757);const re=["calendar"];function ce(e,t){if(1&e){const e=C.EpF();C.TgZ(0,"li"),C.TgZ(1,"mat-checkbox",16),C.NdJ("change",function(t){const i=C.CHM(e).$implicit;return C.oxw().changeCategory(t,i)}),C._uU(2),C.qZA(),C.qZA()}if(2&e){const e=t.$implicit;C.xp6(1),C.Q6J("checked",e.checked)("value",e.status),C.xp6(1),C.hij(" ",e.status," ")}}const oe=[{path:"schedule-list",component:(()=>{class e extends ae.n{constructor(e,t,i,s,a,n,l,r){super(),this.fb=e,this.dialog=t,this.calendarService=i,this.snackBar=s,this.spinner=a,this.router=n,this.toastrService=l,this.deviceService=r,this.filterOptions="All",this.calendarData=[],this.filterItems=[],this.checkAll=!0,this.calendarOptions={headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"},initialView:this.deviceService.isDesktop()?"dayGridMonth":"listWeek",displayEventTime:!1,weekends:!0,editable:!0,selectable:!0,selectMirror:!0,dayMaxEvents:!0,select:this.handleDateSelect.bind(this),eventClick:this.handleEventClick.bind(this),eventsSet:this.handleEvents.bind(this)},this.dialogTitle="Add New Event",this.calendar=new q({}),this.addCusForm=this.createCalendarForm(this.calendar),this.getScheduleList(),this.getTimeDetails()}ngOnInit(){this.getScheduleDetails()}getScheduleDetails(){this.calendarData=[],this.calendarService.getScheduleDetails().subscribe(e=>{if("Success"==e.status){for(let t=0;t<e.data.length;t++)this.calendarData.push({title:e.data[t].status+" - "+e.data[t].license_class,start:new Date(e.data[t].startDate),end:new Date(e.data[t].endDate),className:e.data[t].schedule_color,id:e.data[t].id,lead_time:e.data[t].lead_time,schedule_name:e.data[t].status_id,schedule_view:e.data[t].schedule_view,assignment:e.data[t].AssignmentList,startDate:new Date(e.data[t].startDate),endDate:new Date(e.data[t].endDate),license_id:e.data[t].license_id});this.calendarEvents=this.calendarData,this.tempEvents=this.calendarEvents,this.calendarOptions.events=this.calendarEvents}"Session Expired"==e.status&&(this.toastrService.error("Session Expired!!!"),this.router.navigate(["/authentication/signin"]))})}getScheduleList(){this.calendarService.getScheduleList().subscribe(e=>{this.scheduleList=e.data;for(let t=0;t<this.scheduleList.length;t++)this.scheduleList[t].checked=!0,this.filterItems.push(this.scheduleList[t].status)})}handleDateSelect(e){this.addNewEvent(e)}addNewEvent(e){const t=this.dialog.open(se,{data:{calendar:e,timeData:this.timeArray,action:"add"}});this.subs.sink=t.afterClosed().subscribe(e=>{"submit"===e&&this.getScheduleDetails()})}changeCategory(e,t){e.checked?this.filterItems.push(t.status):this.filterItems.splice(this.filterItems.indexOf(t.status),1),this.filterEvent(this.filterItems)}changeAll(e){if(1==e.checked){this.checkAll=!0;for(let e=0;e<this.scheduleList.length;e++)this.scheduleList[e].checked=!0,this.filterItems.push(this.scheduleList[e].status);this.filterEvent(this.filterItems)}else{this.checkAll=!1;for(let e=0;e<this.scheduleList.length;e++)this.scheduleList[e].checked=!1;this.filterItems=[],this.filterEvent(this.filterItems)}}filterEvent(e){const t=this.calendarEvents.filter(t=>e.map(e=>e).includes(t.title.split(" - ")[0]));this.calendarOptions.events=t}handleEventClick(e){this.eventClick(e)}eventClick(e){const t={id:e.event.id,title:e.event.title,lead_time:e.event._def.extendedProps.lead_time,schedule_name:e.event._def.extendedProps.schedule_name,schedule_view:e.event._def.extendedProps.schedule_view,schedule_view_assignment:e.event._def.extendedProps.assignment,startDate:e.event._def.extendedProps.startDate,endDate:e.event._def.extendedProps.endDate,license_id:e.event._def.extendedProps.license_id};let i;i="true"===localStorage.getItem("isRtl")?"rtl":"ltr";const s=this.dialog.open(se,{data:{calendar:t,timeData:this.timeArray,action:"edit"},direction:i});this.subs.sink=s.afterClosed().subscribe(e=>{"submit"===e?(this.getScheduleDetails(),this.addCusForm.reset()):"delete"===e&&this.getScheduleDetails()})}editEvent(e,t){const i=this.calendarEvents.slice(),s=Object.assign({},i[e]);s.id=t.id,s.title=t.title,s.start=t.startDate,s.end=t.endDate,s.className="",s.groupId=t.category,s.details=t.details,i[e]=s,this.calendarEvents=i,this.calendarOptions.events=i}handleEvents(e){}createCalendarForm(e){return this.fb.group({id:[e.id],lead_time:[e.lead_time,[a.kI.required,a.kI.pattern("[a-zA-Z]+([a-zA-Z ]+)*")]],schedule_name:[e.schedule_name],schedule_view:[e.schedule_view],startDate:[e.startDate,[a.kI.required]],endDate:[e.endDate,[a.kI.required]]})}getTimeDetails(){this.calendarService.getTimeDetails().subscribe(e=>{let t=e.data[0];this.makeTimeIntervals(t.working_hour_from.substr(0,5),t.working_hour_to.substr(0,5),60,t.rest_hour_from.substr(0,5),t.rest_hour_to.substr(0,5))})}makeTimeIntervals(e,t,i,s,a){e=e.toString().split(":"),t=t.toString().split(":"),i=parseInt(i,10);var n=function(e){return e<10?"0"+e.toString():e},l=parseInt(e[0],10),r=parseInt(e[1],10),c=parseInt(t[0],10),o=(parseInt(t[1],10),l),d=r,h=o+":"+n(d),u="",p=[];do{((d+=i)%60==0||d>60)&&(d=60===d?0:d-60,o+=1),u=o+":"+n(d),p.push({range:h+" - "+u,checked:!1,checkValue:0}),h=u}while(o!==c);var g=s+" - "+a;this.timeArray=p.filter(e=>e.range!=g)}}return e.\u0275fac=function(t){return new(t||e)(C.Y36(a.qu),C.Y36(p.uw),C.Y36(F),C.Y36(o.ux),C.Y36(M.t2),C.Y36(b.F0),C.Y36(O._W),C.Y36(ne.x0))},e.\u0275cmp=C.Xpm({type:e,selectors:[["app-add-schedule"]],viewQuery:function(e,t){if(1&e&&C.Gf(re,5),2&e){let e;C.iGM(e=C.CRH())&&(t.calendar=e.first)}},features:[C.qOj],decls:30,vars:7,consts:[["bdColor","rgba(51,51,51,0.8)","size","medium","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],[1,"content"],[1,"container-fluid"],[1,"block-header"],[1,"row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12"],[1,"breadcrumb","breadcrumb-style"],[1,"breadcrumb-item"],[1,"page-title"],[1,"col-md-12","col-sm-12"],[1,"card"],[1,"card-body"],[1,"col-md-2","col-sm-12","p-l-30"],[1,"m-b-25"],[1,"filter-container"],["color","primary",3,"checked","value","change"],[4,"ngFor","ngForOf"],[1,"col-md-10","col-sm-12"],[1,"panel-body"],[3,"options"]],template:function(e,t){1&e&&(C.TgZ(0,"ngx-spinner",0),C.TgZ(1,"p",1),C._uU(2,"Loading..."),C.qZA(),C.qZA(),C.TgZ(3,"section",2),C.TgZ(4,"div",3),C.TgZ(5,"div",4),C.TgZ(6,"div",5),C.TgZ(7,"div",6),C.TgZ(8,"ul",7),C.TgZ(9,"li",8),C.TgZ(10,"h4",9),C._uU(11),C.ALo(12,"translate"),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.TgZ(13,"div",5),C.TgZ(14,"div",10),C.TgZ(15,"div",11),C.TgZ(16,"div",12),C.TgZ(17,"div",5),C.TgZ(18,"div",13),C._UZ(19,"div",14),C.TgZ(20,"div",15),C.TgZ(21,"ul"),C.TgZ(22,"li"),C.TgZ(23,"mat-checkbox",16),C.NdJ("change",function(e){return t.changeAll(e)}),C._uU(24," Select All"),C.qZA(),C.qZA(),C._UZ(25,"br"),C.YNc(26,ce,3,3,"li",17),C.qZA(),C.qZA(),C.qZA(),C.TgZ(27,"div",18),C.TgZ(28,"div",19),C._UZ(29,"full-calendar",20),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.qZA(),C.qZA()),2&e&&(C.xp6(11),C.Oqu(C.lcZ(12,5,"SCHEDULE.TITLE")),C.xp6(12),C.Q6J("checked",t.checkAll)("value",t.checkAll),C.xp6(3),C.Q6J("ngForOf",t.scheduleList),C.xp6(3),C.Q6J("options",t.calendarOptions))},directives:[M.Ro,f.oG,s.sg,le.woE],pipes:[V.X$],styles:[""]}),e})()}];let de=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=C.oAB({type:e}),e.\u0275inj=C.cJS({imports:[[b.Bz.forChild(oe)],b.Bz]}),e})();var he=i(46739),ue=i(17647),pe=i(37192),ge=i(279),me=i(9451),ve=i(85256),fe=i(52352);le.z1U.registerPlugins([ge.ZP,me.ZP,ve.Z,fe.ZP]);let Ae=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=C.oAB({type:e}),e.\u0275inj=C.cJS({providers:[F],imports:[[ue.xD,Y.Hi,he.d,s.ez,a.u5,a.UX,n.p0,l.TU,r.lN,c.c,o.ZX,d.ot,h.Ps,p.Is,g.JX,m.g0,u.LD,v.FA,f.p9,Z.Nh,T.Tx,A.Ad,de,w.Cq,_.T5,M.ef,y.yI,V.aw,R.Bb,le.z1U,pe.Ll,pe.x]]}),e})()}}]);