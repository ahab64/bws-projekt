import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { catchError, lastValueFrom } from 'rxjs';
import { PendingUser } from 'src/app/models/pendingUser.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  @Input() adminData: any;

  pendingUser: PendingUser[] = [];
  hasPendingUser: boolean = true;
  failedApprovals: {
    failed: boolean;
    user: PendingUser;
  }[] = [];
  selectedPendingUser: PendingUser[] = [];
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.adminForm = this.fb.group({
      selectedPendingUser: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadPendingUser();
  }

  async loadPendingUser() {
    this.pendingUser = await this.adminService.getPendingUser();
    this.hasPendingUser = this.pendingUser.length !== 0
   
  }
  onChangeUserliste(event: any, user: PendingUser) {
    console.log(this.selectedPendingUser);
    if (event.target.checked) {
      // Add the course to the user's selected courses
      this.selectedPendingUser.push(user);
    } else {
      // Remove the course from the user's selected courses
      const index = this.selectedPendingUser.findIndex(
        (selected: PendingUser) => selected === user
      );
      if (index !== -1) {
        this.selectedPendingUser.splice(index, 1);
      }
    }
  }

  async onApprove() {
    for (const user of this.selectedPendingUser) {
      try {
        console.log(user.user_id);
        await lastValueFrom(this.adminService.approveUser(user.user_id));
      } catch (error) {
        console.log(error);
        this.failedApprovals.push({
          failed: true,
          user: user,
        });
      }
    }
    this.loadPendingUser();
  }

  onBlock() {}
}
