/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */



/**
 * Module type for HMR
 */
export type HotModule = NodeModule & {
    hot: any;
}


/**
 * Default Redux Action
 */
export interface DefaultActionType {
    type: string;
    data?: any
}


/**
 * Redux action only with type
 */
export type ActionType = {
    type: string;
}