/**
 * Imports
 */
import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

// Required components
import Button from '../../../common/buttons/Button';
import InputField from '../../../common/forms/InputField';
import Select from '../../../common/forms/Select';

// Instantiate debugger
let debug = require('debug')('simple-store');

/**
 * Component
 */
class AdminCollectionsAddForm extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired,
        intl: intlShape.isRequired,
    };

    //*** Initial State ***//

    state = {
        name: {uk: '', ru: '', en: ''},
        tags: [],
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminCollectionsAddForm.scss');
    }

    //*** View Controllers ***//

    handleNameChange = (locale, value) => {
        let name = this.state.name;
        name[locale] = value;
        this.setState({name: name});
    };

    handleSubmitClick = () => {
        let intl = this.context.intl;

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (this.state.tags.indexOf('category') === -1 && this.state.tags.indexOf('collection') === -1) {
            fieldErrors.type = intl.formatMessage({id: 'fieldRequired'});
        }
        if (!this.state.name.uk) {
            fieldErrors.nameUA = intl.formatMessage({id: 'fieldRequired'});
        }
        if (!this.state.name.ru) {
            fieldErrors.nameRU = intl.formatMessage({id: 'fieldRequired'});
        }
        if (!this.state.name.en) {
            fieldErrors.nameEN = intl.formatMessage({id: 'fieldRequired'});
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                name: this.state.name,
                tags: this.state.tags
            });
        }
    };

    handleTypeChange = (value) => {
        this.setState({tags: [value]});
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intl = this.context.intl;
        let locale = intl.locale;

        let collectionTypeOptions = [
            {name: intl.formatMessage({id: 'category'}), value: 'category'},
            {name: intl.formatMessage({id: 'collection'}), value: 'collection'}
        ];

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        //
        // Return
        //
        return (
            <div className="admin-collections-add-form">
                <div className="admin-collections-add-form__item">
                    <Select label={intl.formatMessage({id: 'type'})}
                            placeholder
                            options={collectionTypeOptions}
                            onChange={this.handleTypeChange}
                            error={fieldError('type')} />
                </div>
                <div className="admin-collections-add-form__item">
                    <InputField label={intl.formatMessage({id: 'name'}) + ' (UA)'}
                                onChange={this.handleNameChange.bind(null, 'uk')}
                                error={fieldError('nameUA')} />
                </div>
                <div className="admin-collections-add-form__item">
                    <InputField label={intl.formatMessage({id: 'name'}) + ' (RU)'}
                                onChange={this.handleNameChange.bind(null, 'ru')}
                                error={fieldError('nameRU')} />
                </div>
                <div className="admin-collections-add-form__item">
                    <InputField label={intl.formatMessage({id: 'name'}) + ' (EN)'}
                                onChange={this.handleNameChange.bind(null, 'en')}
                                error={fieldError('nameEN')} />
                </div>
                <div className="admin-collections-add-form__actions">
                    <div className="admin-collections-add-form__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                            <FormattedMessage id="cancelButton" />
                        </Button>
                    </div>
                    <div className="admin-collections-add-form__button">
                        <Button type="primary" onClick={this.handleSubmitClick} disabled={this.props.loading}>
                            <FormattedMessage id="addButton" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
AdminCollectionsAddForm.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminCollectionsAddForm;
