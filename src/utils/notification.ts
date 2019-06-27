/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */


import { Models, NotificationType } from '@utils/types/models';



export abstract class AppNotification {
    public type: NotificationType;
    public show: boolean;

    protected constructor(public description: string, public message: string) {
        this.show = true;
    }
}


/**
 * Notification showed on successful action.
 */
export class SuccessNotification extends AppNotification implements Models.Notification {

    public type: NotificationType.SUCCESS;

    constructor(description: string, message: string = 'Success', ) {
        super(description, message);

        return this;
    }

}


/**
 * Notification showed when action fails.
 */
export class ErrorNotification extends AppNotification implements Models.Notification {

    public type: NotificationType.ERROR;

    constructor(description: string, message: string = 'Failure') {
        super(description, message);

        return this;
    }

}