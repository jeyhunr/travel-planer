import { Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { TitleComponent } from '../../../components/title/title.component';
import * as camera from '@nativescript/camera';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';
import { FalService } from './../../../core/services/fal.service';
import { ImageSource, knownFolders, path } from '@nativescript/core';

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
      await camera.requestPermissions();

      const imageAsset = await camera.takePicture({ saveToGallery: true, allowsEditing: true });

      const source = await ImageSource.fromAsset(imageAsset);

      const folder = knownFolders.temp();
      const filePath = path.join(folder.path, 'photo.jpg');
      const saved = source.saveToFile(filePath, 'jpg');

      if (saved) {
        this.imageSrc = filePath;
      }
    } catch (error) {
      console.error('Bildaufnahme fehlgeschlagen:', error);
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
