import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id!: string;
  client!: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }


  ngOnInit(): void {
     // Get id from url
     this.id = this.route.snapshot.params['id'];
     // Get client
     this.clientService.getClient(this.id).subscribe(client => {
       if(client != null) {
         if(client.balance! > 0) {
           this.hasBalance = true;
         }
         this.client = client;
       }

     });
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick(){
    console.log('delete');
    if(confirm("Are you sure?")){
      this.clientService.deleteClient(this.client);
      this.router.navigate(['/']);
    }    
  }

}
