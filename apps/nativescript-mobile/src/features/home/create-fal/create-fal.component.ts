import { Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { TitleComponent } from '../../../components/title/title.component';
import * as camera from '@nativescript/camera';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';
import { FalService } from './../../../core/services/fal.service';

@Component({
  selector: 'ns-create-fal',
  templateUrl: './create-fal.component.html',
  imports: [NativeScriptCommonModule, TitleComponent, NativeScriptLocalizeModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CreateFalComponent {
  falService = inject(FalService);
  imageSrc = null;

  loading = this.falService.loading;
  languages = ['English', 'Azerbaijani', 'German', 'Turkish'].sort((a, b) => a.localeCompare(b));
  selectedLanguageIndex = 0;

  private getLanguage(): string {
    return this.languages[this.selectedLanguageIndex];
  }

  async pickImage(): Promise<void> {
    try {
      const perms = await camera.requestPermissions();

      if (!perms?.Success) {
        return;
      }

      const imageAsset = await camera.takePicture({ saveToGallery: true, allowsEditing: true });

      this.imageSrc = imageAsset;
    } catch (error) {
      console.error('Image capture failed:', error);
    }
  }

  submitFal() {
    if (!this.imageSrc) {
      alert('Plaease take a photo first.');
      return;
    }

    this.falService.createFal(this.imageSrc, this.getLanguage());
  }

  onLangChange(e: { value: number }) {
    this.selectedLanguageIndex = e.value;
  }
}
