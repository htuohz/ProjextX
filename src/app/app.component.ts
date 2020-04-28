import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedNotes: any[] = [];
  title = 'travelApp'

  onChange(notes){
    console.log(this.selectedNotes);
    this.selectedNotes = notes;
    console.log(this.selectedNotes);
  }
}
