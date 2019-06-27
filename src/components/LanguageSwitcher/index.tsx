/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { withLocalize, LocalizeContextProps, Language, Translate } from 'react-localize-redux';


type LanguageSwitcherProps = LocalizeContextProps & {
    changeLanguage(code: string): void;
}


class LanguageSwitcher extends React.Component<LanguageSwitcherProps> {

    getLanguageMenu = () => {
        return (
            <Menu>
                {this.props.languages.map((language: Language & { isDeleted: boolean }) => {
                    if ( ! language.isDeleted )
                        return <Menu.Item onClick={() => this.handleClick(language.code)} key={language.code}>{language.name}</Menu.Item>
                })}
            </Menu>
        );
    };

    handleClick = (code: string) => {
        this.props.changeLanguage(code);
    };

    render() {
        return (
            <div>
                <Dropdown overlay={this.getLanguageMenu()} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">{this.props.activeLanguage ? this.props.activeLanguage.name : null} <Icon style={{ fontSize: 12 }} type="down" /></a>
                </Dropdown>
            </div>
        )
    }

}


export default withLocalize(LanguageSwitcher);