import {Component, NgZone} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'ng-zone-demo',
  template: `
    <h2>Demo: NgZone</h2>

    <p>Progress: {{progress}}%</p>
    <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
    <p *ngIf="progress >= 100">Elapsed time: {{timeDiff}} seconds</p>

    <button (click)="processWithinAngularZone()">Process within Angular zone</button>
    <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
  `,
})
export class NgZoneDemo {
  progress: number = 0;
  label: string;
  startTime: Date;
  endTime: Date;
  timeDiff: number;

  constructor(private _ngZone: NgZone) {}

  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this.start();
    this._increaseProgress(() => {
      this.end();
      console.log('Inside Done!');
    });
  }

  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this.start();
    this._ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
        // reenter the Angular zone and display done
        this.end();
        this._ngZone.run(() => {           
          console.log('Outside Done!'); });
      });
    });
  }

  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);

    if (this.progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallback), 10);
    } else {
      doneCallback();
    }
  }
  
  start() {
    this.startTime = new Date();
  };

  end() {
    this.endTime = new Date();
    this.timeDiff = this.endTime.valueOf() - this.startTime.valueOf();
    this.timeDiff = this.timeDiff / 1000.0;

    // get seconds 
    var seconds = Math.round(this.timeDiff);
    console.log(seconds + " seconds");
  }  
}