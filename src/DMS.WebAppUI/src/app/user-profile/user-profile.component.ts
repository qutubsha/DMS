﻿import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegistration, UserRegistration, FileReaderEventTarget, FileReaderEvent, IUser, UserImage, IUserImage} from '../login/login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { NotificationsService, SimpleNotificationsComponent, PushNotificationsService } from 'angular2-notifications';
import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs/Rx';
@Component({
    templateUrl: './user-profile.component.html',
    providers: [UserService, SharedService, NotificationsService]
})
export class UserProfileComponent {
    private userprofile: IUserRegistration;
    private userimage: IUserImage
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private errorMessage: string;
    busy: Subscription;
    private imageContent: any;
   // private element: ElementRef;
    private currentUser: IUserRegistration;
    constructor(
        private router: Router,
        private element: ElementRef,
        private _userService: UserService,
        private _sharedService: SharedService
    ) { }

    ngOnInit(){
        this.userprofile = {
            UserId: 0,
            UserName: '',
            Password: '',
            RepeatPassword: '',
            FirstName: '',
            LastName: '',
            Email: '',
            
        };
        debugger;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.editUserProfile(this.currentUser.Email);
       this.getEmployeeImage();
    }

    redirectToDashbord() {
        this.router.navigate(['/dashboard']);
    }

    editUserProfile(Email: any) {
        debugger
        if (Email != null && Email != 0) {
            this.busy = this._userService.getUserById(Email)
                .subscribe(data => {
                    debugger
                    if (data.Result != null) {
                        debugger
                        this.userprofile = data.Result;
                    }
                }, error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = 'Error in getting User details.';
                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                });
        }
    }

    getEmployeeImage() {
        debugger
        this.busy = this._userService.getUserImage(this.currentUser.Email).subscribe(
            data => {
                this.userimage = data;
                if (data != null && this.userimage.ConvertedImage != null && this.userimage.ConvertedImage != '')
                    this.imageContent = 'data:' + this.userimage.ContentType + ';base64,' + this.userimage.ConvertedImage;
                else
                    this.imageContent = '../../assets/images/please_upload.gif';
            },
            error => this.errorMessage = <any>error
        );
    }
    changeImageSrc(event) {
        debugger
        if (event.target.files.length > 0) {
            var fuData = this.element.nativeElement.querySelector('#fileMugshot');
            var fileUploadPath = fuData.value;
            if (fileUploadPath != null && fileUploadPath != '') {
                var extension = fileUploadPath.substring(fileUploadPath.lastIndexOf('.') + 1).toLowerCase();

                //The file uploaded is an image
                if (extension == "gif" || extension == "png" || extension == "bmp"
                    || extension == "jpeg" || extension == "jpg") {

                    var reader = new FileReader();
                    var image = this.element.nativeElement.querySelector('.img-responsive');
                    reader.onload = function (e: FileReaderEvent) {
                        var src = e.target.result;
                        image.src = src;
                    };
                    this.userimage.ContentType = event.target.files[0].type;
                    this.userimage.FileName = event.target.files[0].name;
                    reader.readAsDataURL(event.target.files[0]);
                }
                else {
                    this.notificationTitle = 'Photo only allows file types of GIF, PNG, JPG, JPEG and BMP.';
                    //this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                }
            }
        }
    }
    submitForm(event: Event): void {
        var image = this.element.nativeElement.querySelector('.img-responsive');
        let newConvertedImage: string = image.src;
        //if (newConvertedImage.indexOf('please_upload') == -1) {
        newConvertedImage = newConvertedImage.replace('data:' + this.userimage.ContentType + ';base64,', '');
        this.userimage.ConvertedImage = newConvertedImage;
        let saveImage: UserImage = new UserImage(0, '', this.userimage.ContentType, this.userimage.FileName, '', this.userimage.ConvertedImage);

        let upUserpro: UserRegistration = new UserRegistration(this.userprofile.UserId, '', this.userprofile.Password, '', this.userprofile.FirstName, this.userprofile.LastName, this.userprofile.Email);
        this.busy = Observable.forkJoin(
            this._userService.updateEmployeeImage(saveImage, this.currentUser.Email),
            this._userService.updateuser(upUserpro)).subscribe(
            data => {
             //   debugger
                this.router.navigate(['/dashboard']);
                return true;
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = 'Error in Updating User.';
               this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            },
            () => {
                debugger
                this.notificationTitle = 'User Updated successfully.';
                this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
            });

    }
}