define([
    "dojo/_base/declare",
    "dojo/text!./template/ImageDiscoveryTemplate.html",
    "dojo/topic",
    "dojo/has",
    'dijit/layout/ContentPane',
    "dojo/_base/lang",
    "dojo/dom-style",
    "dojo/dom-class",
    "esriviewer/ui/base/UITemplatedWidget",
    "esriviewer/ui/draw/base/MapDrawSupport",
    "dojo/_base/Color",
    "../discover/upload/GeometryUploadWidget",
    "./SearchByBoundsWidget",
    "../query/ImageQueryWidget",
    "./model/ImageDiscoveryViewModel",
    "dijit/form/NumberTextBox",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/graphic",
    "esri/geometry/Geometry",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    "esri/geometry/Extent",
    "../../base/ImageQueryLayerControllerQueryParameters"
],
    function (declare, template, topic, has, ContentPane, lang, domStyle, domClass, UITemplatedWidget, MapDrawSupport, Color, GeometryUploadWidget, SearchByBoundsWidget, ImageQueryWidget, ImageDiscoveryViewModel, NumberTextBox, SimpleFillSymbol, SimpleMarkerSymbol, SimpleLineSymbol, Graphic, Geometry, Point, Polygon, Extent, ImageQueryLayerControllerQueryParameters) {
        return declare(
            [ContentPane, UITemplatedWidget, MapDrawSupport],
            {
                createQueryFieldsDiscoveryContent: false,
                title: "Discover",
                templateString: template,
                constructor: function (params) {
                    lang.mixin(this, params || {});
                    this.currentAddedGraphics = [];
                },
                postCreate: function () {
                    this.inherited(arguments);
                    this.searchByGeometryGeometryQueryErrorback = lang.hitch(this.handleSearchByGeometryGeometryQueryError);
                    this.performSearchCallback = lang.hitch(this, this.performSearch);
                    this.viewModel = new ImageDiscoveryViewModel();
                    this.viewModel.on("firstBoundsDisplay", lang.hitch(this, this.createBoundsView));
                    this.viewModel.on("viewChange", lang.hitch(this, this.handleViewChanged));
                    this.initSymbology();
                    if (this.createQueryFieldsDiscoveryContent) {
                        this.viewModel.selectedDiscoveryService.subscribe(lang.hitch(this, this.handleSearchServiceChanged));
                    }
                    ko.applyBindings(this.viewModel, this.domNode);
                    if (this.discoverGeometryUploadTaskConfiguration == null || !lang.isObject(this.discoverGeometryUploadTaskConfiguration)) {
                        this.viewModel.searchByGeometryButtonVisible(false);

                    }
                    else {
                        this.createUploadView();
                    }
                    if (this.createQueryFieldsDiscoveryContent) {
                        this.createQueryView();
                    }
                },
                handleDiscoveryByFieldsToggle: function (expanded) {
                    if (!expanded && this.imageQueryWidget) {
                        this.imageQueryWidget.closePopups();
                    }
                },
                initListeners: function () {
                    topic.subscribe(VIEWER_GLOBALS.EVENTS.TOOLS.ACCORDION.HIDE_COMPLETE, lang.hitch(this, this.handleAccordionHidden));
                    topic.subscribe(IMAGERY_GLOBALS.EVENTS.QUERY.LAYER_CONTROLLERS.LOADED, lang.hitch(this, this.handleQueryLayerControllersLoaded));
                    this.on("annotationCreated", lang.hitch(this, this.handleAnnotationAddedFromUser));
                    this.on("show", lang.hitch(this, this.handleOnShow));
                    topic.subscribe(IMAGERY_GLOBALS.EVENTS.QUERY.RESULT.CLEAR, lang.hitch(this, this.handleResultsCleared));
                },
                handleSearchServiceChanged: function (queryController) {
                    if (this.imageQueryWidget) {
                        if (queryController == null) {
                            this.hideUniqueValuesContent();
                        }
                        else {
                            this.viewModel.discoverByFieldsHeaderVisible(true);
                            this.imageQueryWidget.setCurrentQueryLayerController(queryController)
                        }
                    }
                },
                handleQueryLayerControllersLoaded: function (queryLayerControllers) {
                    var currentQueryLayerController;
                    var currentQueryLayer;
                    this.queryLayerControllers = queryLayerControllers;
                    if (queryLayerControllers.length == 1) {
                        this.viewModel.selectSearchServiceVisible(false);
                        if (this.createQueryFieldsDiscoveryContent) {
                            this.viewModel.discoverByFieldsHeaderVisible(true);
                        }
                    }
                    else {
                        this.viewModel.selectSearchServiceVisible(true);
                        for (var i = 0; i < queryLayerControllers.length; i++) {
                            currentQueryLayerController = queryLayerControllers[i];
                            currentQueryLayer = (currentQueryLayerController && currentQueryLayerController.layer) ? currentQueryLayerController.layer : null;
                            if (currentQueryLayerController && currentQueryLayer) {
                                this.viewModel.discoveryServicesList.push({label: currentQueryLayer.searchServiceLabel, value: currentQueryLayerController});
                            }
                        }
                    }
                },
                hideUniqueValuesContent: function () {
                    this.viewModel.discoverByFieldsExpanded(false);
                    this.viewModel.discoverByFieldsHeaderVisible(false);
                },
                createQueryView: function () {
                    this.imageQueryWidget = new ImageQueryWidget();
                    this.imageQueryWidget.on("noUniqueValuesReturned", lang.hitch(this, this.hideUniqueValuesContent));
                    this.imageQueryWidget.placeAt(this.imageDiscoveryByQueryContainer);
                },
                loadViewerConfigurationData: function () {
                    //load the configuration
                    var discoveryGeometryUploadConfiguration;
                    topic.publish(IMAGERY_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY, "discoverGeometryUploadTask", function (discoveryGeometryUploadConf) {
                        discoveryGeometryUploadConfiguration = discoveryGeometryUploadConf;
                    });
                    if (discoveryGeometryUploadConfiguration != null && lang.isObject(discoveryGeometryUploadConfiguration)) {
                        this.discoverGeometryUploadTaskConfiguration = discoveryGeometryUploadConfiguration;
                    }
                    var discoveryQueryFields;
                    topic.publish(IMAGERY_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY, "imageDiscoveryQueryFields", function (discoveryQueryFieldsConf) {
                        discoveryQueryFields = discoveryQueryFieldsConf;
                    });
                    if (discoveryQueryFields != null && lang.isArray(discoveryQueryFields) && discoveryQueryFields.length > 0) {
                        this.createQueryFieldsDiscoveryContent = !(has("ie") == 7);
                    }
                },
                handleSearchByGeometryGeometryQueryError: function (msg) {
                    this.clearDraw();
                },
                initSymbology: function () {
                    this.polygonSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                            new Color([0, 0, 255]), 1), new Color([0, 0, 255, 0]));


                    this.pointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_X, 1,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                            new Color("blue")));

                    this.envelopeSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                            new Color([0, 0, 255]), 1),
                        new Color([0, 0, 0, 0]));
                },
                handleAccordionHidden: function () {
                    if (this.imageQueryWidget) {
                        this.imageQueryWidget.closePopups();

                    }
                },
                handleOnShow: function () {
                    topic.publish(IMAGERY_GLOBALS.EVENTS.DISCOVERY.ON_SHOW);
                },
                handleResultsCleared: function () {
                    this.clearVisibileGraphics();
                },
                clearVisibileGraphics: function () {
                    if (this.currentAddedGraphics) {
                        for (var i = 0; i < this.currentAddedGraphics.length; i++) {
                            topic.publish(VIEWER_GLOBALS.EVENTS.MAP.GRAPHICS.REMOVE, this.currentAddedGraphics[i]);

                        }
                    }
                    this.currentAddedGraphics = [];
                },
                activateSearchByExtent: function () {
                    var mapExtent = null;
                    topic.publish(VIEWER_GLOBALS.EVENTS.MAP.EXTENT.GET_EXTENT, function (ext) {
                        mapExtent = ext;
                    });
                    if (mapExtent == null) {
                        return;
                    }
                    this.performSearch(mapExtent, false);
                },
                performSearch: function (searchObject, zoomToArea) {

                    if (searchObject == null) {
                        return;
                    }
                    //searchObject can either be a graphic,geometry or array of geometries
                    var graphic;
                    var whereClause = "";
                    if (this.imageQueryWidget != null && this.viewModel.discoverByFieldsExpanded()) {
                        whereClause = this.imageQueryWidget.getQuery();
                    }

                    //clear the previous result
                    topic.publish(IMAGERY_GLOBALS.EVENTS.QUERY.RESULT.CLEAR);
                    //get the services to query
                    var queryLayerControllers;
                    var selectedDiscoveryService = this.viewModel.selectedDiscoveryService();
                    if (selectedDiscoveryService) {
                        queryLayerControllers = [selectedDiscoveryService];
                    }
                    else {
                        queryLayerControllers = this.queryLayerControllers;
                    }
                    var imageQueryParameters = new ImageQueryLayerControllerQueryParameters({
                        queryLayerControllers: queryLayerControllers,
                        whereClause: whereClause,
                        returnGeometry: true
                    });
                    var searchGraphic;
                    if (searchObject instanceof esri.Graphic) {
                        searchGraphic = searchObject;
                        this.currentAddedGraphics.push(searchObject);
                    }
                    else if (searchObject instanceof Geometry) {
                        graphic = null;
                        if (searchObject instanceof Point) {
                            graphic = new Graphic(searchObject, this.pointSymbol);
                        }
                        else if (searchObject instanceof Polygon) {
                            graphic = new Graphic(searchObject, this.polygonSymbol);
                        }
                        else if (searchObject instanceof Extent) {
                            graphic = new Graphic(searchObject, this.polygonSymbol);
                        }
                        if (graphic) {
                            this.currentAddedGraphics.push(graphic);
                            topic.publish(VIEWER_GLOBALS.EVENTS.MAP.GRAPHICS.ADD, graphic);
                            searchGraphic = graphic;
                        }

                    }
                    imageQueryParameters.geometry = searchGraphic.geometry;
                    imageQueryParameters.errback = this.searchByGeometryGeometryQueryErrorback;
                    topic.publish(IMAGERY_GLOBALS.EVENTS.QUERY.SEARCH.GEOMETRY, imageQueryParameters);
                },
                handleViewChanged: function (oldView, newView) {
                    if (oldView == newView && newView != this.viewModel.views.extent) {
                        return;
                    }
                    if (newView == this.viewModel.views.point) {
                        this.setDraw(VIEWER_GLOBALS.EVENTS.MAP.TOOLS.DRAW_POINT);
                    }
                    else if (newView == this.viewModel.views.rectangle) {
                        this.setDraw(VIEWER_GLOBALS.EVENTS.MAP.TOOLS.DRAW_RECTANGLE);

                    }
                    else if (newView == this.viewModel.views.extent) {
                        this.activateSearchByExtent();
                        if (oldView == this.viewModel.views.rectangle || oldView == this.viewModel.views.point) {
                            topic.publish(VIEWER_GLOBALS.EVENTS.DRAW.USER.DRAW_CANCEL);
                        }
                    }
                    else {
                        if (oldView == this.viewModel.views.rectangle || oldView == this.viewModel.views.point) {
                            topic.publish(VIEWER_GLOBALS.EVENTS.DRAW.USER.DRAW_CANCEL);
                        }
                    }
                },
                handleAnnotationAddedFromUser: function (annoObj) {
                    //{ id:uuid, type:type, graphic:graphic }
                    //clear the draw

                    var isPointBuffer = false;

                    if (this.viewModel.currentView() == this.viewModel.views.point) {
                        //perform a buffer if it exists. the buffer will be the displayed graphic
                        var bufferValue = this.pointDrawBufferValue.get("value");
                        if (!isNaN(bufferValue) && bufferValue > 0) {
                            var bufferUnits = this.viewModel.selectedPointUnits();
                            var distanceAndUnits = {distance: bufferValue, units: bufferUnits};
                            var callback = lang.hitch(this, this.handlePointBufferResponse, annoObj);
                            var errback = lang.hitch(this, this.handlePointBufferError, annoObj);
                            topic.publish(VIEWER_GLOBALS.EVENTS.GEOMETRY_SERVICE.BUFFER_POINT, annoObj.graphic.geometry, distanceAndUnits, callback, errback);
                            isPointBuffer = true;
                        }
                    }
                    this.viewModel.currentView(this.viewModel.views.none);
                    if (!isPointBuffer) {
                        this.performSearch(annoObj.graphic);
                    }
                },
                handlePointBufferError: function (annoObj) {
                    this.performSearch(annoObj.graphic);
                },
                handlePointBufferResponse: function (annoObj, bufferResponse) {
                    //clear the X graphic for the point
                    if (bufferResponse != null && lang.isArray(bufferResponse) && bufferResponse.length > 0) {
                        this.performSearch(bufferResponse[0]);
                    }
                    else {
                        this.performSearch(annoObj.graphic);
                    }
                },
                setDraw: function (type) {
                    //clear the last annotation
                    this.clearVisibileGraphics();
                    this.inherited(arguments);
                },
                createUploadView: function () {
                    //set the max upload geometries allowed
                    if (this.geometryUploadWidget == null) {
                        this.geometryUploadWidget = new GeometryUploadWidget();
                        this.geometryUploadWidget.placeAt(this.geometryUploadWidgetContainer);
                        this.geometryUploadWidget.on("performSearch", this.performSearchCallback);
                    }
                },
                createBoundsView: function () {
                    if (this.searchByBoundsWidget == null) {
                        this.searchByBoundsWidget = new SearchByBoundsWidget();
                        this.searchByBoundsWidget.placeAt(this.imageDiscoverySearchByBoundsContainer);
                        this.searchByBoundsWidget.on("boundsGeometryCreated", this.performSearchCallback);
                    }
                },
                clearDraw: function () {
                    this.inherited(arguments);
                    //get zoom back for shift key
                    topic.publish(VIEWER_GLOBALS.EVENTS.DRAW.USER.DRAW_CANCEL);
                }
            });
    });