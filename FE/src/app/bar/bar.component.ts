import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'core/Order/Order';
import { MatDrawer } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Team } from 'core/Team/Team';
import { Items } from 'core/Order/Item';
import { OrderService } from 'core/Order/OrderService';
import { SocketService } from 'core/CoppaChiosco/SocketService';

export interface Item {
  type: string;
  price: number;
  count: number;
  itemType: string;
}

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})

export class BarComponent implements OnInit {
  constructor(private http: HttpClient, private orderService: OrderService, private socketService: SocketService) { }
  orderedPanini = new Map();
  orderedExtras = new Map();
  orderedDrinks = new Map();
  coppaChioscoPoints = 0;
  ioConnection: any;
  totalPrice = 0;
  selectTeam = false;
  loading = false;
  teams = ['TeamA', 'TeamB', 'TeamC'];
  teamSelected: string;
  order = new Order();
  @ViewChild('sidenav', { static: false }) sidenav: MatDrawer;
  drinks: Item[] = [
    { type: 'H2o FRIZZANTE', price: 1, count: 0, itemType: 'Drink'},
    { type: 'H2o NATURALE', price: 1, count: 0, itemType: 'Drink' },
    { type: 'BIRRA BIONDA', price: 1, count: 0, itemType: 'Drink' },
    { type: 'BIRRA ROSSA', price: 1, count: 0, itemType: 'Drink' },
    { type: 'CAFFE', price: 1, count: 0, itemType: 'Drink' },
    { type: 'MOJITO', price: 1, count: 0, itemType: 'Drink' },
    { type: 'COCA COLA', price: 1, count: 0, itemType: 'Drink' },
    { type: 'THE LIMONE', price: 1, count: 0, itemType: 'Drink' },
    { type: 'THE PESCA', price: 1, count: 0, itemType: 'Drink' },
    { type: 'FANTA', price: 1, count: 0, itemType: 'Drink' }
  ];
  sandwichs: Item[] = [
    { type: 'BORIELLO', price: 3.5, count: 0, itemType: 'Sandwichs' },
    { type: 'MARADONA', price: 3.5, count: 0, itemType: 'Sandwichs' },
    { type: 'PELE', price: 3.5, count: 0, itemType: 'Sandwichs' },
    { type: 'VIERI', price: 3.5, count: 0, itemType: 'Sandwichs' },
  ];
  extras: Item[] = [
    { type: 'PATATINE', price: 2.5, count: 0, itemType: 'Extra' },
    { type: 'PIZZETTE', price: 2.5, count: 0, itemType: 'Extra'},
    { type: 'GELATI', price: 2, count: 0, itemType: 'Extra' }
  ];
  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();
  }

  checkOrder() {
    if (this.orderedPanini.size !== 0 || this.orderedExtras.size !== 0 || this.orderedDrinks.size !== 0) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
    this.checkCoppaChiosco();
  }

  // Drink
  addDrink(drink: Item): void {
    if (this.orderedDrinks.has(drink)) {
      this.orderedDrinks.set(drink, this.orderedDrinks.get(drink) + 1);
    } else {
      this.orderedDrinks.set(drink, 1);
    }
    this.updateOrder();
    this.checkOrder();
  }
  removeDrink(drink: Item): void {
    if (this.orderedDrinks.has(drink)) {
      if (this.orderedDrinks.get(drink) === 1) {
        this.orderedDrinks.delete(drink);
      } else {
        this.orderedDrinks.set(drink, this.orderedDrinks.get(drink) - 1);
      }
    }
    this.updateOrder();
    this.checkOrder();
  }

  // Panino
  addPanino(panino: Item): void {
    if (this.orderedPanini.has(panino)) {
      this.orderedPanini.set(panino, this.orderedPanini.get(panino) + 1);
    } else {
      this.orderedPanini.set(panino, 1);
    }
    this.updateOrder();
    this.checkOrder();
  }
  removePanino(panino: Item): void {
    if (this.orderedPanini.has(panino)) {
      if (this.orderedPanini.get(panino) === 1) {
        this.orderedPanini.delete(panino);
      } else {
        this.orderedPanini.set(panino, this.orderedPanini.get(panino) - 1);
      }
    }
    this.updateOrder();
    this.checkOrder();
  }

  // Extra
  addExtra(extra: Item): void {
    if (this.orderedExtras.has(extra)) {
      this.orderedExtras.set(extra, this.orderedExtras.get(extra) + 1);
    } else {
      this.orderedExtras.set(extra, 1);
    }
    this.updateOrder();
    this.checkOrder();
  }
  removeExtra(extra: Item): void {
    if (this.orderedExtras.has(extra)) {
      if (this.orderedExtras.get(extra) === 1) {
        this.orderedExtras.delete(extra);
      } else {
        this.orderedExtras.set(extra, this.orderedExtras.get(extra) - 1);
      }
    }
    this.updateOrder();
    this.checkOrder();
  }

  // check coppaChiosco
  checkCoppaChiosco() {
    let mojito = 0;
    let bionda = 0;
    let rossa = 0;
    this.orderedDrinks.forEach((value: number, key: Item) => {
      if (key.type === 'MOJITO') {
        mojito = value;
      }
      if (key.type === 'BIRRA BIONDA') {
        bionda = value;
      }
      if (key.type === 'BIRRA ROSSA') {
        rossa = value;
      }
    });
    this.coppaChioscoPoints = mojito + bionda + rossa;
    if (this.coppaChioscoPoints !== 0) {
      this.selectTeam = true;
    } else {
      this.selectTeam = false;
    }
  }

  clearOrder() {
    this.orderedDrinks.clear();
    this.orderedExtras.clear();
    this.orderedPanini.clear();
    this.order = new Order();
    this.totalPrice = 0;
    this.checkOrder();
  }

  updateOrder() {
    const itemsOrdered = new Array<Items>();
    if (this.orderedDrinks.size !== 0) {
      this.orderedDrinks.forEach((value: number, key: Item) => {
        const addItem = new Items();
        addItem.type = key.type;
        addItem.price = key.price;
        addItem.count = value;
        addItem.itemType = key.itemType;
        itemsOrdered.push(addItem);
      });
    }
    if (this.orderedExtras.size !== 0) {
      this.orderedExtras.forEach((value: number, key: Item) => {
        const addItem = new Items();
        addItem.type = key.type;
        addItem.price = key.price;
        addItem.count = value;
        addItem.itemType = key.itemType;
        itemsOrdered.push(addItem);
      });
    }
    if (this.orderedPanini.size !== 0) {
      this.orderedPanini.forEach((value: number, key: Item) => {
        const addItem = new Items();
        addItem.type = key.type;
        addItem.price = key.price;
        addItem.count = value;
        addItem.itemType = key.itemType;
        itemsOrdered.push(addItem);
      });
    }
    this.order.items = itemsOrdered;
    this.getTotal();
  }

  getTotal() {
    this.totalPrice = 0;
    this.order.items.forEach((item) => {
      this.totalPrice += item.price * item.count;
    });
  }

  saveOrder() {
    this.loading = true;
    this.orderService.create(this.order).subscribe(() => {
      // coppa chiosco
      if (this.teamSelected !== undefined ) {
        const teamPoints = new Team();
        teamPoints.teamName = this.teamSelected;
        teamPoints.points = this.coppaChioscoPoints;
        this.orderService.coppaChiosco(teamPoints).subscribe(() => {
          this.loading = false;
          this.teamSelected = undefined;
          this.socketService.updatePoints();
          this.clearOrder();
        });
      } else {
        this.loading = false;
        this.clearOrder();
      }
    });
  }
}
