/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';

import { Table } from 'antd';
import { Models } from "@utils/types/models";
import { withRouter } from 'react-router-dom';
import { History, Location } from 'history';
import { LocalizeContextProps, Translate, withLocalize} from 'react-localize-redux';

import EditTableRecordIcon from '@components/EditTableRecordIcon';
import DeleteTableRecordPopconfirm from '@components/DeleteTableRecordPopconfirm';
import RestoreTableRecordPopconfirm from '@components/RestoreTableRecordPopconfirm';
import {LanguageModalType} from "@containers/LanguageList/types";


type LanguagesTableProps = {
    languages: Models.Language[];
    showModal(data: LanguageModalType['data']): void;
    deleteLanguage(id: number): void;
    restoreLanguage(id: number): void;
    history: History;
    location: Location;
    match: any;
}



class LanguagesTable extends React.Component<LanguagesTableProps> {

    /**
     * Return table columns.
     */
    getColumns = () => {
        return [
            {
                title: <Translate id="name">Name</Translate>,
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: <Translate id="code">Code</Translate>,
                dataIndex: 'code',
                key: 'code'
            },
            {
                title: <Translate id="manage-row-record">Manage</Translate>,
                key: 'manage',
                width: '10%',
                render: (language: Models.Language) => {
                    return language.isDeleted ? (
                        <RestoreTableRecordPopconfirm
                            tooltipTitle={<Translate id="restore-language">Restore language</Translate>}
                            popconfirmTitle="Do you want to restore this language?"
                            onConfirm={() => this.props.restoreLanguage(language.id)} />
                    ) : (
                        <div>
                            <EditTableRecordIcon
                                title="Edit language"
                                onClick={() => this.props.showModal(language)} />
                            <DeleteTableRecordPopconfirm
                                tooltipTitle="Delete language"
                                popconfirmTitle="Are you sure you want to delete this language?"
                                onConfirm={() => this.props.deleteLanguage(language.id)} />
                        </div>
                    );
                }
            }
        ]
    };

    render() {
        return (
            <Table
                rowKey={language => language.code}
                rowClassName={language => language.isDeleted ? 'DeletedRow' : ''}
                columns={this.getColumns()}
                dataSource={this.props.languages} />
        )
    }

}


export default withRouter<LanguagesTableProps>(LanguagesTable);