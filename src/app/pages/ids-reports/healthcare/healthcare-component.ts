import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonDataService } from '../../../core/services/json-data.service';
import { HealthcareReport } from '../../../core/models/report.model';

@Component({
  selector: 'app-healthcare',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './healthcare-component.html',
  styleUrls: ['./healthcare-component.scss']
})
export class HealthcareComponent implements OnInit {
  reportData: HealthcareReport | null = null;
  loading = false;
  error: string | null = null;

  constructor(private jsonDataService: JsonDataService) { }

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData(): void {
    this.loading = true;
    this.error = null;

    this.jsonDataService.loadData<HealthcareReport>('data/reports/healthcare.json')
      .subscribe({
        next: (data) => {
          this.reportData = data;
          this.loading = false;
          console.log('Healthcare report loaded:', data);
        },
        error: (err) => {
          this.error = 'Không thể tải dữ liệu báo cáo';
          this.loading = false;
          console.error('Error loading healthcare report:', err);
        }
      });
  }

  reloadData(): void {
    // Clear cache và load lại data
    this.jsonDataService.clearCacheForFile('data/reports/healthcare.json');
    this.loadReportData();
  }
}
