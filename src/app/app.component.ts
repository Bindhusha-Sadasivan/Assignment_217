import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  projectForm!:FormGroup;
  defaultStatus:any = 'stable';
  forbiddenNames:any = ['Test'];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.projectForm = new FormGroup({
      'projectname': new FormControl('',{
        // validators:[Validators.required, this.forebiddenNamesValidator(this.forbiddenNames)],
        validators:[Validators.required],
        asyncValidators:[this.forebiddenNamesAsyncValidator]
      }
      ),
      'projectmail': new FormControl('', {
        validators:[Validators.required, Validators.email],
        asyncValidators:[]
      }),
      'projectstatus': new FormControl(null)
    })
  }
get projectname():any{
  return this.projectForm.get('projectname');
}

get projectmail():any{
  return this.projectForm.get('projectmail');
}

get projectstatus():any{
  return this.projectForm.get('projectstatus');
}

  onSubmit(){
    console.log("Project Form", this.projectForm);
  }

  // forebiddenNamesValidator(forbiddenNames: string[]): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (forbiddenNames.indexOf(control.value) !== -1) {
  //       return { 'nameIsForbidden': true };
  //     }
  //     return null;
  //   };
  // }

  forebiddenNamesAsyncValidator(control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ 'nameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
}
