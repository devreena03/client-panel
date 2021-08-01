import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id!: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit!: boolean;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private settingService: SettingsService
  ) { }

  ngOnInit(): void {
    // Get id from url
    this.disableBalanceOnEdit = this.settingService.getSettings().disableBalanceOnEdit;
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null) {
        this.client = client;
      }
    });
 }

 onSubmit() {
  console.log(this.form.value);
  if(!this.form.valid) {
    this.flashMessage.show('Please fill out the form correctly', {
      cssClass: 'alert-danger', timeout: 4000
    });
  } else {
    // Add id to client
    this.form.value.id = this.id;
    // Update client
    this.clientService.updateClient(this.form.value);
    this.flashMessage.show('Client updated', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(['/client/'+this.id]);
  }
}


}
