//>>built
define("esriviewer/ui/identify/model/IdentifyResultsContentsViewModel",["dojo/_base/declare"],function(_1){return _1([],{constructor:function(){this.addedResults=ko.observableArray();var _2=this;this.hasResults=ko.computed(function(){return _2.addedResults().length>0;});},addResult:function(_3){this.addedResults.push(_3);}});});