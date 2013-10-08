//>>built
require({cache:{"url:esriviewer/ui/draw/base/template/UserPersistedGrahicsListingTemplate.html":"<div>\r\n    <div class=\"addedUserPersistedGraphicsListContainer\" data-dojo-attach-point=\"addedUserPersistedGraphicsListContainer\">\r\n        <ul data-dojo-attach-point=\"addedGraphicsList\" class=\"viewerList\" data-bind=\"foreach: addedUserPersistedGraphics\">\r\n            <li class=\"graphicsListEntry\">\r\n                <div title=\"Delete Saved Graphics\" class=\"viewerListEntryRemoveIcon commonIcons16 remove\" data-bind=\"click:$parent.removeUserPersistedGraphic\"></div>\r\n                <div title=\"Add Saved Graphics To Map\" class=\"viewerListGenericIcon commonIcons16 layerShow\" data-bind=\"click:$parent.addSavedGraphics\"></div>\r\n                <span class=\"graphicsListEntryLabel\" data-bind=\"text: $data.label\"></span>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>"}});define("esriviewer/ui/draw/base/UserPersistedGraphicsListWidget",["dojo/_base/declare","dojo/text!./template/UserPersistedGrahicsListingTemplate.html","dojo/topic","../../base/UITemplatedWidget","dojo/_base/lang","./model/UserPersistedGraphicsListViewModel"],function(_1,_2,_3,_4,_5,_6){return _1([_4],{bindingsApplied:false,templateString:_2,constructor:function(){this.userPersistedGraphics={};},postCreate:function(){this.inherited(arguments);this.viewModel=new _6();this.viewModel.on(this.viewModel.REMOVE_USER_PERSISTED_GRAPHICS,_5.hitch(this,this.handleRemoveUserPersistedGraphics));this.viewModel.on(this.viewModel.ADD_USER_PERSISTED_GRAPHICS_TO_MAP,_5.hitch(this,this.handleAddUserPersistedGraphicsToMap));},applyBindings:function(){if(!this.bindingsApplied){this.bindingsApplied=true;ko.applyBindings(this.viewModel,this.domNode);}},handleAddUserPersistedGraphicsToMap:function(_7){if(_7&&_5.isObject(_7)){this.onAddUserPersistedGraphicsToMap(_7);}},onAddUserPersistedGraphicsToMap:function(_8){},handleRemoveUserPersistedGraphics:function(_9){if(_9&&_5.isObject(_9)&&_9.label!=null&&_9.label!=""){this.onRemoveUserPersistedGraphics(_9.label);}},onRemoveUserPersistedGraphics:function(_a){},addExistingPersistedGraphicsItems:function(_b){for(var _c in _b){this.viewModel.addedUserPersistedGraphics.push(_b[_c]);}this.viewModel.sort();this.applyBindings();},addUserPersistedGraphics:function(_d){this.viewModel.addedUserPersistedGraphics.push(_d);this.viewModel.sort();}});});