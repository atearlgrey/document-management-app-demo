import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicServiceCenter } from '@/core/models/public-service-center.model';
import { JsonDataService } from '@/core/services/json-data.service';
import { UIChart } from 'primeng/chart';

@Component({
    selector: 'app-public-service-center',
    standalone: true,
    imports: [CommonModule, UIChart],
    templateUrl: './public-service-center-component.html',
    styleUrls: ['./public-service-center-component.scss']
})
export class PublicServiceCenterComponent implements OnInit {
    publicServiceData: PublicServiceCenter | null = null;
    barOptions: any;
    doughnutOptions: any;

    constructor(private jsonDataService: JsonDataService) {
    }

    ngOnInit(): void {
        this.initData();
    }

    initData(): void {
        this.jsonDataService.loadData<PublicServiceCenter>('data/public-service-center/public-service-center.json')
            .subscribe({
                next: (data) => {
                    this.publicServiceData = data;
                },
                error: (err) => {
                }
            });


        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
        this.barOptions = {
            responsive: true,              // 🔴 bắt buộc
            maintainAspectRatio: true,    // 🔴 cho phép scale theo container
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    },
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        this.doughnutOptions = {
            responsive: true,              // 🔴 bắt buộc
            maintainAspectRatio: true,    // 🔴 cho phép scale theo container
            cutout: '50%',
            plugins: {
                legend: {
                    position: 'right', // 👉 hiển thị bên phải
                    labels: {
                        color: textColor,
                        usePointStyle: true,   // 👉 dùng chấm thay vì ô vuông
                        pointStyle: 'circle',  // 👉 chấm tròn
                        padding: 20            // 👉 giãn khoảng cách cho đẹp
                    }
                }
            }
        };
    }
}
