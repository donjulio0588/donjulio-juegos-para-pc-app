import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainNavBar } from "@app/shared/components/main-nav-bar/main-nav-bar";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-games-module',
  imports: [MainNavBar, FloatLabelModule, InputTextModule, TextareaModule, ReactiveFormsModule, ButtonModule, SelectModule, CheckboxModule, EditorModule, MultiSelectModule, FormsModule],
  templateUrl: './games-module.html',
  styleUrl: './games-module.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormBuilder]
})
export class GamesModule {
  gameAdditionForm: FormGroup;
  years: { name: number, code: number }[] = [{ name: 1995, code: 1995 }, { name: 1996, code: 1996 }, { name: 1997, code: 1997 }, { name: 1998, code: 1998 }, { name: 1999, code: 1999 }, { name: 2000, code: 2000 }, { name: 2001, code: 2001 }, { name: 2002, code: 2002 }, { name: 2003, code: 2003 }, { name: 2004, code: 2004 }, { name: 2005, code: 2005 }, { name: 2006, code: 2006 }, { name: 2007, code: 2007 }, { name: 2008, code: 2008 }, { name: 2009, code: 2009 }, { name: 2010, code: 2010 }, { name: 2011, code: 2011 }, { name: 2012, code: 2012 }, { name: 2013, code: 2013 }, { name: 2014, code: 2014 }, { name: 2015, code: 2015 }, { name: 2016, code: 2016 }, { name: 2017, code: 2017 }, { name: 2018, code: 2018 }, { name: 2019, code: 2019 }, { name: 2020, code: 2020 }, { name: 2021, code: 2021 }, { name: 2022, code: 2022 }, { name: 2023, code: 2023 }, { name: 2024, code: 2024 }, { name: 2025, code: 2025 }, { name: 2026, code: 2026 }];

  languages: { name: string, code: string }[] = [{ name: 'Español', code: 'es' }, { name: 'Inglés', code: 'en' }, { name: 'Francés', code: 'fr' }, { name: 'Alemán', code: 'de' }, { name: 'Italiano', code: 'it' }, { name: 'Portugués', code: 'pt' }, { name: 'Chino', code: 'zh' }, { name: 'Japonés', code: 'ja' }, { name: 'Coreano', code: 'ko' }, { name: 'Ruso', code: 'ru' }, { name: 'Árabe', code: 'ar' }, { name: 'Hindi', code: 'hi' }, { name: 'Bengalí', code: 'bn' }, { name: 'Indonesio', code: 'id' }, { name: 'Turco', code: 'tr' }, { name: 'Vietnamita', code: 'vi' }, { name: 'Polaco', code: 'pl' }, { name: 'Neerlandés', code: 'nl' }, { name: 'Sueco', code: 'sv' }, { name: 'Danés', code: 'da' }, { name: 'Finlandés', code: 'fi' }, { name: 'Noruego', code: 'no' }, { name: 'Griego', code: 'el' }, { name: 'Hebreo', code: 'he' }, { name: 'Tailandés', code: 'th' }, { name: 'Malayo', code: 'ms' }, { name: 'Tagalo', code: 'tl' }, { name: 'Ucraniano', code: 'uk' }, { name: 'Rumano', code: 'ro' }, { name: 'Checo', code: 'cs' }, { name: 'Húngaro', code: 'hu' }, { name: 'Eslovaco', code: 'sk' }, { name: 'Búlgaro', code: 'bg' }, { name: 'Croata', code: 'hr' }, { name: 'Serbio', code: 'sr' }, { name: 'Albanés', code: 'sq' }, { name: 'Macedonio', code: 'mk' }, { name: 'Lituano', code: 'lt' }, { name: 'Letón', code: 'lv' }, { name: 'Estonio', code: 'et' }, { name: 'Esloveno', code: 'sl' }, { name: 'Catalán', code: 'ca' }, { name: 'Gallego', code: 'gl' }, { name: 'Vasco', code: 'eu' }, { name: 'Catalán', code: 'ca' }, { name: 'Gallego', code: 'gl' }, { name: 'Vasco', code: 'eu' }];

  genres: { name: string, code: string }[] = [{ name: 'Acción', code: 'action' }, { name: 'Aventura', code: 'adventure' }, { name: 'RPG', code: 'rpg' }, { name: 'Simulación', code: 'simulation' }, { name: 'Estrategia', code: 'strategy' }, { name: 'Deportes', code: 'sports' }, { name: 'Carreras', code: 'racing' }, { name: 'Lucha', code: 'fighting' }, { name: 'Puzzle', code: 'puzzle' }, { name: 'Casual', code: 'casual' }, { name: 'Indie', code: 'indie' }, { name: 'MMO', code: 'mmo' }, { name: 'Supervivencia', code: 'survival' }, { name: 'Terror', code: 'horror' }, { name: 'Acción-Aventura', code: 'action-adventure' }, { name: 'Acción-RPG', code: 'action-rpg' }, { name: 'Acción-Simulación', code: 'action-simulation' }, { name: 'Acción-Estrategia', code: 'action-strategy' }, { name: 'Acción-Deportes', code: 'action-sports' }, { name: 'Acción-Carreras', code: 'action-racing' }, { name: 'Acción-Lucha', code: 'action-fighting' }, { name: 'Acción-Puzzle', code: 'action-puzzle' }, { name: 'Acción-Casual', code: 'action-casual' }, { name: 'Acción-Indie', code: 'action-indie' }, { name: 'Acción-MMO', code: 'action-mmo' }, { name: 'Acción-Supervivencia', code: 'action-survival' }, { name: 'Acción-Terror', code: 'action-horror' }, { name: 'Aventura-RPG', code: 'adventure-rpg' }, { name: 'Aventura-Simulación', code: 'adventure-simulation' }, { name: 'Aventura-Estrategia', code: 'adventure-strategy' }, { name: 'Aventura-Deportes', code: 'adventure-sports' }, { name: 'Aventura-Carreras', code: 'adventure-racing' }, { name: 'Aventura-Lucha', code: 'adventure-fighting' }, { name: 'Aventura-Puzzle', code: 'adventure-puzzle' }, { name: 'Aventura-Casual', code: 'adventure-casual' }, { name: 'Aventura-Indie', code: 'adventure-indie' }, { name: 'Aventura-MMO', code: 'adventure-mmo' }, { name: 'Aventura-Supervivencia', code: 'adventure-survival' }, { name: 'Aventura-Terror', code: 'adventure-horror' }, { name: 'RPG-Simulación', code: 'rpg-simulation' }, { name: 'RPG-Estrategia', code: 'rpg-strategy' }, { name: 'RPG-Deportes', code: 'rpg-sports' }, { name: 'RPG-Carreras', code: 'rpg-racing' }, { name: 'RPG-Lucha', code: 'rpg-fighting' }, { name: 'RPG-Puzzle', code: 'rpg-puzzle' }, { name: 'RPG-Casual', code: 'rpg-casual' }, { name: 'RPG-Indie', code: 'rpg-indie' }, { name: 'RPG-MMO', code: 'rpg-mmo' }]

  steamReviews: { name: string, code: string }[] = [{ name: 'Muy positivas', code: 'very-positive' }, { name: 'Positivas', code: 'positive' }, { name: 'Mixtas', code: 'mixed' }, { name: 'Negativas', code: 'negative' }, { name: 'Muy negativas', code: 'very-negative' }];



  constructor(private fb: FormBuilder) {
    this.gameAdditionForm = this.fb.group({
      gameName: [''],
      price: 0,
      description: '',
      releaseDate: [''],
      platforms: [''],
      genres: [''],
      coverImage: [''],
      screenshots: [''],
      trailer: [''],
      year: this.years[0],
      size: [''],
      language: '',
      subtitled: false,
      points: 0,
      steamReview: this.steamReviews[0]
    });
  }

  handleGameAddition() {
    console.log(this.gameAdditionForm.value);
  }
}
