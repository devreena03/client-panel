import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { SettingsService } from 'src/app/services/settings.service';

import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd!: boolean;

  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingService: SettingsService
  ) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingService.getSettings().disableBalanceOnAdd;
  }

  onSubmit(){
    console.log(this.form.value);
    
    if(this.disableBalanceOnAdd) {
      this.form.value.balance = 0;
    }

    if(!this.form.valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.clientService.newClient(this.form.value);
      this.flashMessage.show('Client created successfully', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
  }
}

}
