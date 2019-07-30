import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable()
export class SocketService {
  private url = environment.baseUrl;
  private socket;

  constructor() {}

  public initSocket(): void {
    this.socket = io(this.url);
}
  public updatePoints() {
    this.socket.emit('update-points');
  }

  public forceUpdate = () => {
    return Observable.create((observer) => {
      this.socket.on('update-points', () => {
        observer.next();
      });
    });
  }
}
