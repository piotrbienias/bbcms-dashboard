/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */


import { Models } from "@utils/types/models";
import { SingleBreadcrumb } from "@components/Breadcrumbs";
import { Map } from "immutable";
import { History } from 'history';


/**
 * Application translation object.
 */
export type AppTranslation = {
    currentLanguage: string;
    languages: Models.Language[];
    translations: { [key: string]: string };
}


/**
 * Root Application properties.
 */
export type ApplicationProperties = {
    login: object;
    history: History;
    user: Models.User;
    notification: Models.Notification;
    breadcrumbs: SingleBreadcrumb[];
    translation: AppTranslation;
}


/**
 * Root Application state in Immutable form.
 */
export type ApplicationState = Map<keyof ApplicationProperties, any>;