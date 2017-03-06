import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { S3Service } from '../../service/s3.service';
import { S3FileModel } from '../model/s3file.model';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    public files: Array<S3FileModel> = [];

    constructor(public appState: AppState, public s3Service: S3Service) {

    }

    public ngOnInit() {
        console.log('hello `Home` component');

        this.s3Service.listObjects().subscribe(
            (resp) => {
                for (let file of resp.ListBucketResult.Contents)
                {
                    this.files.push(
                        new S3FileModel(
                            file.Key,
                            '',
                            file.Size,
                        )
                    )
                }
            }
        );
    }

    getUrl(key: string) {
        this.s3Service.getObject(key).subscribe(
            (resp) => {
                window.location.href = resp.url;
            }
        );
    }
}
