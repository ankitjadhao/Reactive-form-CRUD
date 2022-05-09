import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ReactiveCRUD';

  employeeForm: FormGroup
  submitted: any = false;
  editoperation = false;
  selectedobj: any;
  selectedindex: any;
  employeeList: any = [];



  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10),]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      qual: ['', [Validators.required]]

    })
    let empdata = localStorage.getItem('EMPLOYEE_LIST');
    if (empdata) {
      this.employeeList = JSON.parse(empdata);
    }

  }

  ngOnInit(): void {
  }

  Save() {
    this.submitted = true;

    if (this.employeeForm.valid) {
      this.employeeList.push(this.employeeForm.value)
      console.log("Submit Sucessfully", this.employeeForm.value);
      alert("Form is valid.... submitted Sucessfully...!")
      let ref = document.getElementById('cancel')
      ref?.click();
    }
    else {
      alert("Form is not-valid.... please try again...!")
    }
    this.employeeForm.reset();
    localStorage.setItem("EMPLOYEE_LIST", JSON.stringify(this.employeeList))
  }

  Update() {
    this.editoperation = false;
    let ref = document.getElementById('cancel')
    ref?.click();
    this.employeeList[this.selectedindex].name = this.employeeForm.value.name;
    this.employeeList[this.selectedindex].email = this.employeeForm.value.email;
    this.employeeList[this.selectedindex].mobile = this.employeeForm.value.mobile;
    this.employeeList[this.selectedindex].dob = this.employeeForm.value.dob;
    this.employeeList[this.selectedindex].gender = this.employeeForm.value.gender;
    this.employeeList[this.selectedindex].qual = this.employeeForm.value.qual;
    this.clear();

    localStorage.setItem("EMPLOYEE_LIST", JSON.stringify(this.employeeList))
  }

  edit(index: any, obj: any) {
    this.editoperation = true;
    this.selectedindex = index;
    this.selectedobj = obj;
    console.log('this.selectedemployee', this.selectedobj)

    this.employeeForm.patchValue({
      name: obj.name,
      email: obj.email,
      mobile: obj.mobile,
      dob: obj.dob,
      gender: obj.gender,
      qual: obj.qual
    })
  }

  delete(index: any) {
    console.log("Delete", index);
    this.employeeList.splice(index, 1)
  }
  get f() {
    return this.employeeForm.controls
  }

  clear() {
    this.employeeForm.reset();
  }

}
