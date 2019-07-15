import {SchemaDefaultField, SchemaOptions, SchemaErrorList} from './interfaces';
import {validators} from "vue-form-generator";

export const FORM_FIELDS = {
    options: (options?: object): SchemaOptions => {
        return Object.assign({
            validateAfterLoad: false,
            validateAfterChanged: true,
        }, options);
    },
    description: (model: string = 'description', properties: SchemaDefaultField = {}): SchemaDefaultField => {
        return Object.assign({
            type: 'textArea',
            model: model,
            max: 2000,
            min: 20,
            required: true,
            validator: validators.string
        }, properties);
    },
    errorsList: (model: string, count: number, properties: SchemaDefaultField = {}): SchemaErrorList => {
        return Object.assign({
            type: 'errors-list',
            count: count,
            model: model
        }, properties);
    },
    submit: (submit: Function, properties: object = {}) => {
        return Object.assign({
            type: "submit",
            buttonText: 'Отправить',
            validateBeforeSubmit: true,
            onSubmit: submit
        }, properties);
    },
    button: (text: string, onClick: Function, properties: SchemaDefaultField = {}): SchemaDefaultField => {
        return Object.assign({
            type: 'cbutton',
            text: text,
            onClick: onClick,
            class: 'button__orange'
        }, properties);
    },
    imageWorker: (properties: SchemaDefaultField = {}): SchemaDefaultField => {
        return Object.assign({
            model: 'image',
            type: 'image-worker',
        }, properties);
    },
};
