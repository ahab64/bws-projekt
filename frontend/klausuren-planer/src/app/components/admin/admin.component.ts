//Autor: Merlin Burbach
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { catchError, lastValueFrom } from 'rxjs';
import { PendingUser } from 'src/app/models/pendingUser.model';
import { AdminService } from 'src/app/services/admin.service';

//Enthält die Admin Komponente
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  @Output() isOpen = new EventEmitter<boolean>();

  isChildeOpen: boolean = true;
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
        await lastValueFrom(this.adminService.approveUser(user.user_id));
      } catch (error) {
        this.failedApprovals.push({
          failed: true,
          user: user,
        });
      }
    }
    this.loadPendingUser();
  }

  onAbbruch(){
    this.isOpen.emit(false);
    this.isChildeOpen = false;
  }
  onBlock() {}
}
