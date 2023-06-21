import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Person } from '@core/models/person';

type AvailableColumns = 'id' | 'name' | 'birthdate' | 'addresses';

@Component({
  selector: 'sealights-persons-table-view',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './persons-table-view.component.html',
  styleUrls: ['./persons-table-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonsTableViewComponent {
  @Input({ required: true }) items: Person[] = [];

  @Input() displayedColumns?: AvailableColumns[] = ['id', 'name', 'birthdate', 'addresses'];
}
