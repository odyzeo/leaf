var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(b,g,k){b instanceof String&&(b=String(b));for(var f=b.length,a=0;a<f;a++){var c=b[a];if(g.call(k,c,a,b))return{i:a,v:c}}return{i:-1,v:void 0}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(b,g,k){b!=Array.prototype&&b!=Object.prototype&&(b[g]=k.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};
$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(b,g,k,f){if(g){k=$jscomp.global;b=b.split(".");for(f=0;f<b.length-1;f++){var a=b[f];a in k||(k[a]={});k=k[a]}b=b[b.length-1];f=k[b];g=g(f);g!=f&&null!=g&&$jscomp.defineProperty(k,b,{configurable:!0,writable:!0,value:g})}};$jscomp.polyfill("Array.prototype.find",function(b){return b?b:function(b,k){return $jscomp.findInternal(this,b,k).v}},"es6-impl","es3");$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(b){var g=0;return $jscomp.iteratorPrototype(function(){return g<b.length?{done:!1,value:b[g++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};$jscomp.iteratorFromArray=function(b,g){$jscomp.initSymbolIterator();b instanceof String&&(b+="");var k=0,f={next:function(){if(k<b.length){var a=k++;return{value:g(a,b[a]),done:!1}}f.next=function(){return{done:!0,value:void 0}};return f.next()}};f[Symbol.iterator]=function(){return f};return f};
$jscomp.polyfill("Array.prototype.keys",function(b){return b?b:function(){return $jscomp.iteratorFromArray(this,function(b){return b})}},"es6-impl","es3");var ThemifyBuilderCommon;
window.top.document!==document?(window.wp.media=window.top.wp.media,MediaElementPlayer=window.top.MediaElementPlayer,jQuery.fn.mediaelementplayer=window.top.jQuery(window.top.document).mediaelementplayer,jQuery.ui=window.top.jQuery.ui,jQuery.fn.sortable=window.top.jQuery(window.top.document).sortable,window.wp.mediaelement=window.top.wp.mediaelement,window.tinyMCE=window.top.tinyMCE,window.tinyMCEPreInit=window.top.tinyMCEPreInit,window.tinymce=window.top.tinymce,window.switchEditors=window.top.switchEditors,
top_iframe=window.top.document):top_iframe=document;
(function(b,g,k,f){ThemifyBuilderCommon={fonts:[],safe_fonts:{},google_fonts:{},loaded_fonts:[],showLoader:function(a){var c=b("#themify_builder_alert",top_iframe);"show"===a?c.addClass("tb_busy").show():"spinhide"===a?c.fadeOut(500,function(){b(this).removeClass("tb_busy")}):("error"!==a&&(a="done"),c.removeClass("tb_busy").addClass("tb_"+a).delay(500).fadeOut(500,function(){b(this).removeClass("tb_"+a)}))},setUpTooltip:function(){if(0<b(".themify_is_premium_module,.themify_builder_lite",top_iframe).length){0===
b(".themify_tooltip").length&&b('<div class="themify_tooltip">Upgrade to premium version to get this feature<div class="themify_tooltip_arrow"><div class="themify_tooltip_arrow_border"></div><div class="themify_tooltip_arrow_background"></div></div></div>').appendTo("body");var a=b(".themify_tooltip").outerWidth(!0)/2+10,c=b(".themify_tooltip").outerHeight(!0)+10;b(".themify_builder_lite,.themify_is_premium_module").each(function(){if(0===b(this).children(".themify_builder_lite_modal").length){var d=
b(this);b('<div class="themify_builder_lite_modal"></div>').appendTo(b(this)).mouseenter(function(e){var l=0<d.children(".themify_builder_input").length,g=b(".themify_tooltip");e=b(this).offset();var h=e.top-c,l=l?50:b(this).width()/2-a;b(".themify_builder_lite_active").removeClass("themify_builder_lite_active");b(this).addClass("themify_builder_lite_active");-10>h?g.addClass("themify_tooltip_arrow_top"):g.removeClass("themify_tooltip_arrow_top");g.css({top:Math.abs(h),left:e.left+l}).delay(500).queue(function(a){var c=
b(this);0<b(".themify_builder_lite_active").length?c.stop().fadeIn("fast"):c.hide();a()});setTimeout(function(){if(0===b(".themify_builder_lite_active").length)g.hide();else{var a=!1;b(".themify_builder_lite_modal").each(function(){if(b(this).is(":hover"))return a=!0,!1});a||(b(".themify_builder_lite_active").removeClass("themify_builder_lite_active"),g.hide())}},1E3)}).mouseleave(function(){b(".themify_builder_lite_active").removeClass("themify_builder_lite_active");b(".themify_tooltip").hide()})}});
b(g).scroll(function(){b(".themify_builder_lite_active").trigger("mouseenter")})}},Clipboard:{key:"themify_builder_clipboard_",is_available:null,storageAvailable:function(a){if(null===this.is_available)try{var b=g[a];b.setItem("__storage_test__","__storage_test__");b.removeItem("__storage_test__");this.is_available=!0}catch(d){this.is_available=!1,alert(themifyBuilder.i18n.text_no_localStorage)}return this.is_available},set:function(a,b){if(this.storageAvailable("localStorage")){var c={};c[a]=b;localStorage.setItem(this.key+
"content",JSON.stringify(c));return!0}return!1},get:function(a){if(this.storageAvailable("localStorage")){var b=JSON.parse(localStorage.getItem(this.key+"content"));return b[a]!==f?b[a]:!1}return!1}},confirmDataPaste:function(){return confirm(themifyBuilder.i18n.text_confirm_data_paste)},alertWrongPaste:function(){alert(themifyBuilder.i18n.text_alert_wrong_paste)},detectBuilderComponent:function(a){return a.data("component")||a.attr("data-component")||!1},getCheckedRadioInGroup:function(a,c){"undefined"===
typeof c&&(c=null);var d=a.attr("name");return b('input:radio[name="'+d+'"]:checked',c)},loadGoogleFonts:function(a,b){b=b||!1;var c={google:{families:a}};WebFont.load(c);b&&(c.context=b,WebFont.load(c))},autoComplete:function(a){var c=b(".themify_tax_autocomplete",a);if(0<c.length){var d=[];c.each(function(){var a=b(this),c=a.closest(".themify_builder_input").find("input.query_category_multiple"),g=c.val();b(this).autocomplete({minLength:2,source:function(c,e){var d=b.trim(c.term);b.getJSON(themifyBuilder.ajaxurl,
{term:b.trim(d),tax:a.data("tax"),action:a.data("action")},function(a,b,c){e(a)})},select:function(a,b){c.val(b.item.value);this.value=b.item.label;return!1}}).focus(function(){b(this).autocomplete("search");return!1});if(g&&"undefined"!==g){var h={};h[a.data("tax")]=g;d.push(h)}else c.val("")});0<d.length&&b.ajax({url:themifyBuilder.ajaxurl,type:"POST",dataType:"json",data:{data:d,action:"themify_builder_get_tax_data"},success:function(c){if(c)for(var e in c)b("#themify_search_cat_"+c[e].tax,a).val(c[e].val)}})}},
fontPreview:function(a){function c(a){var c=a.comboSelect({comboClass:"themify-combo-select",comboArrowClass:"themify-combo-arrow",comboDropDownClass:"themify-combo-dropdown",inputClass:"themify-combo-input",disabledClass:"themify-combo-disabled",hoverClass:"themify-combo-hover",selectedClass:"themify-combo-selected",markerClass:"themify-combo-marker"}).parent("div");c.on("comboselect:close",function(){b(".themify_builder_font_preview",top_iframe).hide()}).on("click.item",".themify-combo-item",function(c){var d=
b(this).data("value");d&&-1===b.inArray(d,e.loaded_fonts)&&"webfont"!==a.find('option[value="'+d+'"]').data("type")&&WebFont.load({classes:!1,google:{families:[d]},fontloading:function(a,b){e.loaded_fonts.push(d)},fontinactive:function(a,b){e.loaded_fonts.push(d)}})}).trigger("focusin");b(".themify-combo-item",c).unbind("hover").hover(function(){var f=b(this).data("value");if(f&&b(this).is(":visible")){var h=c.next(".themify_builder_font_preview");"default"===f&&(f="inherit");h.css({top:b(this).position().top+
30,"font-family":f,display:"block"});if("inherit"!==f&&!b(this).hasClass("themify_builder_font_loaded")){var l=b(this),k=l.index();l.addClass("themify_builder_font_loaded");h=h.children("span");-1===b.inArray(f,e.fonts)&&(h.addClass("themify_show_wait"),"webfont"!==a.find('option[value="'+f+'"]').data("type")?WebFont.load({classes:!1,context:g.top,google:{families:[f]},fontloading:function(a,b){e.fonts.push(f);h.removeClass("themify_show_wait")},fontinactive:function(a,b){e.fonts.push(f);h.removeClass("themify_show_wait")}}):
(e.fonts.push(f),h.removeClass("themify_show_wait")));d(k,f,h)}}})}function d(a,c){b(".themify-combo-dropdown",top_iframe).find("li:eq("+a+")").addClass("themify_builder_font_loaded").css("font-family",c)}var e=ThemifyBuilderCommon;setTimeout(function(){e.autoComplete(a)},1);var l="",k="";if(0===Object.keys(e.safe_fonts).length){for(var h=themifyBuilder.fonts.safe,f=0,n=h.length;f<n;++f)""!==h[f].value&&"default"!==h[f].value&&(e.safe_fonts[h[f].value]=h[f].name);h=themifyBuilder.fonts.google;f=0;
for(n=h.length;f<n;++f)""!==h[f].value&&"default"!==h[f].value&&(e.google_fonts[h[f].value]=h[f].name);delete themifyBuilder.fonts}a.find(".font-family-select").each(function(){var a=b(this).data("selected"),d=b(this).find("optgroup");b(this).parent(".themify_builder_font_preview_wrapper").focusin(function(){b(this).unbind("focusin");if(!l){for(var f in e.safe_fonts){var h=a===f?'selected="selected"':"";l+="<option "+h+' data-type="webfont" value="'+f+'">'+e.safe_fonts[f]+"</option>"}for(f in e.google_fonts)h=
a===f?'selected="selected"':"",k+="<option "+h+' value="'+f+'">'+e.google_fonts[f]+"</option>"}d[0].insertAdjacentHTML("beforeend",l);d.last()[0].insertAdjacentHTML("beforeend",k);c(b(this).children("select"))});a&&(e.safe_fonts[a]?d[0].insertAdjacentHTML("beforeend",'<option selected="selected" data-type="webfont" value="'+a+'">'+e.safe_fonts[a]+"</option>"):e.google_fonts[a]&&d.last()[0].insertAdjacentHTML("beforeend",'<option selected="selected" value="'+a+'">'+e.google_fonts[a]+"</option>"))});
if(0<e.fonts.length){var h=b(".themify-combo-dropdown").first(),p;for(p in e.fonts)f=h.find('[data-value="'+e.fonts[p]+'"]').index(),d(f,e.fonts[p])}b(".themify-combo-arrow",top_iframe).unbind("click").click(function(){b(".themify_builder_font_preview",top_iframe).hide()})},Lightbox:{$lightbox:null,rememberedRow:null,rememberedCid:null,setup:function(){var a="true"===themifyBuilder.isThemifyTheme?"is-themify-theme":"is-not-themify-theme",a=wp.template("builder_lightbox")({is_themify_theme:a});top_iframe.body.insertAdjacentHTML("beforeend",
a);this.$lightbox=b("#themify_builder_lightbox_parent",top_iframe);this.bindEvents()},bindEvents:function(){var a=ThemifyBuilderCommon.Lightbox,c="true"===themifyBuilder.isTouch?"touchend":"click";SimpleBar.removeObserver();a.$lightbox.on(c,".themify_builder_options_tab li,.themify_builder_tabs>ul li",a.switchTabs).on(c,".builder_cancel_lightbox",a.cancel).on(c,".reset-styling",a.resetStyling).on("change",".tb-option-radio-enable input",a.clickRadioOption).on("change",".tb-option-checkbox-enable input",
a.clickCheckboxOption).on("change",".border_style",a.hideShowBorder).on(c,".tb-icon-radio label",a.bindStylingToggles).on(c,".tb-style-toggle",a.bindStylingRows).on("change","#tb_module_settings .query_category_single",function(){b(this).closest(".themify_builder_input").find(".query_category_multiple").val(b(this).val())}).one("themify_opened_lightbox",a.resizable.init.bind(a.resizable));k.body.insertAdjacentHTML("beforeend",'<div id="themify_builder_overlay"></div>');themifyBuilder.disableShortcuts||
a.controlByKeyInput();if("visual"===themifybuilderapp.mode)a.$lightbox.on(c,".builder_cancel_docked_mode",function(c){c.preventDefault();c.stopPropagation();a.dockMode.close(!0);b(k).trigger("mouseup")})},adjustHeight:function(a){this.$lightbox.find("#themify_builder_lightbox_container").css("height",a-55)},getLightboxStorageKey:function(){return"visual"===themifybuilderapp.mode?"themify_builder_lightbox_frontend_pos_size":"themify_builder_lightbox_backend_pos_size"},getLightboxStorage:function(){var a=
localStorage.getItem(this.getLightboxStorageKey())||"{}";return JSON.parse(a)},updateLightboxStorage:function(a){var b=this.getLightboxStorage(),d;(d=_.extend(b,a))&&localStorage.setItem(this.getLightboxStorageKey(),JSON.stringify(d))},resizable:{$el:"",w:"",h:"",x:"",y:"",axis:"",overlay:!1,minWidth:500,maxWidth:880,minHeight:320,maxHeight:800,init:function(){var a=this,c=ThemifyBuilderCommon.Lightbox,d=b("body",top_iframe),e=function(e,g){if(g!==f&&e&&e.target.classList.contains("builder-lightbox"))switch(e.type){case "dragstart":d.addClass("themify_lightbox_drag");
c.fixContainment();break;case "dragstop":d.removeClass("themify_lightbox_drag"),c.fixContainment(),"visual"===themifybuilderapp.mode&&b(k).trigger("mouseup"),a.remember();case "drag":c.dockMode.drag(e)}};this.$el=c.$lightbox;a.$el.draggable({handle:a.$el.find(".themify_builder_lightbox_top_bar"),scroll:!1,start:e,drag:e,stop:e});"visual"===themifybuilderapp.mode&&(this.tb_resizable_overlay=this.$el.prev(".tb_resizable_overlay"));for(var e=this.$el[0].getElementsByClassName("tb_resizable"),g=0,m=e.length;g<
m;++g)e[g].addEventListener("mousedown",function(c){1===c.which&&(c.preventDefault(),a.x=c.clientX,a.y=c.clientY,a.w=parseInt(a.$el.outerWidth(),10),a.h=parseInt(a.$el.outerHeight(),10),a.axis=this.classList.contains("tb_resizable-se")?"both":this.classList.contains("tb_resizable-s")?"y":this.classList.contains("tb_resizable-w")?"w":"x",a.tb_resizable_overlay&&a.tb_resizable_overlay.show(),a.$el.addClass("tb_resizing"),top_iframe.addEventListener("mousemove",a.resize,!1),top_iframe.addEventListener("mouseup",
a.stop,!1),"w"===a.axis&&(d.addClass("tb_start_animate"),b("body").addClass("tb_start_animate")))},!1);b("body").on("editing_module_option",a.setupLightboxSizeClass)},remember:function(){var a=ThemifyBuilderCommon.Lightbox.resizable,b=a.$el.position(),d=ThemifyBuilderCommon.Lightbox.dockMode.get(),e=ThemifyBuilderCommon.Lightbox.getLightboxStorage(),b={top:b.top,left:b.left,width:d&&e?e.width:a.$el.outerWidth(),height:d&&e?e.height:a.$el.outerHeight()};d&&(b.dockedWidth=a.$el.outerWidth());ThemifyBuilderCommon.Lightbox.updateLightboxStorage(b)},
setupLightboxSizeClass:function(){var a=ThemifyBuilderCommon.Lightbox.resizable;a.$el.toggleClass("larger-lightbox",750<parseInt(a.$el.width()))},resize:function(a){var b=ThemifyBuilderCommon.Lightbox.resizable,d=b.w+a.clientX-b.x,e=b.h+a.clientY-b.y;"w"===b.axis?(d=b.x+b.w-a.clientX,300<=d&&d<=b.maxWidth&&(b.$el.width(d),b.setupLightboxSizeClass(),ThemifyBuilderCommon.Lightbox.dockMode.resize(a))):(("both"===b.axis||"x"===b.axis)&&d>=b.minWidth&&d<=b.maxWidth&&(b.$el.width(d),b.setupLightboxSizeClass()),
("both"===b.axis||"y"===b.axis)&&e>=b.minHeight&&e<=b.maxHeight&&(b.$el.height(e),ThemifyBuilderCommon.Lightbox.adjustHeight(b.$el.height())))},stop:function(a){a=ThemifyBuilderCommon.Lightbox;var c=a.resizable;c.tb_resizable_overlay&&c.tb_resizable_overlay.hide();c.$el.removeClass("tb_resizing");top_iframe.removeEventListener("mousemove",c.resize,!1);top_iframe.removeEventListener("mouseup",c.stop,!1);a.fixContainment();c.remember();a.dockMode.resize("stop");b("body").trigger("themify_builder_lightbox_resize");
"w"===c.axis&&(a=b("body",top_iframe),a=a.add("body"),a.removeClass("tb_start_animate"))}},fixContainment:function(){var a=ThemifyBuilderCommon.Lightbox,c=a.$lightbox.outerWidth(),d=b(g.top).width(),e=b(g.top).height(),c=[-c+20,0,d-20,e-30],d=a.$lightbox.position(),e={};d.left<c[0]&&(e.left=c[0]);0>d.top&&(e.top=0);d.left>c[2]&&(e.left=c[2]);d.top>c[3]&&(e.top=c[3]);a.$lightbox.css(e)},open:function(a,c,d){var e=ThemifyBuilderCommon.Lightbox,f=b("#themify_builder_lightbox_container",e.$lightbox);
themifybuilderapp.toolbar.Panel.hide();b("#themify_builder_overlay").show();ThemifyBuilderCommon.showLoader("show");"inline"===a.loadMethod?(a=ThemifyBuilderCommon.templateCache.get("tmpl-"+a.templateID),e.openCallback(a,f,c,d)):"html"===a.loadMethod?e.openCallback(a.data,f,c,d):(a.data=_.extend(a.data||{},{nonce:themifyBuilder.tb_load_nonce}),a=_.defaults(a||{},{type:"POST",url:themifyBuilder.ajaxurl}),b.ajax(a).done(function(a){e.openCallback(a,f,c,d);a=b(f).find(".themify_builder_options_tab_wrapper");
0<a.length&&new SimpleBar(a[0])}))},openCallback:function(a,c,d,e){themifybuilderapp.toolbar.undoManager.disable();var f=ThemifyBuilderCommon.Lightbox,m={top:100,left:Math.max(0,b(g.top).width()/2-300),width:600,height:500};_.extend(m,f.getLightboxStorage());a=b(a);var h=a.find("#themify_builder_lightbox_options_tab_items");0<h.length&&(f.$lightbox[0].getElementsByClassName("themify_builder_options_tab")[0].insertAdjacentHTML("beforeend",h[0].innerHTML),h.remove());h=a.find("#themify_builder_lightbox_actions_items");
0<h.length&&(f.$lightbox[0].getElementsByClassName("themify_builder_lightbox_actions")[0].insertAdjacentHTML("beforeend",h[0].innerHTML),h.remove());"function"===typeof d&&d.call(f,a[0]);c.html(a[0]);"function"===typeof e&&e.call(f,a[0]);f.$lightbox.addClass("themify_builder_show_start").show().css(m);f.dockMode.setDoc();f.fixContainment();ThemifyBuilderCommon.showLoader("spinhide");if(!themifyBuilder.disableShortcuts)b(k).off("keyup",f.cancelKeyListener).on("keyup",f.cancelKeyListener);f.adjustHeight(m.height);
ThemifyBuilderCommon.setUpTooltip();f.$lightbox.removeClass("themify_builder_show_start").trigger("themify_opened_lightbox")},close:function(){var a=ThemifyBuilderCommon.Lightbox;b("body").trigger("themify_builder_lightbox_before_close");a.$lightbox.fadeOut(function(c){b(this).removeClass("animated fadeOut");a._cleanLightBoxContent();b("#themify_builder_overlay").hide();b("#themify_builder_lightbox_parent",top_iframe).hide();themifybuilderapp.toolbar.Panel.resetPanel();themifybuilderapp.activeModel&&
(themifybuilderapp.activeModel.unset("styleClicked",{silent:!0}),themifybuilderapp.activeModel.unset("visibileClicked",{silent:!0}));themifybuilderapp.toolbar.undoManager.updateUndoBtns();b("body").trigger("themify_builder_lightbox_close");a.dockMode.close(!1,!0)})},dockMode:{key:"themify_builder_docked",workspace:b(".themify_builder_workspace_container",top_iframe.body),isDocked:null,defaultWidth:380,dockOut:0,checkIsVisual:function(){return"visual"===themifybuilderapp.mode},set:function(a,b){!b&&
localStorage.setItem(this.key,a);this.isDocked=a},get:function(){return this.isDocked||"true"===localStorage.getItem(this.key)},setStyleRowToggle:function(){var a=ThemifyBuilderCommon.Lightbox,c=a.$lightbox.find(".tb-style-toggle"),a=a.$lightbox.find("#themify_builder_options_styling .themify_builder_field"),a=a.filter(function(){return!b(this).find(".reset-styling, #custom_css_column").length});c.addClass("tb-closed");a.addClass("tb-field-expanded")},setDoc:function(){this.checkIsVisual()&&this.get()&&
(top_iframe.body.classList.add("tb_module_panel_docked"),this.setDefaultWidth(),this.setWidth(),this.onResize(),b(g.top).off("tfsmartresize.docked").on("tfsmartresize.docked",function(){this.resize();this.onResize()}.bind(this)),b("body").off("themify_builder_change_mode.docked").on("themify_builder_change_mode.docked",function(a,b,d){this.setWidth();"desktop"!==d&&"desktop"===b&&setTimeout(function(){themifybuilderapp.toolbar.$el.width()!==top_iframe.documentElement.clientWidth&&(this.setWidth(),
this.onResize())}.bind(this),500)}.bind(this)));this.setStyleRowToggle()},setDefaultWidth:function(){var a=ThemifyBuilderCommon.Lightbox,b=a.getLightboxStorage(),d=this.defaultWidth;b&&b.dockedWidth&&(d=b.dockedWidth);a.$lightbox.css("width",d)},setWidth:function(){var a=(top_iframe.documentElement.clientWidth||top_iframe.body.clientWidth)-ThemifyBuilderCommon.Lightbox.$lightbox.css("height","").width();themifybuilderapp.toolbar.$el.css("width",a);this.workspace.css("width",a)},resize:function(a){this.checkIsVisual()&&
this.get()&&(this.setWidth(),"stop"===a&&this.onResize())},onResize:function(){themifybuilderapp.Utils._onResize(!0)},drag:function(a){this.checkIsVisual()&&((top_iframe.body.classList.toggle("themify-dock-highlight","drag"===a.type&&a.pageX+20>=g.top.innerWidth),a.pageX+20>=g.top.innerWidth&&"dragstop"===a.type)?(this.set(!0),this.setDoc()):this.get()&&(this.dockOut?this.dockOut&&"dragstop"===a.type?this.dockOut=0:50<this.dockOut-a.clientX&&(this.close(),this.dockOut=0,b(k).trigger("mouseup")):this.dockOut=
a.clientX))},close:function(a,c){if(this.checkIsVisual()&&this.get()){var d=ThemifyBuilderCommon.Lightbox,e=d.getLightboxStorage(),e={width:e.width?e.width:d.resizable.minWidth,height:e.height?e.height:d.resizable.minHeight};a&&(e.top=g.top.innerHeight/2-d.$lightbox.innerHeight()/2,e.left=g.top.innerWidth/2-d.$lightbox.innerWidth()/2);d.$lightbox.css(e);this.set(!1,c);top_iframe.body.classList.remove("tb_module_panel_docked");themifybuilderapp.toolbar.$el.css("width","");this.workspace.css("width",
"");this.onResize();b(g.top).off("tfsmartresize.docked");b("body").off("themify_builder_change_mode.docked")}}},_cleanLightBoxContent:function(){this.forgetRow();this.$lightbox.find(".themify_builder_options_tab").empty();this.$lightbox.find(".themify_builder_lightbox_actions").children().not(".builder_cancel_lightbox, .builder_cancel_docked_mode").remove()},controlByKeyInput:function(){function a(a){83!==a.which||"INPUT"===k.activeElement.tagName||"TEXTAREA"===k.activeElement.tagName||!0!==a.ctrlKey&&
!0!==a.metaKey||(a.preventDefault(),a.stopPropagation(),a=b(".builder_save_button",top_iframe),0<a.length?a.trigger("click"):themifybuilderapp.toolbar.$el.find(".tb_toolbar_save").trigger("click"))}b(k).on("keydown",a);if("visual"===themifybuilderapp.mode)b(top_iframe).on("keydown",a)},clone:function(a){a=a.clone(!0);"visual"===themifybuilderapp.mode&&(a.find("video").trigger("pause"),a.find(".big-video-wrap").remove());return a},rememberRow:function(){this.rememberedRow=this.clone(b(".tb_element_cid_"+
themifybuilderapp.activeModel.cid));this.rememberedCid=themifybuilderapp.activeModel.cid},revertToRememberedRow:function(){var a=themifybuilderapp.Models.Registry.lookup(this.rememberedCid);if(a){var b=a.get("elType");"subrow"!==b&&"column"!==b&&a.trigger("custom:restorehtml",this.rememberedRow)}this.forgetRow()},forgetRow:function(){this.rememberedRow=this.rememberedCid=null},clickRadioOption:function(a,c){c=c?c:b(this);var d=c.hasClass("themify-builder-radio-dnd")?c.closest(".tb_repeatable_field_content"):
ThemifyBuilderCommon.Lightbox.$lightbox,e=ThemifyBuilderCommon.getCheckedRadioInGroup(c,d),f=d.find('input[name="'+e.prop("name")+'"]'),e=e.data("selected");f.each(function(){d.find(".tb-group-element-"+b(this).val()).hide()});b("."+e,d).show();d.find("[data-binding]:visible").each(function(){themifybuilderapp.Mixins.Common.doTheBinding(b(this),b(this).val())})},clickCheckboxOption:function(a,c){c=c?c:b(this);var d=c.hasClass("themify-builder-radio-dnd")?c.closest(".tb_repeatable_field_content"):
ThemifyBuilderCommon.Lightbox.$lightbox;d.find(".tb-checkbox-element").hide();var e=c.parent(".themify-checkbox");(e.hasClass("tb-option-checkbox-revert")?e.find("input:not(:checked)"):e.find("input:checked")).each(function(){d.find(".tb-checkbox-element."+b(this).data("selected")).show()})},bindStylingToggles:function(a){var c=b(this).prev("input");c.is(":checked")&&(a.stopPropagation(),a.preventDefault(),c.prop("checked",!1).trigger("change"))},bindStylingRows:function(a){a.preventDefault();a=b(this).nextUntil(".tb-style-toggle");
a=a.filter(function(){return!b(this).find(".reset-styling, #custom_css_column").length});this.classList.contains("tb-closed")?(this.classList.remove("tb-closed"),a.removeClass("tb-field-expanded")):(this.classList.add("tb-closed"),a.addClass("tb-field-expanded"))},hideShowBorder:function(a,c){if(!a||!a.isTrigger){c||(c=b(this));var d=c.closest(".selectwrapper").siblings(".tb_border_wrapper");"none"===c.val()?d.hide():d.show()}},cancelKeyListener:function(a){var b=ThemifyBuilderCommon.Lightbox;27===
a.keyCode&&(a.preventDefault(),b.cancel(a))},cancel:function(a){a.preventDefault();a=ThemifyBuilderCommon.Lightbox;null!==a.rememberedCid&&a.revertToRememberedRow();a.close()},resetStyling:function(a){a.preventDefault();var c=b("#themify_builder_options_styling",top_iframe),d=[];c.find(".tb_lb_option:not(.exclude-from-reset-field)").each(function(){if("radio"===b(this).prop("type")){var a=b(this).prop("name");-1===d.indexOf(a)&&c.find('[name="'+a+'"]:first').prop("checked",!0).trigger("change")}else b(this).hasClass("themify-builder-uploader-input")?
b(this).val("").trigger("change").parent().find(".img-placeholder").empty():b(this).hasClass("font-family-select")?b(this).val("default").trigger("change"):b(this).hasClass("minicolors-input")?(a=b(this).val(""),"visual"===themifybuilderapp.mode?b("body").trigger("themify_builder_color_picker_change",[a.attr("id"),a,""]):a.trigger("change").parent().next(".color_opacity").val("")):b(this).hasClass("tb_unit")?b(this).val("px").trigger("change"):b(this).val("").prop("selected",!1).trigger("change")})},
switchTabs:function(a){var c=ThemifyBuilderCommon.Lightbox;a.preventDefault();a.stopPropagation();a=b(this).find("a").attr("href");c=c.$lightbox.find(a);c[0]!==f&&(b(this).addClass("current").siblings().removeClass("current"),c[0].SimpleBar===f&&0<b(this).closest(".themify_builder_options_tab").length&&new SimpleBar(c[0]),c.show().siblings(".themify_builder_options_tab_wrapper,.themify_builder_tab").hide(),b("body").trigger("themify_builder_tabsactive",[a,c]),"visual"===themifybuilderapp.mode&&b(k).trigger("mouseup"))}},
LiteLightbox:{modal:new wp.media.view.Modal({controller:{trigger:function(){}}}),confirmView:Backbone.View.extend({template:wp.template("builder_lite_lightbox_confirm"),className:"themify_builder_lite_lightbox_content",initialize:function(a){this.options=a||{}},render:function(){this.$el.html(this.template({message:this.options.message,buttons:this.options.buttons}))},events:{"click button":"buttonClick"},buttonClick:function(a){a.preventDefault();a=b(a.currentTarget).data("type");this.trigger("litelightbox:confirm",
a)}}),promptView:Backbone.View.extend({template:wp.template("builder_lite_lightbox_prompt"),className:"themify_builder_lite_lightbox_content",initialize:function(a){this.options=a||{}},render:function(){this.$el.html(this.template(this.options))},events:{"click button":"buttonClick","keypress .themify_builder_litelightbox_prompt_input":"keyPress"},buttonClick:function(a){a.preventDefault();a=b(a.currentTarget).data("type");var c=this.$el.find(".themify_builder_litelightbox_prompt_input").val();this.trigger("litelightbox:prompt",
a,c)},keyPress:function(a){13===a.which&&(a=b(a.currentTarget).val(),this.trigger("litelightbox:prompt","ok",a))}}),confirm:function(a,c,d){d=_.defaults(d||{},{buttons:{no:{label:"No"},yes:{label:"Yes"}}});d.message=a;a=new ThemifyBuilderCommon.LiteLightbox.confirmView(d);ThemifyBuilderCommon.LiteLightbox.modal.content(a);ThemifyBuilderCommon.LiteLightbox.modal.open();a.on("litelightbox:confirm",function(a){ThemifyBuilderCommon.LiteLightbox.modal.close();b.isFunction(c)&&c.call(this,a)})},prompt:function(a,
c,d){d=_.defaults(d||{},{buttons:{cancel:{label:"Cancel"},ok:{label:"OK"}}});d.message=a;a=new ThemifyBuilderCommon.LiteLightbox.promptView(d);ThemifyBuilderCommon.LiteLightbox.modal.content(a);ThemifyBuilderCommon.LiteLightbox.modal.open();a.on("litelightbox:prompt",function(a,d){ThemifyBuilderCommon.LiteLightbox.modal.close();b.isFunction(c)&&c.call(this,"cancel"===a?null:d)})},alert:function(a){ThemifyBuilderCommon.LiteLightbox.confirm(a,null,{buttons:{yes:{label:"OK"}}})}},templateCache:{templates:[],
get:function(a){this.templates[a]===f&&(this.templates[a]=k.getElementById(a).innerHTML);return this.templates[a]}}}})(jQuery,window,document);