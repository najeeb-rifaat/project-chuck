import { Component, Input} from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: 'button.component.html',
  styleUrls: [ '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css', 'button.component.scss' ]
})
export class ButtonComponent {
  @Input()
  title: String;
}
