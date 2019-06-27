/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */



function getLastPartOfURL(pathname: string): string {
    return pathname.split('/').pop();
}


/**
 * All routes in the system used to determine breadcrumbs structure.
 * Every key of this object should be a valid string RegExp
 * representation, because in further computations this string
 * is used in `new RegExp(string)` against which current pathname
 * is being tested. Breadcrumbs are computed on the matches.
 */
const routes: { [key: string]: { title: string | Function, id?: string, url?: string } } = {
    '/i18n/languages$': { title: 'Languages', id: 'languages' },
    '/i18n/phrases$': { title: 'Phrases', id: 'phrases' },
    '/i18n$': { title: 'i18n', url: '#' },
    '/system/users/new$': { title: 'New user', id: 'new-user', url: '#' },
    '/system/users/\\d+$': { title: (pathname: string) => { return getLastPartOfURL(pathname); }, url: '#' },
    '/system/users$': { title: 'Users', id: 'users' },
    '/system$': { title: 'System', url: '#' }
};

export default routes;