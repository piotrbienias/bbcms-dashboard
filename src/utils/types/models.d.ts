/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

export enum NotificationType {
    SUCCESS = 'success',
    ERROR = 'error'
}

/**
 * All Models definitions
 */
export namespace Models {

    export interface Notification {
        show?: boolean;
        message: string;
        description: string;
        type: NotificationType.SUCCESS | NotificationType.ERROR;
    }

    /**
     * Permission model representation
     */
    export type Permission = {
        name: string;
        label: string;
    }

    /**
     * User Role model representation
     */
    export type UserRole = {
        name: string;
        label: string;
    }

    /**
     * User model representation
     */
    export type User = {
        id: number;
        email: string;
        userRole: UserRole;
        name?: string;
        lastName?: string;
        isActive: boolean;
        permissions: string[];
        isDeleted: boolean;
    }

    /**
     * Create new User data
     */
    export type UserCreateData = {
        id?: number;
        email: string;
        name?: string;
        lastName?: string;
        userRole: string;
        isActive?: boolean;
        permissions?: string[];
    }

    /**
     * Update User data
     */
    export type UserUpdateData = Partial<UserCreateData>;

    /**
     * Language model representation
     */
    export type Language = {
        id: number;
        code: string;
        name: string;
        isDeleted: boolean
    }

    /**
     * Translation model representation
     */
    export type Translation = {
        id: number | null;
        translation: string | null;
        translationPhrase: number;
        language: number;
    }

    /**
     * Translation Phrase model representation
     */
    export type TranslationPhrase = {
        id: number;
        phrase: string;
        label: string;
        isDeleted?: boolean;
        translations?: Translation[];
    }

}