(self.webpackChunksmart=self.webpackChunksmart||[]).push([[5522],{95522:function(t,e,i){"use strict";i.d(e,{HS:function(){return S},oH:function(){return T},qn:function(){return B},qH:function(){return R},Hi:function(){return A}});var s=i(99235),a=i(35366),n=i(87064),h=i(19861),r=i(61116),c=i(26136),l=i(89666),o=i(15446),p=i(69056),d=i(69568),u=i(81258),_=i(97388),m=i(58378),g=i(13070),b=i(93169),f=i(94720),C=i(31041);const v=["*"],x=new a.OlP("MatChipRemove"),y=new a.OlP("MatChipAvatar"),I=new a.OlP("MatChipTrailingIcon");class w{constructor(t){this._elementRef=t}}const k=(0,n.sb)((0,n.pj)((0,n.Kr)(w),"primary"),-1);let S=(()=>{class t extends k{constructor(t,e,i,s,h,r,c,o){super(t),this._ngZone=e,this._changeDetectorRef=h,this._hasFocus=!1,this.chipListSelectable=!0,this._chipListMultiple=!1,this._chipListDisabled=!1,this._selected=!1,this._selectable=!0,this._disabled=!1,this._removable=!0,this._onFocus=new l.x,this._onBlur=new l.x,this.selectionChange=new a.vpe,this.destroyed=new a.vpe,this.removed=new a.vpe,this._addHostClassName(),this._chipRippleTarget=r.createElement("div"),this._chipRippleTarget.classList.add("mat-chip-ripple"),this._elementRef.nativeElement.appendChild(this._chipRippleTarget),this._chipRipple=new n.IR(this,e,this._chipRippleTarget,i),this._chipRipple.setupTriggerEvents(t),this.rippleConfig=s||{},this._animationsDisabled="NoopAnimations"===c,this.tabIndex=null!=o&&parseInt(o)||-1}get rippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||!!this.rippleConfig.disabled}get selected(){return this._selected}set selected(t){const e=(0,h.Ig)(t);e!==this._selected&&(this._selected=e,this._dispatchSelectionChange())}get value(){return void 0!==this._value?this._value:this._elementRef.nativeElement.textContent}set value(t){this._value=t}get selectable(){return this._selectable&&this.chipListSelectable}set selectable(t){this._selectable=(0,h.Ig)(t)}get disabled(){return this._chipListDisabled||this._disabled}set disabled(t){this._disabled=(0,h.Ig)(t)}get removable(){return this._removable}set removable(t){this._removable=(0,h.Ig)(t)}get ariaSelected(){return this.selectable&&(this._chipListMultiple||this.selected)?this.selected.toString():null}_addHostClassName(){const t=this._elementRef.nativeElement;t.hasAttribute("mat-basic-chip")||"mat-basic-chip"===t.tagName.toLowerCase()?t.classList.add("mat-basic-chip"):t.classList.add("mat-standard-chip")}ngOnDestroy(){this.destroyed.emit({chip:this}),this._chipRipple._removeTriggerEvents()}select(){this._selected||(this._selected=!0,this._dispatchSelectionChange(),this._changeDetectorRef.markForCheck())}deselect(){this._selected&&(this._selected=!1,this._dispatchSelectionChange(),this._changeDetectorRef.markForCheck())}selectViaInteraction(){this._selected||(this._selected=!0,this._dispatchSelectionChange(!0),this._changeDetectorRef.markForCheck())}toggleSelected(t=!1){return this._selected=!this.selected,this._dispatchSelectionChange(t),this._changeDetectorRef.markForCheck(),this.selected}focus(){this._hasFocus||(this._elementRef.nativeElement.focus(),this._onFocus.next({chip:this})),this._hasFocus=!0}remove(){this.removable&&this.removed.emit({chip:this})}_handleClick(t){this.disabled?t.preventDefault():t.stopPropagation()}_handleKeydown(t){if(!this.disabled)switch(t.keyCode){case s.yY:case s.ZH:this.remove(),t.preventDefault();break;case s.L_:this.selectable&&this.toggleSelected(!0),t.preventDefault()}}_blur(){this._ngZone.onStable.pipe((0,p.q)(1)).subscribe(()=>{this._ngZone.run(()=>{this._hasFocus=!1,this._onBlur.next({chip:this})})})}_dispatchSelectionChange(t=!1){this.selectionChange.emit({source:this,isUserInput:t,selected:this._selected})}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(a.SBq),a.Y36(a.R0b),a.Y36(b.t4),a.Y36(n.Y2,8),a.Y36(a.sBO),a.Y36(r.K0),a.Y36(c.Qb,8),a.$8M("tabindex"))},t.\u0275dir=a.lG2({type:t,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(t,e,i){if(1&t&&(a.Suo(i,y,5),a.Suo(i,I,5),a.Suo(i,x,5)),2&t){let t;a.iGM(t=a.CRH())&&(e.avatar=t.first),a.iGM(t=a.CRH())&&(e.trailingIcon=t.first),a.iGM(t=a.CRH())&&(e.removeIcon=t.first)}},hostAttrs:["role","option",1,"mat-chip","mat-focus-indicator"],hostVars:14,hostBindings:function(t,e){1&t&&a.NdJ("click",function(t){return e._handleClick(t)})("keydown",function(t){return e._handleKeydown(t)})("focus",function(){return e.focus()})("blur",function(){return e._blur()}),2&t&&(a.uIk("tabindex",e.disabled?null:e.tabIndex)("disabled",e.disabled||null)("aria-disabled",e.disabled.toString())("aria-selected",e.ariaSelected),a.ekj("mat-chip-selected",e.selected)("mat-chip-with-avatar",e.avatar)("mat-chip-with-trailing-icon",e.trailingIcon||e.removeIcon)("mat-chip-disabled",e.disabled)("_mat-animation-noopable",e._animationsDisabled))},inputs:{color:"color",disableRipple:"disableRipple",tabIndex:"tabIndex",selected:"selected",value:"value",selectable:"selectable",disabled:"disabled",removable:"removable"},outputs:{selectionChange:"selectionChange",destroyed:"destroyed",removed:"removed"},exportAs:["matChip"],features:[a.qOj]}),t})(),R=(()=>{class t{constructor(t,e){this._parentChip=t,"BUTTON"===e.nativeElement.nodeName&&e.nativeElement.setAttribute("type","button")}_handleClick(t){const e=this._parentChip;e.removable&&!e.disabled&&e.remove(),t.stopPropagation()}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(S),a.Y36(a.SBq))},t.\u0275dir=a.lG2({type:t,selectors:[["","matChipRemove",""]],hostAttrs:[1,"mat-chip-remove","mat-chip-trailing-icon"],hostBindings:function(t,e){1&t&&a.NdJ("click",function(t){return e._handleClick(t)})},features:[a._Bn([{provide:x,useExisting:t}])]}),t})();const L=new a.OlP("mat-chips-default-options"),F=(0,n.FD)(class{constructor(t,e,i,s){this._defaultErrorStateMatcher=t,this._parentForm=e,this._parentFormGroup=i,this.ngControl=s}});let O=0;class E{constructor(t,e){this.source=t,this.value=e}}let B=(()=>{class t extends F{constructor(t,e,i,s,n,h,r){super(h,s,n,r),this._elementRef=t,this._changeDetectorRef=e,this._dir=i,this.controlType="mat-chip-list",this._lastDestroyedChipIndex=null,this._destroyed=new l.x,this._uid="mat-chip-list-"+O++,this._tabIndex=0,this._userTabIndex=null,this._onTouched=()=>{},this._onChange=()=>{},this._multiple=!1,this._compareWith=(t,e)=>t===e,this._required=!1,this._disabled=!1,this.ariaOrientation="horizontal",this._selectable=!0,this.change=new a.vpe,this.valueChange=new a.vpe,this.ngControl&&(this.ngControl.valueAccessor=this)}get selected(){var t,e;return this.multiple?(null===(t=this._selectionModel)||void 0===t?void 0:t.selected)||[]:null===(e=this._selectionModel)||void 0===e?void 0:e.selected[0]}get role(){return this.empty?null:"listbox"}get multiple(){return this._multiple}set multiple(t){this._multiple=(0,h.Ig)(t),this._syncChipsState()}get compareWith(){return this._compareWith}set compareWith(t){this._compareWith=t,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(t){this.writeValue(t),this._value=t}get id(){return this._chipInput?this._chipInput.id:this._uid}get required(){return this._required}set required(t){this._required=(0,h.Ig)(t),this.stateChanges.next()}get placeholder(){return this._chipInput?this._chipInput.placeholder:this._placeholder}set placeholder(t){this._placeholder=t,this.stateChanges.next()}get focused(){return this._chipInput&&this._chipInput.focused||this._hasFocusedChip()}get empty(){return(!this._chipInput||this._chipInput.empty)&&(!this.chips||0===this.chips.length)}get shouldLabelFloat(){return!this.empty||this.focused}get disabled(){return this.ngControl?!!this.ngControl.disabled:this._disabled}set disabled(t){this._disabled=(0,h.Ig)(t),this._syncChipsState()}get selectable(){return this._selectable}set selectable(t){this._selectable=(0,h.Ig)(t),this.chips&&this.chips.forEach(t=>t.chipListSelectable=this._selectable)}set tabIndex(t){this._userTabIndex=t,this._tabIndex=t}get chipSelectionChanges(){return(0,o.T)(...this.chips.map(t=>t.selectionChange))}get chipFocusChanges(){return(0,o.T)(...this.chips.map(t=>t._onFocus))}get chipBlurChanges(){return(0,o.T)(...this.chips.map(t=>t._onBlur))}get chipRemoveChanges(){return(0,o.T)(...this.chips.map(t=>t.destroyed))}ngAfterContentInit(){this._keyManager=new _.Em(this.chips).withWrap().withVerticalOrientation().withHomeAndEnd().withHorizontalOrientation(this._dir?this._dir.value:"ltr"),this._dir&&this._dir.change.pipe((0,d.R)(this._destroyed)).subscribe(t=>this._keyManager.withHorizontalOrientation(t)),this._keyManager.tabOut.pipe((0,d.R)(this._destroyed)).subscribe(()=>{this._allowFocusEscape()}),this.chips.changes.pipe((0,u.O)(null),(0,d.R)(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>{this._syncChipsState()}),this._resetChips(),this._initializeSelection(),this._updateTabIndex(),this._updateFocusForDestroyedChips(),this.stateChanges.next()})}ngOnInit(){this._selectionModel=new m.Ov(this.multiple,void 0,!1),this.stateChanges.next()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==this._disabled&&(this.disabled=!!this.ngControl.disabled))}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.stateChanges.complete(),this._dropSubscriptions()}registerInput(t){this._chipInput=t,this._elementRef.nativeElement.setAttribute("data-mat-chip-input",t.id)}setDescribedByIds(t){this._ariaDescribedby=t.join(" ")}writeValue(t){this.chips&&this._setSelectionByValue(t,!1)}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t,this.stateChanges.next()}onContainerClick(t){this._originatesFromChip(t)||this.focus()}focus(t){this.disabled||this._chipInput&&this._chipInput.focused||(this.chips.length>0?(this._keyManager.setFirstItemActive(),this.stateChanges.next()):(this._focusInput(t),this.stateChanges.next()))}_focusInput(t){this._chipInput&&this._chipInput.focus(t)}_keydown(t){const e=t.target;e&&e.classList.contains("mat-chip")&&(this._keyManager.onKeydown(t),this.stateChanges.next())}_updateTabIndex(){this._tabIndex=this._userTabIndex||(0===this.chips.length?-1:0)}_updateFocusForDestroyedChips(){if(null!=this._lastDestroyedChipIndex)if(this.chips.length){const t=Math.min(this._lastDestroyedChipIndex,this.chips.length-1);this._keyManager.setActiveItem(t)}else this.focus();this._lastDestroyedChipIndex=null}_isValidIndex(t){return t>=0&&t<this.chips.length}_setSelectionByValue(t,e=!0){if(this._clearSelection(),this.chips.forEach(t=>t.deselect()),Array.isArray(t))t.forEach(t=>this._selectValue(t,e)),this._sortValues();else{const i=this._selectValue(t,e);i&&e&&this._keyManager.setActiveItem(i)}}_selectValue(t,e=!0){const i=this.chips.find(e=>null!=e.value&&this._compareWith(e.value,t));return i&&(e?i.selectViaInteraction():i.select(),this._selectionModel.select(i)),i}_initializeSelection(){Promise.resolve().then(()=>{(this.ngControl||this._value)&&(this._setSelectionByValue(this.ngControl?this.ngControl.value:this._value,!1),this.stateChanges.next())})}_clearSelection(t){this._selectionModel.clear(),this.chips.forEach(e=>{e!==t&&e.deselect()}),this.stateChanges.next()}_sortValues(){this._multiple&&(this._selectionModel.clear(),this.chips.forEach(t=>{t.selected&&this._selectionModel.select(t)}),this.stateChanges.next())}_propagateChanges(t){let e=null;e=Array.isArray(this.selected)?this.selected.map(t=>t.value):this.selected?this.selected.value:t,this._value=e,this.change.emit(new E(this,e)),this.valueChange.emit(e),this._onChange(e),this._changeDetectorRef.markForCheck()}_blur(){this._hasFocusedChip()||this._keyManager.setActiveItem(-1),this.disabled||(this._chipInput?setTimeout(()=>{this.focused||this._markAsTouched()}):this._markAsTouched())}_markAsTouched(){this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next()}_allowFocusEscape(){-1!==this._tabIndex&&(this._tabIndex=-1,setTimeout(()=>{this._tabIndex=this._userTabIndex||0,this._changeDetectorRef.markForCheck()}))}_resetChips(){this._dropSubscriptions(),this._listenToChipsFocus(),this._listenToChipsSelection(),this._listenToChipsRemoved()}_dropSubscriptions(){this._chipFocusSubscription&&(this._chipFocusSubscription.unsubscribe(),this._chipFocusSubscription=null),this._chipBlurSubscription&&(this._chipBlurSubscription.unsubscribe(),this._chipBlurSubscription=null),this._chipSelectionSubscription&&(this._chipSelectionSubscription.unsubscribe(),this._chipSelectionSubscription=null),this._chipRemoveSubscription&&(this._chipRemoveSubscription.unsubscribe(),this._chipRemoveSubscription=null)}_listenToChipsSelection(){this._chipSelectionSubscription=this.chipSelectionChanges.subscribe(t=>{t.source.selected?this._selectionModel.select(t.source):this._selectionModel.deselect(t.source),this.multiple||this.chips.forEach(t=>{!this._selectionModel.isSelected(t)&&t.selected&&t.deselect()}),t.isUserInput&&this._propagateChanges()})}_listenToChipsFocus(){this._chipFocusSubscription=this.chipFocusChanges.subscribe(t=>{let e=this.chips.toArray().indexOf(t.chip);this._isValidIndex(e)&&this._keyManager.updateActiveItem(e),this.stateChanges.next()}),this._chipBlurSubscription=this.chipBlurChanges.subscribe(()=>{this._blur(),this.stateChanges.next()})}_listenToChipsRemoved(){this._chipRemoveSubscription=this.chipRemoveChanges.subscribe(t=>{const e=t.chip,i=this.chips.toArray().indexOf(t.chip);this._isValidIndex(i)&&e._hasFocus&&(this._lastDestroyedChipIndex=i)})}_originatesFromChip(t){let e=t.target;for(;e&&e!==this._elementRef.nativeElement;){if(e.classList.contains("mat-chip"))return!0;e=e.parentElement}return!1}_hasFocusedChip(){return this.chips&&this.chips.some(t=>t._hasFocus)}_syncChipsState(){this.chips&&this.chips.forEach(t=>{t._chipListDisabled=this._disabled,t._chipListMultiple=this.multiple})}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(a.SBq),a.Y36(a.sBO),a.Y36(f.Is,8),a.Y36(C.F,8),a.Y36(C.sg,8),a.Y36(n.rD),a.Y36(C.a5,10))},t.\u0275cmp=a.Xpm({type:t,selectors:[["mat-chip-list"]],contentQueries:function(t,e,i){if(1&t&&a.Suo(i,S,5),2&t){let t;a.iGM(t=a.CRH())&&(e.chips=t)}},hostAttrs:[1,"mat-chip-list"],hostVars:15,hostBindings:function(t,e){1&t&&a.NdJ("focus",function(){return e.focus()})("blur",function(){return e._blur()})("keydown",function(t){return e._keydown(t)}),2&t&&(a.Ikx("id",e._uid),a.uIk("tabindex",e.disabled?null:e._tabIndex)("aria-describedby",e._ariaDescribedby||null)("aria-required",e.role?e.required:null)("aria-disabled",e.disabled.toString())("aria-invalid",e.errorState)("aria-multiselectable",e.multiple)("role",e.role)("aria-orientation",e.ariaOrientation),a.ekj("mat-chip-list-disabled",e.disabled)("mat-chip-list-invalid",e.errorState)("mat-chip-list-required",e.required))},inputs:{ariaOrientation:["aria-orientation","ariaOrientation"],multiple:"multiple",compareWith:"compareWith",value:"value",required:"required",placeholder:"placeholder",disabled:"disabled",selectable:"selectable",tabIndex:"tabIndex",errorStateMatcher:"errorStateMatcher"},outputs:{change:"change",valueChange:"valueChange"},exportAs:["matChipList"],features:[a._Bn([{provide:g.Eo,useExisting:t}]),a.qOj],ngContentSelectors:v,decls:2,vars:0,consts:[[1,"mat-chip-list-wrapper"]],template:function(t,e){1&t&&(a.F$t(),a.TgZ(0,"div",0),a.Hsn(1),a.qZA())},styles:['.mat-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;transform:translateZ(0);border:none;-webkit-appearance:none;-moz-appearance:none}.mat-standard-chip{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:inline-flex;padding:7px 12px;border-radius:16px;align-items:center;cursor:default;min-height:32px;height:1px}._mat-animation-noopable.mat-standard-chip{transition:none;animation:none}.mat-standard-chip .mat-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-standard-chip .mat-chip-remove.mat-icon,.mat-standard-chip .mat-chip-remove .mat-icon{width:18px;height:18px;font-size:18px}.mat-standard-chip::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;opacity:0;content:"";pointer-events:none;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-standard-chip:hover::after{opacity:.12}.mat-standard-chip:focus{outline:none}.mat-standard-chip:focus::after{opacity:.16}.cdk-high-contrast-active .mat-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-standard-chip:focus{outline:dotted 2px}.mat-standard-chip.mat-chip-disabled::after{opacity:0}.mat-standard-chip.mat-chip-disabled .mat-chip-remove,.mat-standard-chip.mat-chip-disabled .mat-chip-trailing-icon{cursor:default}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar,.mat-standard-chip.mat-chip-with-avatar{padding-top:0;padding-bottom:0}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-right:8px;padding-left:0}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-left:8px;padding-right:0}.mat-standard-chip.mat-chip-with-trailing-icon{padding-top:7px;padding-bottom:7px;padding-right:8px;padding-left:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon{padding-left:8px;padding-right:12px}.mat-standard-chip.mat-chip-with-avatar{padding-left:0;padding-right:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-avatar{padding-right:0;padding-left:12px}.mat-standard-chip .mat-chip-avatar{width:24px;height:24px;margin-right:8px;margin-left:4px}[dir=rtl] .mat-standard-chip .mat-chip-avatar{margin-left:8px;margin-right:4px}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-standard-chip .mat-chip-remove,[dir=rtl] .mat-standard-chip .mat-chip-trailing-icon{margin-right:8px;margin-left:0}.mat-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit;overflow:hidden}.mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.mat-chip-list-wrapper input.mat-input-element,.mat-chip-list-wrapper .mat-standard-chip{margin:4px}.mat-chip-list-stacked .mat-chip-list-wrapper{flex-direction:column;align-items:flex-start}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-standard-chip{width:100%}.mat-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;object-fit:cover}input.mat-chip-input{width:150px;margin:4px;flex:1 0 150px}\n'],encapsulation:2,changeDetection:0}),t})(),D=0,T=(()=>{class t{constructor(t,e){this._elementRef=t,this._defaultOptions=e,this.focused=!1,this._addOnBlur=!1,this.separatorKeyCodes=this._defaultOptions.separatorKeyCodes,this.chipEnd=new a.vpe,this.placeholder="",this.id="mat-chip-list-input-"+D++,this._disabled=!1,this.inputElement=this._elementRef.nativeElement}set chipList(t){t&&(this._chipList=t,this._chipList.registerInput(this))}get addOnBlur(){return this._addOnBlur}set addOnBlur(t){this._addOnBlur=(0,h.Ig)(t)}get disabled(){return this._disabled||this._chipList&&this._chipList.disabled}set disabled(t){this._disabled=(0,h.Ig)(t)}get empty(){return!this.inputElement.value}ngOnChanges(){this._chipList.stateChanges.next()}ngOnDestroy(){this.chipEnd.complete()}ngAfterContentInit(){this._focusLastChipOnBackspace=this.empty}_keydown(t){if(t){if(t.keyCode!==s.Mf||(0,s.Vb)(t,"shiftKey")||this._chipList._allowFocusEscape(),t.keyCode===s.ZH&&this._focusLastChipOnBackspace)return this._chipList._keyManager.setLastItemActive(),void t.preventDefault();this._focusLastChipOnBackspace=!1}this._emitChipEnd(t)}_keyup(t){!this._focusLastChipOnBackspace&&t.keyCode===s.ZH&&this.empty&&(this._focusLastChipOnBackspace=!0,t.preventDefault())}_blur(){this.addOnBlur&&this._emitChipEnd(),this.focused=!1,this._chipList.focused||this._chipList._blur(),this._chipList.stateChanges.next()}_focus(){this.focused=!0,this._focusLastChipOnBackspace=this.empty,this._chipList.stateChanges.next()}_emitChipEnd(t){!this.inputElement.value&&t&&this._chipList._keydown(t),t&&!this._isSeparatorKey(t)||(this.chipEnd.emit({input:this.inputElement,value:this.inputElement.value,chipInput:this}),null==t||t.preventDefault())}_onInput(){this._chipList.stateChanges.next()}focus(t){this.inputElement.focus(t)}clear(){this.inputElement.value="",this._focusLastChipOnBackspace=!0}_isSeparatorKey(t){return!(0,s.Vb)(t)&&new Set(this.separatorKeyCodes).has(t.keyCode)}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(a.SBq),a.Y36(L))},t.\u0275dir=a.lG2({type:t,selectors:[["input","matChipInputFor",""]],hostAttrs:[1,"mat-chip-input","mat-input-element"],hostVars:5,hostBindings:function(t,e){1&t&&a.NdJ("keydown",function(t){return e._keydown(t)})("keyup",function(t){return e._keyup(t)})("blur",function(){return e._blur()})("focus",function(){return e._focus()})("input",function(){return e._onInput()}),2&t&&(a.Ikx("id",e.id),a.uIk("disabled",e.disabled||null)("placeholder",e.placeholder||null)("aria-invalid",e._chipList&&e._chipList.ngControl?e._chipList.ngControl.invalid:null)("aria-required",e._chipList&&e._chipList.required||null))},inputs:{separatorKeyCodes:["matChipInputSeparatorKeyCodes","separatorKeyCodes"],placeholder:"placeholder",id:"id",chipList:["matChipInputFor","chipList"],addOnBlur:["matChipInputAddOnBlur","addOnBlur"],disabled:"disabled"},outputs:{chipEnd:"matChipInputTokenEnd"},exportAs:["matChipInput","matChipInputFor"],features:[a.TTD]}),t})();const M={separatorKeyCodes:[s.K5]};let A=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({providers:[n.rD,{provide:L,useValue:M}],imports:[[n.BQ]]}),t})()}}]);