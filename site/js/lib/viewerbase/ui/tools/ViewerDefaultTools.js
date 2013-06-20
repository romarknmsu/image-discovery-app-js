//>>built
define("esriviewer/ui/tools/ViewerDefaultTools",["dojo/_base/declare","dojo/topic","dojo/_base/lang","dijit/MenuItem"],function(_1,_2,_3,_4){return _1([],{showPrintWindowMenuIcon:false,showPortalPublisherWindowMenuIcon:false,showSocialMediaWindowMenuIcon:false,showConfigureWindowMenuItem:false,showLegendWindowMenuItem:false,showLoggingWindowMenuItem:false,showDrawWindowMenuItem:false,showTimeSliderMenuItem:false,showFeatureEditorMenuItem:false,showIdentifyMenuItem:false,showQueryBuilderMenuItem:false,showMeasureMenuItem:false,showReverseGeocodeMenuItem:false,showZoomToMenuItem:false,showPortalSearchMenuItem:false,showLayerTransparencyMenuItem:false,showWeatherWindowMenuItem:false,showReflectivityWindowMenuItem:false,constructor:function(_5){_3.mixin(this,_5||{});this.toolsToAdd=[];this.loadViewerConfigurationData();this.createDefaultToolMenuItems();},createDefaultToolMenuItems:function(){if(this.showDrawWindowMenuItem){this.createDrawWindowMenuItem();}if(this.showMeasureMenuItem){this.createMeasureMenuItem();}if(this.showPortalSearchMenuItem){this.createPortalSearchMenuItem();}if(this.showZoomToMenuItem){this.createZoomToMenuItem();}if(this.showIdentifyMenuItem){this.createIdentifyMenuItem();}if(this.showWeatherWindowMenuItem){this.createWeatherMenuItem();}if(this.showLegendWindowMenuItem){this.createLegendMenuItem();}if(this.showLoggingWindowMenuItem){this.createLoggingMenuItem();}if(this.showTimeSliderMenuItem){this.createTimeSliderMenuItem();}if(this.showFeatureEditorMenuItem){this.createFeatureEditorMenuItem();}if(this.showQueryBuilderMenuItem){this.createQueryBuilderMenuItem();}if(this.showReverseGeocodeMenuItem){this.createReverseGeocodeMenuItem();}if(this.showSocialMediaWindowMenuIcon){this.createSocialMediaMenuItem();}if(this.showReflectivityWindowMenuItem){this.createReflectivityMenuItem();}if(this.showLayerTransparencyMenuItem){this.createLayerTransparencyMenuItem();}if(this.showPortalPublisherWindowMenuIcon){this.createPortalPublisherMenuItem();}if(this.showPrintWindowMenuIcon){this.createPrintMenuItem();}this.sortAndAddTools();},sortAndAddTools:function(){this.toolsToAdd.sort(function(a,b){return a.label.localeCompare(b.label);});for(var i=0;i<this.toolsToAdd.length;i++){_2.publish(VIEWER_GLOBALS.EVENTS.TOOLS.MENU.ADD_TOOL,this.toolsToAdd[i]);}},createZoomToMenuItem:function(){var _6=new _4({iconClass:"commonIcons16 magnifyingGlass",label:"Zoom To Location",onClick:_3.hitch(this,this.handleZoomToLocationClick)});this.toolsToAdd.push(_6);},createSocialMediaMenuItem:function(){var _7=new _4({iconClass:"commonIcons16 binoculars",label:"Social Media",onClick:_3.hitch(this,this.handleSocialMediaMenuClick)});this.toolsToAdd.push(_7);},createReflectivityMenuItem:function(){var _8=new _4({iconClass:"commonIcons16 weather",label:"Reflectivity",onClick:_3.hitch(this,this.handleReflectivityMenuClick)});this.toolsToAdd.push(_8);},createWeatherMenuItem:function(){var _9=new _4({iconClass:"commonIcons16 weather",label:"Weather",onClick:_3.hitch(this,this.handleWeatherMenuClick)});this.toolsToAdd.push(_9);},createLegendMenuItem:function(){var _a=new _4({iconClass:"commonIcons16 list",label:"Legend",onClick:_3.hitch(this,this.handleLegendMenuClick)});this.toolsToAdd.push(_a);},createLoggingMenuItem:function(){var _b=new _4({iconClass:"commonIcons16 list",label:"Logging",onClick:_3.hitch(this,this.handleLoggingMenuClick)});this.toolsToAdd.push(_b);},createPrintMenuItem:function(){var _c=new _4({iconClass:"commonIcons16 print",label:"Print",onClick:_3.hitch(this,this.handlePrintMenuClick)});this.toolsToAdd.push(_c);},createPortalPublisherMenuItem:function(){var _d=new _4({iconClass:"commonIcons16 worldAdd",label:"Publish Web Map",onClick:_3.hitch(this,this.handlePortalPublisherMenuClick)});this.toolsToAdd.push(_d);},createLayerTransparencyMenuItem:function(){var _e=new _4({iconClass:"commonIcons16 slider",label:"Transparency",onClick:_3.hitch(this,this.handleLayerTransparencyMenuClick)});this.toolsToAdd.push(_e);},createPortalSearchMenuItem:function(){var _f=new _4({iconClass:"commonIcons16 magnifyingGlass",label:"Search Portal",onClick:_3.hitch(this,this.handlePortalSearchMenuClick)});this.toolsToAdd.push(_f);},createTimeSliderMenuItem:function(){var _10=new _4({iconClass:"commonIcons16 clock",label:"Time Slider",onClick:_3.hitch(this,this.handleTimeSliderMenuClick)});this.toolsToAdd.push(_10);},createFeatureEditorMenuItem:function(){var _11=new _4({iconClass:"commonIcons16 pencil",label:"Feature Editor",onClick:_3.hitch(this,this.handleFeatureEditorMenuClick)});this.toolsToAdd.push(_11);},createIdentifyMenuItem:function(){var _12=new _4({iconClass:"commonIcons16 information",label:"Identify",onClick:_3.hitch(this,this.handleIdentifyMenuClick)});this.toolsToAdd.push(_12);},createQueryBuilderMenuItem:function(){var _13=new _4({iconClass:"commonIcons16 sql",label:"Query Builder",onClick:_3.hitch(this,this.handleQueryBuilderMenuClick)});this.toolsToAdd.push(_13);},createMeasureMenuItem:function(){var _14=new _4({iconClass:"commonIcons16 triangle",label:"Measure",onClick:_3.hitch(this,this.handleMeasureMenuClick)});this.toolsToAdd.push(_14);},createReverseGeocodeMenuItem:function(){var _15=new _4({iconClass:"commonIcons16 information",label:"Find Address",onClick:_3.hitch(this,this.handleReverseGeocodeMenuClick)});this.toolsToAdd.push(_15);},createDrawWindowMenuItem:function(){var _16=new _4({iconClass:"commonIcons16 pencil",label:"Draw",onClick:_3.hitch(this,this.handleDrawMenuClick)});this.toolsToAdd.push(_16);},handleTimeSliderMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.MAP.TIME.SHOW_TIME_SLIDER);},handleLayerTransparencyMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.MAP.LAYERS.TRANSPARENCY.WINDOW.SHOW);},handleDrawMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.DRAW.SHOW);},handleFeatureEditorMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.FEATURE_EDITOR.SHOW);},handleQueryBuilderMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.QUERY_BUILDER.SHOW);},handleMeasureMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.MEASURE.SHOW);},handleIdentifyMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.IDENTIFY.SHOW);},handleReverseGeocodeMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.REVERSE_GEOCODE.SHOW);},handlePortalSearchMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.PORTAL_SEARCH.SHOW);},loadViewerConfigurationData:function(){var _17=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"logging",function(_18){_17=_18;});if(_17&&_3.isObject(_17)&&_17.window!=null){this.showLoggingWindowMenuItem=_17.window.create==null?false:_17.window.create;}var _19=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"configureWidget",function(_1a){_19=_1a;});if(_19){this.showConfigureWindowMenuItem=_19.create==null||_19.create!=false;}var _1b=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"map",function(_1c){_1b=_1c;});if(_1b){if(_1b.legend==null||_1b.legend.create!=false){this.showLegendWindowMenuItem=true;}}var _1d=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"socialMediaWidget",function(_1e){_1d=_1e;});if(_1d!=null&&_3.isObject(_1d)&&_1d.create==true){this.showSocialMediaWindowMenuIcon=true;}var _1f=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"drawWidget",function(_20){_1f=_20;});if(_1f!=null&&_3.isObject(_1f)&&_1f.create==true){this.showDrawWindowMenuItem=true;}var _21=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"timeSliderWidget",function(_22){_21=_22;});if(_21!=null&&_3.isObject(_21)&&_21.create==true){this.showTimeSliderMenuItem=true;}var _23=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"featureEditorWidget",function(_24){_23=_24;});this.showFeatureEditorMenuItem=_23&&_23.service&&_23.service.url;var _25=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"identifyWidget",function(_26){_25=_26;});if(_25!=null&&_3.isObject(_25)&&_25.create==true){this.showIdentifyMenuItem=true;}var _27=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"layersTransparencyWidget",function(_28){_27=_28;});if(_27!=null&&_3.isObject(_27)&&_27.create==true){this.showLayerTransparencyMenuItem=true;}var _29=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"zoomToWidget",function(_2a){_29=_2a;});if(_29!=null&&_3.isObject(_29)&&_29.create==true){this.showZoomToMenuItem=true;}var _2b=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"reflectivityWidget",function(_2c){_2b=_2c;});this.showReflectivityWindowMenuItem=_2b!=null&&_3.isObject(_2b)&&_2b.create===true;var _2d=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"weatherWidget",function(_2e){_2d=_2e;});this.showWeatherWindowMenuItem=_2d!=null&&_3.isObject(_2d)&&_2d.create===true;var _2f=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"printWidget",function(_30){_2f=_30;});this.showPrintWindowMenuIcon=_2f!=null&&_3.isObject(_2f)&&_2f.create===true&&_2f.printTaskUrl!=null;var _31=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"queryBuilder",function(_32){_31=_32;});this.showQueryBuilderMenuItem=_31!=null&&_3.isObject(_31)&&_31.create===true;var _33=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"geometryServiceUrl",function(_34){_33=_34;});if(_33!=null){var _35=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"measureWidget",function(_36){_35=_36;});if(_35&&_3.isObject(_35)){if(_35.create==true){this.showMeasureMenuItem=true;}}}var _37=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"locators",function(_38){_37=_38;});if(_37==null||!_3.isArray(_37)||_37.length==0){this.showReverseGeocodeMenuItem=false;}else{var _39=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"reverseGeocodeWidget",function(_3a){_39=_3a;});this.showReverseGeocodeMenuItem=_39&&_3.isObject(_39)&&_39.create==true;}var _3b=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"portal",function(_3c){_3b=_3c;});if(_3b==null||!_3.isObject(_3b)){this.showPortalSearchMenuItem=false;this.showPortalPublisherWindowMenuIcon=false;}else{var _3d=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"portalSearchWidget",function(_3e){_3d=_3e;});this.showPortalSearchMenuItem=_3d&&_3.isObject(_3d)&&_3d.create==true;var _3f=null;_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"portalPublisher",function(_40){_3f=_40;});this.showPortalPublisherWindowMenuIcon=_3f&&_3.isObject(_3f)&&_3f.window&&_3f.window.create==true;}},createConfigurationMenuItem:function(){if(this.showConfigureWindowMenuItem!=false){this._createConfigureMenuItem();}},handlePortalPublisherMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.PORTAL_PUBLISH.SHOW);},handlePrintMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.PRINT.SHOW);},handleLoggingMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.LOGGING.WINDOW.SHOW);},handleZoomToLocationClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.ZOOM_TO.SHOW);},handleSocialMediaMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.SOCIAL_MEDIA.SHOW);},handleReflectivityMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.REFLECTIVITY.SHOW);},handleWeatherMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.WEATHER.SHOW);},handleLegendMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.WINDOW.LEGEND.SHOW);},_createConfigureMenuItem:function(){var _41=new _4({iconClass:"commonIcons16 gear",label:"Configure",onClick:_3.hitch(this,this.handleConfigureMenuClick)});_2.publish(VIEWER_GLOBALS.EVENTS.TOOLS.MENU.ADD_TOOL,_41);},handleConfigureMenuClick:function(){_2.publish(VIEWER_GLOBALS.EVENTS.CONFIGURE.WINDOW.SHOW);}});});