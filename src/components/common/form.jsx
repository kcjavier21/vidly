import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';
//import DataList from './dataList';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
     };

     validate = () => {
        const result = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        const { error } = result;
        //console.log(result);

        if (!error) return null;

        const errors = {};

        for (let item of error.details)
            errors[item.path[0]] = item.message;

        return errors;
    };

    validateProperty = input => {
        const { name, value } = input;

        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const result = Joi.validate(obj, schema);
        const { error } = result;

        return error ? error.details[0].message : null;
    };

    handleChange = event => {
        const { currentTarget: input } = event;

        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);

        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;

        this.setState({data, errors});
    };

    handleSubmit = event => {
        event.preventDefault();

        const errors = this.validate();
        console.log(errors);
        this.setState({ errors : errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    renderInput(name, label, type='text') {
        const { data, errors } = this.state;

        return (
            <Input 
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    renderSelect(name, label, options) {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }


    // renderDataList(name, label, options) {
    //     const { data, errors } = this.state;

    //     return (
    //         <DataList
    //             name={name}
    //             value={data[name]}
    //             label={label}
    //             options={options}
    //             onChange={this.handleChange}
    //             error={errors[name]}
    //         />
    //     );
    // }


    renderButton(label) {
        return (
            <button disabled={this.validate()} className="btn btn-primary">
            {label}
            </button>
        );
    }

   
}
 
export default Form;