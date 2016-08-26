"use strict";
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
var core_1 = require('@angular/core');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var RowTemplateContext = (function () {
    function RowTemplateContext() {
    }
    RowTemplateContext.prototype.notifyPath = function (path, value) {
        this[path] = value;
    };
    return RowTemplateContext;
}());
var Template = (function () {
    function Template() {
        var saulis = window.saulis;
        var polymer = window.Polymer;
        if (!saulis.templatizeSet) {
            var cell = document.createElement('data-table-cell');
            var proto = Object.getPrototypeOf(cell);
            var defaultTemplatize_1 = proto._templatize;
            var ng2Templatize = function (template) {
                var tempRef = template.templateRef;
                if (tempRef) {
                    var viewRef = template.viewContainerRef.createEmbeddedView(tempRef, new RowTemplateContext());
                    // in some cases, default header is already set.
                    if (this._instance) {
                        // remove default header template instance
                        polymer.dom(this).removeChild(polymer.dom(this).querySelector('div'));
                    }
                    for (var i = 0; i < viewRef.rootNodes.length; i++) {
                        polymer.dom(this).appendChild(viewRef.rootNodes[i]);
                    }
                    polymer.dom.flush();
                    return viewRef.context;
                }
                else {
                    return defaultTemplatize_1.bind(this)(template);
                }
            };
            proto._templatize = ng2Templatize;
            var detail = document.createElement('data-table-row-detail');
            Object.getPrototypeOf(detail)._templatize = ng2Templatize;
            saulis.templatizeSet = true;
        }
    }
    return Template;
}());
var RowTemplate = (function (_super) {
    __extends(RowTemplate, _super);
    function RowTemplate(templateRef, viewContainer) {
        _super.call(this);
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    RowTemplate.prototype.ngOnInit = function () {
        var columnElement = this.viewContainer.element.nativeElement.parentElement;
        columnElement._setTemplate({ templateRef: this.templateRef, viewContainerRef: this.viewContainer });
    };
    RowTemplate = __decorate([
        core_1.Directive({
            selector: '[rowTemplate]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef])
    ], RowTemplate);
    return RowTemplate;
}(Template));
exports.RowTemplate = RowTemplate;
var HeaderTemplate = (function (_super) {
    __extends(HeaderTemplate, _super);
    function HeaderTemplate(templateRef, viewContainer) {
        _super.call(this);
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    HeaderTemplate.prototype.ngOnInit = function () {
        var columnElement = this.viewContainer.element.nativeElement.parentElement;
        columnElement._setHeaderTemplate({ templateRef: this.templateRef, viewContainerRef: this.viewContainer });
    };
    HeaderTemplate = __decorate([
        core_1.Directive({
            selector: '[headerTemplate]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef])
    ], HeaderTemplate);
    return HeaderTemplate;
}(Template));
exports.HeaderTemplate = HeaderTemplate;
var DetailsTemplate = (function (_super) {
    __extends(DetailsTemplate, _super);
    function DetailsTemplate(templateRef, viewContainer) {
        _super.call(this);
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        var tableElement = this.viewContainer.element.nativeElement.parentElement;
        tableElement.rowDetail = { templateRef: this.templateRef, viewContainerRef: this.viewContainer };
    }
    DetailsTemplate = __decorate([
        core_1.Directive({
            selector: '[detailsTemplate]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef])
    ], DetailsTemplate);
    return DetailsTemplate;
}(Template));
exports.DetailsTemplate = DetailsTemplate;
var IronDataTableModule = (function () {
    function IronDataTableModule() {
        var dom = dom_adapter_1.getDOM();
        var polymer = window.Polymer;
        dom.appendChild = function (el, node) {
            if (node.nodeName === '#comment') {
                el.appendChild(node);
            }
            else {
                polymer.dom(el).appendChild(node);
                polymer.dom.flush();
            }
        };
    }
    IronDataTableModule = __decorate([
        core_1.NgModule({
            declarations: [
                RowTemplate,
                DetailsTemplate,
                HeaderTemplate
            ],
            exports: [
                RowTemplate,
                DetailsTemplate,
                HeaderTemplate
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], IronDataTableModule);
    return IronDataTableModule;
}());
exports.IronDataTableModule = IronDataTableModule;
