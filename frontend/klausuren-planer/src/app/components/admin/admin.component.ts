import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup; // Form for CSV import
  pendingUsers: any[] = [ // Example pending users data
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' }
  ];

  constructor(private fb: FormBuilder) { 
    this.adminForm = this.fb.group({

    })
  }

  ngOnInit(): void {
   
  }

  // Function to handle CSV file submission
  onSubmitCSV() {
    const formData = new FormData();
    formData.append('csvFile', this.adminForm.get('csvFile')?.value);
    
    // Send the formData to your backend for CSV file processing
    // You can use Angular's HttpClient for this
    // Example: this.http.post('your-api-url', formData).subscribe(response => { ... });
  }

  // Function to approve a pending user
  approveUser(user: any) {
    // Implement your logic to approve the user, e.g., update their status in the backend
    // Once approved, you can remove the user from the pendingUsers array
    const index = this.pendingUsers.indexOf(user);
    if (index !== -1) {
      this.pendingUsers.splice(index, 1);
    }
  }
}
