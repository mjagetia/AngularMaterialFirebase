import { Component } from '@angular/core';

@Component({
  selector: 'app-date-pipe',
  template: `
        {{today | date:'MMM d, y'}}
        <!--<p>A alternative, {{today | date:'medium'}}</p>-->
`,
})
export class DatePipeComponent {
  public today: number = Date.now();
}
