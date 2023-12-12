import { Component, OnInit } from '@angular/core';
import { UserProfile } from '@angular/fire/auth';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  profile: DocumentData | null = null;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
    ) {
      
        this.avatarService.getUserProfile().subscribe((data: UserProfile | undefined) => {
          this.profile = data!;
        })
     }
  ngOnInit(): void {
    
  }
 

  async logout(){
     await this.authService.logout();
     this.router.navigateByUrl('login', {replaceUrl: true})
}
  async changeImage(){
  const image = await Camera.getPhoto({
    quality:90,
    allowEditing:false,
    resultType:CameraResultType.Base64,
    source: CameraSource.Photos,
  });
  console.log(image)
  
  if(image){
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.avatarService.uploadImage(image);
    loading.dismiss();
    if(!result){
        const alert = await this.alertController.create({
          header:'Uploud failed',
          message: 'There was a problem uploading your avatar.',
          buttons:['OK']
        });
        await alert.present();
      }
    }
  }

  goToPickupCalls() {
    this.router.navigate(['pickup-calls']);
  }
  newPickupCall() {
    this.router.navigate(['pickup-call']);
  }
}
