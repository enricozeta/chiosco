import { Component, OnInit } from '@angular/core';
import { CoppaChioscoService } from 'core/CoppaChiosco/CoppaChioscoService';
import { SocketService } from 'core/CoppaChiosco/SocketService';

@Component({
  selector: 'app-coppa-chiosco',
  templateUrl: './coppa-chiosco.component.html',
  styleUrls: ['./coppa-chiosco.component.scss']
})
export class CoppaChioscoComponent implements OnInit {

  constructor(private coppaChioscoService: CoppaChioscoService, private socketService: SocketService) { }
  coppaChioscoResult = [];
  loading = false;
  ioConnection: any;
  displayedColumns: string[] = ['teamName', 'points'];

  ngOnInit() {
    this.getResult();
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.forceUpdate()
      .subscribe(() => {
       this.getResult();
      });
  }

  getResult() {
    this.loading = true;
    this.coppaChioscoService.getAll().subscribe((result) => {
      this.coppaChioscoResult = result;
      this.loading = false;
    });
  }
}
