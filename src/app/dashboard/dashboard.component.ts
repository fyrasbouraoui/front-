import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; 
import Chart from 'chart.js/auto';
import { DemandeServiceService } from '../services/demande-service.service';
import { ApiService } from '../services/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class dashboardComponent implements OnInit {
  userName: string = '';
  profileName: string = '';
  totalUsers: number = 0;
  totalDemandes: number = 0;
  totalAPIs: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private demandeService: DemandeServiceService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.loadChartData();
    this.setupSidebarMenu();
  }

  getUserDetails() {
    const userInfo = this.userService.getUserInfo();
    if (userInfo) {
      this.userName = userInfo.prenom;
      this.profileName = userInfo.profileName;
    }
  }

  logout() {
    this.userService.logout().subscribe(
      () => {
        this.router.navigate(['/connect']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }

  loadChartData(): void {
    forkJoin([
      this.apiService.getAllApis(),
      this.demandeService.getAllDemandes(),
      this.userService.getAllUsers()
    ]).subscribe(
      ([apis, demandes, users]) => {
        this.totalAPIs = apis.length;
        this.totalDemandes = demandes.length;
        this.totalUsers = users.length;
        this.updateChart();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  updateChart(): void {
    const maxDataValue = Math.max(this.totalUsers, this.totalDemandes, this.totalAPIs);
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Utilisateur', 'Demandes', 'APIs'],
        datasets: [{
          label: '',
          data: [this.totalUsers, this.totalDemandes, this.totalAPIs],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: maxDataValue > 10 ? maxDataValue + 10 : 10 

          }
        }
      }
    });
  }

  setupSidebarMenu(): void {
    const arrow = document.querySelectorAll('.arrow');
    arrow.forEach(arrowItem => {
      arrowItem.addEventListener('click', (e) => {
        const arrowParent = (e.target as HTMLElement).parentElement?.parentElement;
        if (arrowParent) {
          arrowParent.classList.toggle('showMenu');
        }
      });
    });

    const sidebar = document.querySelector('.sidebar');
    const sidebarBtn = document.querySelector('.bx-menu') as HTMLElement;

    if (sidebar) {
      sidebar.classList.remove('close');
    }

    if (sidebarBtn && sidebar) {
      sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('close');
      });
    }
  }
  getValidationLink(profileName: string): string {
    if (profileName === '1er validateur') {
      return 'validation1';
    } else if (profileName === '2eme validateur') {
      return 'validation2';
    } else {
      // Return a default link or handle other cases as needed
      return '#';
    }
  }
}
