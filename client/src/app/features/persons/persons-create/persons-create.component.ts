import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sealights-persons-create',
  templateUrl: './persons-create.component.html',
  styleUrls: ['./persons-create.component.scss'],
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class PeopleCreateComponent {

}
