import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";

export class LoginPageform {

    private formbuilder: FormBuilder;


    constructor(formbuilder: FormBuilder) {
        this.formbuilder = formbuilder;
    }
    createForm(): FormGroup {
        return this.formbuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

}