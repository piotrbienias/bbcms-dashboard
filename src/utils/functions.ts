/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import routes from '@config/routes';
import { SingleBreadcrumb } from "@components/Breadcrumbs";
import { Models } from "@utils/types/models";
import { intersection, isEmpty } from 'underscore';


/**
 * Basing on current pathname compute breadcrumbs with use of
 * globally defined system routes and their equivalent breadcrumb
 * title.
 *
 * @param pathname
 */
export const getBreadcrumbs = (pathname: string): SingleBreadcrumb[] => {
      let pathElements = pathname.split('/'),
          path: string = '/',
          breadcrumbs: SingleBreadcrumb[] = [];

      pathElements.forEach((pathElement: string, index: number) => {
          if ( pathElement !== '' ) {
              path += pathElement;
              let title: { title?: string | Function, url?: string, id?: string } = {};

              Object.keys(routes).forEach((key: string) => {
                  if (new RegExp(key).test(path)) {
                      title = routes[key];
                  }
              });

              if (index !== pathElements.length - 1) path += '/';

              if ( ! isEmpty(title) ) {
                  breadcrumbs.push({
                      key: path,
                      url: title.url ? title.url : path,
                      title: typeof title.title === 'string' ? title.title : title.title(pathname),
                      id: title.id
                  });
              }
          }
      });

      return breadcrumbs;
};


/**
 * Check if current user has one of specified user roles
 * and has at least one of specified permissions.
 *
 * @param user
 * @param permission
 */
export const checkUserPermission = (user: Models.User, permission: { userRoles?: string[], permissions?: string[] } = { userRoles: [], permissions: [] }): boolean => {
    if ( permission.userRoles && permission.userRoles.length > 0 && ! permission.userRoles.includes(user.userRole.label) ) return false;
    return !(permission.permissions && permission.permissions.length > 0 && intersection(permission.permissions, user.permissions).length === 0);
};