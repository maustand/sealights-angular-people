import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subscription, debounceTime, filter } from 'rxjs';

@Component({
  selector: 'sealights-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() plholder?: string;

  @Input() dbTime: number = 500;

  @Output() searchTextChanged = new EventEmitter<string>();

  searchBoxForm = new FormGroup({
    searchText: new FormControl<string>(''),
  });

  private formValuesChangesSub$!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.formValuesChangesSub$ = this.searchBoxForm.valueChanges
      .pipe(
        debounceTime(this.dbTime),
        filter(() => this.searchBoxForm.valid)
      )
      .subscribe((value) => {
        this.searchTextChanged.emit(value.searchText as string);
      });
  }

  ngOnDestroy(): void {
    this.formValuesChangesSub$.unsubscribe();
  }
}
