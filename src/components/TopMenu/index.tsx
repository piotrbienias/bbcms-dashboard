/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';

import LanguageSwitcher from '@components/LanguageSwitcher';


type TopMenuProps = {
    changeLanguage(code: string): void;
    logout(): void;
}


class TopMenu extends React.Component<TopMenuProps> {

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 16px' }}>
                <LanguageSwitcher changeLanguage={this.props.changeLanguage} />
                <div style={{ marginLeft: 15 }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => this.props.logout()}>Logout</span>
                </div>
            </div>
        )
    }

}


export default TopMenu;