import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';

import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients!: Client[];
  totalOwed!: number;
  lodding:Boolean = true;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {  
      console.log(clients); 
      this.clients = clients; 
      this.lodding = false;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance!.toString());
    }, 0);
  }

}
