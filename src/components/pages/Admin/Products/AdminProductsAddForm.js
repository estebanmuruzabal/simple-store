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

// Instantiate logger
let debug = require('debug')('simple-store');

/**
 * Component
 */
class AdminProductsAddForm extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired,
        intl: intlShape.isRequired,
    };

    //*** Initial State ***//

    state = {
        name: {uk: '', ru:'', en: ''},
        sku: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminProductsAddForm.scss');
    }

    //*** View Controllers ***//

    handleSKUChange = (value) => {
        this.setState({sku: value});
    };

    handleNameChange = (locale, value) => {
        let name = this.state.name;
        name[locale] = value;
        this.setState({name: name});
    };

    handleSubmitClick = () => {
        let intl = this.context.intl;

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.sku) {
            fieldErrors.sku = intl.formatMessage({id: 'fieldRequired'});
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
                sku: this.state.sku,
                name: this.state.name
            });
        }
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intl = this.context.intl;

        let fieldError = (field) => {
            return this.props.error ? this.props.error[field] : this.state.fieldErrors[field];
        };

        //
        // Return
        //
        return (
            <div className="admin-products-add-form">
                <div className="admin-products-add-form__item">
                    <InputField label={intl.formatMessage({id: 'skuHeading'})}
                                onChange={this.handleSKUChange}
                                error={fieldError('sku')} />
                </div>
                <div className="admin-products-add-form__item">
                    <InputField label={intl.formatMessage({id: 'name'}) + ' (UA)'}
                                onChange={this.handleNameChange.bind(null, 'uk')}
                                error={fieldError('nameUA')} />
                </div>
                <div className="admin-products-add-form__item">
                    <InputField label={intl.formatMessage({id: 'name'}) + ' (RU)'}
                                onChange={this.handleNameChange.bind(null, 'ru')}
                                error={fieldError('nameRU')} />
                </div>
                <div className="admin-products-add-form__item">
                    <InputField label={intl.formatMessage({id: 'name'}) + ' (EN)'}
                                onChange={this.handleNameChange.bind(null, 'en')}
                                error={fieldError('nameEN')} />
                </div>
                <div className="admin-products-add-form__actions">
                    <div className="admin-products-add-form__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                            <FormattedMessage id="cancelButton" />
                        </Button>
                    </div>
                    <div className="admin-products-add-form__button">
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
AdminProductsAddForm.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminProductsAddForm;
