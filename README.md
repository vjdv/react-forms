# React Forms

Easily create your forms

## Features

- Built with React Hooks
- Bootstrap support
- Predesigned controls
- Custom form validations
- Easily incorporate your own controls

## Installation

```
npm install @vjdv/react-forms
```

By default this package uses Bootstrap classes so you may need to install Bootstrap:

```
npm install bootstrap@5.0.0-beta3
```

And include the css in your project:

```css
@import "bootstrap/scss/bootstrap.scss";
```

## Usage

```js
import { Form, FormSelect, FormTextInput, FormCol, FormRow, FormValidation, useFormState } from "@vjdv/react-forms";

function AddressForm() {
  const formstate = useFormState({ addressLine1: "", addressLine2: "", zipCode: "", state: "" });
  function confirm() {
    return confirm("Are you sure?");
  }
  //Print current form values
  function save() {
    console.log(formstate);
    console.log("Saved");
  }
  return (
    <Form state={formstate} onSubmit={guardar} confirm={confirm}>
      Address line 1:
      <FormTextInput name="addressLine1" />
      Address line 2:
      <FormTextInput name="addressLine2" />
      Zip Code:
      <FormTextInput name="zipCode" />
      State:
      <FormSelect name="state" options={states} />
    </Form>
  );
}
```
