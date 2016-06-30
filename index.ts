import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
const Polymer:any = (<any>window).Polymer;
const saulis:any = (<any>window).saulis;

var dom = getDOM();
// see https://github.com/Polymer/polymer/issues/3742
dom.appendChild = function(el, node) {
  if (node.nodeName === '#comment') {
    el.appendChild(node);
  } else {
    Polymer.dom(el).appendChild(node); Polymer.dom.flush();
  }
}

class RowTemplateContext {
  constructor() {}

  notifyPath(path: string, value: any) {
    this[path] = value;
  }
}

class Template {
  constructor(
    _templateRef: TemplateRef<any>,
    _viewContainer: ViewContainerRef
    ) {
      if (!saulis.templatizeSet) {
        var cell = document.createElement('data-table-cell');
        var proto = Object.getPrototypeOf(cell);
        var defaultTemplatize = proto._templatize;
        var ng2Templatize = function(template) {
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
          } else {
            return defaultTemplatize.bind(this)(template);
          }
        };

        proto._templatize = ng2Templatize;
        var detail = document.createElement('data-table-row-detail');
        Object.getPrototypeOf(detail)._templatize = ng2Templatize;

        saulis.templatizeSet = true;
      }
  }
}

@Directive({
  selector: '[rowTemplate]'
})
export class RowTemplate extends Template {
  constructor(
    _templateRef: TemplateRef<any>,
    _viewContainer: ViewContainerRef
    ) {
    super(_templateRef, _viewContainer);
    let columnElement: any = _viewContainer.element.nativeElement.parentElement;
    columnElement._setTemplate({templateRef: _templateRef, viewContainerRef: _viewContainer});
  }
}

@Directive({
  selector: '[headerTemplate]'
})
export class HeaderTemplate extends Template {
  constructor(
    _templateRef: TemplateRef<any>,
    _viewContainer: ViewContainerRef
    ) {
    super(_templateRef, _viewContainer);
    let columnElement: any = _viewContainer.element.nativeElement.parentElement;
    columnElement._setHeaderTemplate({templateRef: _templateRef, viewContainerRef: _viewContainer});
  }
}

@Directive({
  selector: '[detailsTemplate]'
})
export class DetailsTemplate extends Template {
  constructor(
    _templateRef: TemplateRef<any>,
    _viewContainer: ViewContainerRef
    ) {
    super(_templateRef, _viewContainer);
    let tableElement: any = _viewContainer.element.nativeElement.parentElement;
    tableElement.rowDetail = {templateRef: _templateRef, viewContainerRef: _viewContainer};
  }
}
