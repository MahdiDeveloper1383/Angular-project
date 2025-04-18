import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { SidebarComponent } from '../../Shared/sidebar/sidebar.component';
import { FooterComponent } from '../../Shared/footer/footer.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,NavbarComponent,SidebarComponent,FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    console.log('Sidebar collapsed:', this.isSidebarCollapsed);
  }
}
