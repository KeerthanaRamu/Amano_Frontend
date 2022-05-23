import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { StudentService } from '../students.service';
import { LanguageService } from '../../../core/service/language.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr'; 
import {Router,ActivatedRoute} from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-about-student',
  templateUrl: './about-student.component.html',
  styleUrls: ['./about-student.component.scss']
})
export class AboutStudentComponent implements OnInit {

  studentId;
  studentData:any;
  studentDocData:any;
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  apiURL=environment.apiUrl;

  constructor(
    private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private studentService:StudentService,private languageService:LanguageService,public dialog: MatDialog,
    private modalService: NgbModal,private toastrService: ToastrService,private router: Router,
    private route: ActivatedRoute,private spinner: NgxSpinnerService
  ) {

    this.studentId=this.route.snapshot.paramMap.get('id');

   }

  ngOnInit(): void {
    this.loadData();
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
      this.loadData();
    })
    
  }

  loadData(){
    this.studentService.getParticularStudentDetails(this.studentId)
    .subscribe(res=>{
        this.studentData=res['studData'][0];
        console.log("this.studentData=========",this.studentData);
        console.log(this.studentData['nric_'+this.translateVal])
        this.studentData['nricType']=this.studentData['nric_'+this.translateVal];
        this.studentData['placeBirth']=this.studentData['place_'+this.translateVal];
        this.studentData['race']=this.studentData['race_'+this.translateVal];
        this.studentData['preference']=this.studentData['pref_'+this.translateVal];
        this.studentData['existenceLicense']=this.studentData['existence_'+this.translateVal];
        this.studentDocData=res['docData'][0];
    })
  }

}
