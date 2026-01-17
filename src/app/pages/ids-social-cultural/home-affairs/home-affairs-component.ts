import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIChart } from 'primeng/chart';
import { HomeAffairs } from '@/core/models/home-affairs.model';
import { JsonDataService } from '@/core/services/json-data.service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

@Component({
    selector: 'app-home-affairs',
    standalone: true,
    imports: [CommonModule, UIChart],
    templateUrl: './home-affairs-component.html',
    styleUrls: ['./home-affairs-component.scss']
})
export class HomeAffairsComponent implements OnInit {
    homeAffairsData: HomeAffairs | null = null;
    pieOptions: any;

    constructor(private jsonDataService: JsonDataService) {
    }

    ngOnInit(): void {
        this.initData();
    }

    initData(): void {
        this.jsonDataService.loadData<HomeAffairs>('data/social-cultural/home-affairs.json')
            .subscribe({
                next: (data) => {
                    this.homeAffairsData = data;
                },
                error: (err) => {
                }
            });

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        this.pieOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right', // 👉 hiển thị bên phải
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                },
                datalabels: {
                    display: true,
                    color: '#fff',
                    // anchor: 'end',   // neo vào point
                    // align: 'top',    // hiện phía trên
                    offset: 4,
                    font: {
                        weight: 'bold',
                        size: 13
                    },
                    formatter: (value: any) => `${value}%`
                }
            }
        }
    }
}
