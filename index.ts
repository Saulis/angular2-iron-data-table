import { Directive, TemplateRef, ViewContainerRef, NgModule, OnInit, EmbeddedViewRef } from '@angular/core';
import { getDOM, DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

class RowTemplateContext {
  notifyPath(path: string, value: any) {
    this[path] = value;
  }
}

class Template {

  constructor() {
    const saulis: any = (<any>window).saulis;
    const polymer: any = (<any>window).Polymer;
    if (!saulis.templatizeSet) {
      const cell = document.createElement('data-table-cell');
      const proto = Object.getPrototypeOf(cell);
      const defaultTemplatize = proto._templatize;
      const ng2Templatize = function (template) {
        const tempRef: TemplateRef<any> = template.templateRef;
        if (tempRef) {
          const viewRef: EmbeddedViewRef<any> = template.viewContainerRef.createEmbeddedView(tempRef, new RowTemplateContext());

          // in some cases, default header is already set.
          if (this._instance) {
            // remove default header template instance
            polymer.dom(this).removeChild(polymer.dom(this).querySelector('div'));
          }
          for (let i = 0; i < viewRef.rootNodes.length; i++) {
            polymer.dom(this).appendChild(viewRef.rootNodes[i]);
          }

          polymer.dom.flush();
          return viewRef.context;
        } else {
          return defaultTemplatize.bind(this)(template);
        }
      };

      proto._templatize = ng2Templatize;
      const detail = document.createElement('data-table-row-detail');
      Object.getPrototypeOf(detail)._templatize = ng2Templatize;

      saulis.templatizeSet = true;
    }
  }

}

@Directive({
  selector: '[rowTemplate]'
})
export class RowTemplate extends Template implements OnInit {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    super();
  }

  ngOnInit(): void {
    const columnElement: any = this.viewContainer.element.nativeElement.parentElement;
    columnElement._setTemplate({templateRef: this.templateRef, viewContainerRef: this.viewContainer});
  }

}

@Directive({
  selector: '[headerTemplate]'
})
export class HeaderTemplate extends Template implements OnInit {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    super();
  }

  ngOnInit(): void {
    const columnElement: any = this.viewContainer.element.nativeElement.parentElement;
    columnElement._setHeaderTemplate({templateRef: this.templateRef, viewContainerRef: this.viewContainer});
  }

}

@Directive({
  selector: '[detailsTemplate]'
})
export class DetailsTemplate extends Template {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    super();
    const tableElement: any = this.viewContainer.element.nativeElement.parentElement;
    tableElement.rowDetail = {templateRef: this.templateRef, viewContainerRef: this.viewContainer};
  }

}

@NgModule({
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
})
export class IronDataTableModule {

  constructor() {
    const dom: DomAdapter = getDOM();
    const polymer: any = (<any>window).Polymer;
    dom.appendChild = (el, node) => {
      if (node.nodeName === '#comment') {
        el.appendChild(node);
      } else {
        polymer.dom(el).appendChild(node);
        polymer.dom.flush();
      }
    };
  }

}

