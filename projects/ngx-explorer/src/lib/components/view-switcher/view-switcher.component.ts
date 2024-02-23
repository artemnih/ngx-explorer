import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvialableView } from '../../shared/types';
import { CURRENT_VIEW } from '../../shared/providers';

@Component({
  selector: 'nxe-view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class ViewSwitcherComponent {

  public readonly avialableView = AvialableView;

  constructor(@Inject(CURRENT_VIEW) private currentView: BehaviorSubject<AvialableView>) {
  }

  setView(view: AvialableView) {
    this.currentView.next(view);
  }

}
