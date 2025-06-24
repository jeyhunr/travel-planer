import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { TitleComponent } from '../../../components/title/title.component';
import * as camera from '@nativescript/camera';
import { Image } from '@nativescript/core';

@Component({
  selector: 'ns-create-fal',
  templateUrl: './create-fal.component.html',
  imports: [NativeScriptCommonModule, TitleComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CreateFalComponent {
  imageSrc: string | null = null;
  selectedLanguage = 'Deutsch';
  languages = ['Deutsch', 'Türkisch', 'Englisch'];

  async pickImage(): Promise<void> {
    try {
      const perms = await camera.requestPermissions();

      if (!perms?.Success) {
        console.warn('Camera permission denied.');
        return;
      }

      const imageAsset = await camera.takePicture();
      console.log('Image captured:', imageAsset);

      const image = new Image();
      image.src = imageAsset;
    } catch (error) {
      console.error('Image capture failed:', error);
    }
  }

  submitFal() {
    if (!this.imageSrc) {
      alert('Bitte ein Bild auswählen.');
      return;
    }

    console.log('Neuer Fal wird eingereicht mit Sprache:', this.selectedLanguage);
    console.log('Bild:', this.imageSrc);
  }
}
