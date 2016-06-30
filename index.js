System.register(['@angular/core', '@angular/platform-browser/src/dom/dom_adapter'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, dom_adapter_1;
    var Polymer, saulis, dom, RowTemplateContext, Template, RowTemplate, HeaderTemplate, DetailsTemplate;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            }],
        execute: function() {
            Polymer = window.Polymer;
            saulis = window.saulis;
            dom = dom_adapter_1.getDOM();
            // see https://github.com/Polymer/polymer/issues/3742
            dom.appendChild = function (el, node) {
                if (node.nodeName === '#comment') {
                    el.appendChild(node);
                }
                else {
                    Polymer.dom(el).appendChild(node);
                    Polymer.dom.flush();
                }
            };
            RowTemplateContext = (function () {
                function RowTemplateContext() {
                }
                RowTemplateContext.prototype.notifyPath = function (path, value) {
                    this[path] = value;
                };
                return RowTemplateContext;
            })();
            Template = (function () {
                function Template(_templateRef, _viewContainer) {
                    if (!saulis.templatizeSet) {
                        var cell = document.createElement('data-table-cell');
                        var proto = Object.getPrototypeOf(cell);
                        var defaultTemplatize = proto._templatize;
                        var ng2Templatize = function (template) {
                            if (template.templateRef) {
                                var viewRef = template.viewContainerRef.createEmbeddedView(template.templateRef, new RowTemplateContext());
                                // in some cases, default header is already set.
                                if (this._instance) {
                                    // remove default header template instance
                                    Polymer.dom(this).removeChild(Polymer.dom(this).querySelector('div'));
                                }
                                for (var i = 0; i < viewRef.rootNodes.length; i++) {
                                    Polymer.dom(this).appendChild(viewRef.rootNodes[i]);
                                }
                                Polymer.dom.flush();
                                return viewRef.context;
                            }
                            else {
                                return defaultTemplatize.bind(this)(template);
                            }
                        };
                        proto._templatize = ng2Templatize;
                        var detail = document.createElement('data-table-row-detail');
                        Object.getPrototypeOf(detail)._templatize = ng2Templatize;
                        saulis.templatizeSet = true;
                    }
                }
                return Template;
            })();
            RowTemplate = (function (_super) {
                __extends(RowTemplate, _super);
                function RowTemplate(_templateRef, _viewContainer) {
                    _super.call(this, _templateRef, _viewContainer);
                    var columnElement = _viewContainer.element.nativeElement.parentElement;
                    columnElement._setTemplate({ templateRef: _templateRef, viewContainerRef: _viewContainer });
                }
                RowTemplate = __decorate([
                    core_1.Directive({
                        selector: '[rowTemplate]'
                    }), 
                    __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef])
                ], RowTemplate);
                return RowTemplate;
            })(Template);
            exports_1("RowTemplate", RowTemplate);
            HeaderTemplate = (function (_super) {
                __extends(HeaderTemplate, _super);
                function HeaderTemplate(_templateRef, _viewContainer) {
                    _super.call(this, _templateRef, _viewContainer);
                    var columnElement = _viewContainer.element.nativeElement.parentElement;
                    columnElement._setHeaderTemplate({ templateRef: _templateRef, viewContainerRef: _viewContainer });
                }
                HeaderTemplate = __decorate([
                    core_1.Directive({
                        selector: '[headerTemplate]'
                    }), 
                    __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef])
                ], HeaderTemplate);
                return HeaderTemplate;
            })(Template);
            exports_1("HeaderTemplate", HeaderTemplate);
            DetailsTemplate = (function (_super) {
                __extends(DetailsTemplate, _super);
                function DetailsTemplate(_templateRef, _viewContainer) {
                    _super.call(this, _templateRef, _viewContainer);
                    var tableElement = _viewContainer.element.nativeElement.parentElement;
                    tableElement.rowDetail = { templateRef: _templateRef, viewContainerRef: _viewContainer };
                }
                DetailsTemplate = __decorate([
                    core_1.Directive({
                        selector: '[detailsTemplate]'
                    }), 
                    __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef])
                ], DetailsTemplate);
                return DetailsTemplate;
            })(Template);
            exports_1("DetailsTemplate", DetailsTemplate);
        }
    }
});
