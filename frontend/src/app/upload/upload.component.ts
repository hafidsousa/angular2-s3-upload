import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { S3Service } from '../../service/s3.service';
import { S3FileModel } from '../model/s3file.model';

@Component({
    selector: 'upload',
    styleUrls: ['upload.component.css'],
    templateUrl: 'upload.component.html'

})
export class UploadComponent implements OnInit {

    public files: Array<S3FileModel> = [];
    public doneUpload: boolean = false;
    public inProgressUpload: boolean = false;

    constructor(public appState: AppState, public s3Service: S3Service) {

    }

    public ngOnInit() {
        console.log('hello `Upload` component');

        this.doneUpload = false;
        this.inProgressUpload = false;
    }

    fileChange(event) {
        if (event.target.files && event.target.files[0])
        {
            console.log('invoked');
            this.inProgressUpload = true;
            this.s3Service.putObject(
                event.target.files[0]
            ).subscribe(
                (resp) => {
                    console.log('uploaded');
                },
                (error) => {
                    console.log('Error Uploading file');
                },
                () => {
                    this.doneUpload = true;
                    this.inProgressUpload = false;
                }
            );
        }
    }
}
