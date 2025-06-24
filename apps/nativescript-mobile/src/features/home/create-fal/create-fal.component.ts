import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ImageAsset, Utils } from '@nativescript/core';
import { TitleComponent } from '../../../components/title/title.component';

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

  async pickImage() {
    // const context = ImagePicker.create({
    //   mode: 'single',
    // });
    // await context.authorize();
    // const selection = await context.present();
    // if (selection.length > 0) {
    //   const selected = selection[0];
    //   this.imageSrc = selected.android || selected.ios;
    // }
  }

  submitFal() {
    if (!this.imageSrc) {
      alert('Bitte ein Bild auswählen.');
      return;
    }

    console.log('Neuer Fal wird eingereicht mit Sprache:', this.selectedLanguage);
    console.log('Bild:', this.imageSrc);

    // TODO: Hier API-Aufruf oder Navigation zu Bestätigungsseite
  }
}
