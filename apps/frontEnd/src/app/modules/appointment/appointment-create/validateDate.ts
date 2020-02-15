import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function validateDate(startDate: string, endDate: string) {
    return (formGroup: FormGroup) => {
        const sDate = formGroup.controls[startDate];
        const eDate = formGroup.controls[endDate];

        if (sDate.errors && !eDate.errors.Date) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (sDate.value>= eDate.value||sDate.value<Date.now) {
            console.log('ttt')
            eDate.setErrors({ Date: true });
        } else {
            eDate.setErrors(null);
        }
    }
}
