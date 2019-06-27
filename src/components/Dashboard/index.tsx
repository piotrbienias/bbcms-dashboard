/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import Layout from 'antd/lib/layout';
import { ConnectedRouter } from "connected-react-router/immutable";

// Components
import Menu from '@components/Menu';
import TopMenu from "@components/TopMenu";
import Breadcrumbs from "@components/Breadcrumbs";
import routes from "@components/Router";

import { AppProps } from '@containers/App';
import { renderToStaticMarkup } from "react-dom/server";
import { LocalizedElement, MissingTranslationOptions } from "react-localize-redux";

import 'antd/lib/layout/style/index.css';


const {
    Sider,
    Content,
    Footer,
    Header
} = Layout;

const onMissingTranslation = (options: MissingTranslationOptions): LocalizedElement => options.defaultTranslation;


type DashboardProps = AppProps;


/**
 * Dashboard components - holds the application Layout together with main Router.
 */
class Dashboard extends React.Component<DashboardProps> {

    /**
     * Actions to be done when component mounts itself:
     * - fetch all languages
     * - fetch translations for current language
     */
    componentDidMount(): void {
        this.props.fetchLanguages();
        this.props.fetchTranslations(this.props.translation.currentLanguage);
    }

    /**
     * Actions to be done when component updates:
     * - after fetching the languages, initialize the Localization
     * - set current language
     * - if language changes, fetch translations for new language
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<AppProps>): void {
        if ( this.props.translation.languages.length > 0 && this.props.languages.length !== this.props.translation.languages.length ) {
            this.props.initialize({
                languages: this.props.translation.languages,
                options: {
                    renderToStaticMarkup,
                    onMissingTranslation,
                    renderInnerHtml: true
                }
            });

            this.props.setActiveLanguage(this.props.translation.currentLanguage);
        }

        if ( this.props.translation.currentLanguage !== prevProps.translation.currentLanguage ) {
            this.props.fetchTranslations(this.props.translation.currentLanguage);
        }
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <ConnectedRouter history={this.props.history}>
                    <Sider>
                        <div className="logo" />
                        <Menu user={this.props.user} history={this.props.history} />
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <TopMenu logout={this.props.logout} changeLanguage={this.props.setCurrentLanguage} />
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumbs breadcrumbs={this.props.breadcrumbs} style={{ margin: '16px 0' }} history={this.props.history} />
                            <div style={{ padding: 24, background: '#fff' }}>
                                { routes }
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>BBCms ® 2019</Footer>
                    </Layout>
                </ConnectedRouter>
            </Layout>
        )
    }

}


export default Dashboard;