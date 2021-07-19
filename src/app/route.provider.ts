import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/store',
        name: '::Menu:Store',
        iconClass: 'fas fa-book',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/customers',
        name: '::Menu:Customers',
        parentName: '::Menu:Store',
        layout: eLayoutType.application,
      },
      {
        path: '/products',
        name: '::Menu:Products',
        parentName: '::Menu:Store',
        layout: eLayoutType.application,
      },
      {
        path: '/orders',
        name: '::Menu:Orders',
        parentName: '::Menu:Store',
        layout: eLayoutType.application,
      },
    ]);
  };
}
