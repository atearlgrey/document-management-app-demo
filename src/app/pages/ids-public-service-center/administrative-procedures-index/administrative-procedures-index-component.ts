import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativeProceduresIndex } from '@/core/models/administrative-procedures-index.model';
import { JsonDataService } from '@/core/services/json-data.service';
import { UIChart } from 'primeng/chart';

@Component({
    selector: 'app-administrative-procedures-index',
    standalone: true,
    imports: [CommonModule, UIChart],
    templateUrl: './administrative-procedures-index-component.html',
    styleUrls: ['./administrative-procedures-index-component.scss']
})
export class AdministrativeProceduresIndexComponent implements OnInit {
    administrativeProceduresIndex: AdministrativeProceduresIndex | null = null;
    doughnutOptions: any;
    lineOptions: any;

    ngOnInit(): void {
        this.initData();
    }

    constructor(private jsonDataService: JsonDataService) {
    }

    initData(): void {
        this.jsonDataService.loadData<AdministrativeProceduresIndex>('data/public-service-center/administrative-procedures-index.json')
            .subscribe({
                next: (data) => {
                    this.administrativeProceduresIndex = data;
                    // this.administrativeProceduresIndex.administrativeProcedure.chart.datasets[0].borderColor = "#9b59b6";
                },
                error: (err) => {
                }
            });


        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
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
                },
                datalabels: {
                    display: false
                }
            }
        };

        this.lineOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    },
                    display: false
                },
                datalabels: {
                    display: false
                }
            }
        };
    }
}
