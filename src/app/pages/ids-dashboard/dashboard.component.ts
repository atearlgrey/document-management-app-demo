import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { JsonDataService } from '../../core/services/json-data.service';
import * as L from 'leaflet';

interface DashboardData {
  facilities: any;
  business: any;
  education: any;
  adminProcedures: any;
  map: {
    center: { lat: number; lng: number };
    zoom: number;
    markers: { position: { lat: number; lng: number }; title: string; label: string }[];
  };
}

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardOverviewComponent implements OnInit, AfterViewInit {

  data: DashboardData | null = null;
  loading = true;

  pieOptions: any;
  barOptions: any;
  lineOptions: any;

  private map!: L.Map;
  private geoLayer?: L.GeoJSON;

  constructor(private jsonDataService: JsonDataService) { }

  ngOnInit() {
    this.initChartOptions();
    this.loadData();
  }

  ngAfterViewInit(): void { }

  // ================= CHART OPTIONS =================
  initChartOptions() {
    const style = getComputedStyle(document.documentElement);
    const textColor = style.getPropertyValue('--text-color');
    const textColorSecondary = style.getPropertyValue('--text-color-secondary');
    const surfaceBorder = style.getPropertyValue('--surface-border');

    this.pieOptions = {
      plugins: { legend: { labels: { usePointStyle: true, color: textColor } } }
    };

    this.barOptions = {
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder } },
        y: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder } }
      }
    };

    this.lineOptions = {
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder } },
        y: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder } }
      }
    };
  }

  // ================= LOAD DATA =================
  loadData() {
    this.jsonDataService
      .loadData<DashboardData>('data/dashboard/dashboard-overview.json')
      .subscribe({
        next: res => {
          this.data = res;
          this.loading = false;
          setTimeout(() => this.initMap(), 100);
        },
        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  // ================= MAP INIT =================
  private initMap() {
    if (!this.data?.map) return;

    if (this.map) this.map.remove();

    const { center, zoom, markers } = this.data.map;

    this.map = L.map('map', {
      center: [center.lat, center.lng],
      zoom,
      minZoom: 6
    });

    // Base map (giữ sáng)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Load toàn quốc + highlight Hà Nội
    this.loadVietnamAndHighlightHanoi('data/geo-map/geo3.json');

    // Markers
    markers?.forEach(m => {
      L.marker([m.position.lat, m.position.lng])
        .bindPopup(m.title)
        .addTo(this.map);
    });
  }

  // ================= LOAD VN + HANOI =================
  private loadVietnamAndHighlightHanoi(url: string) {
    fetch(url)
      .then(res => res.json())
      .then(geojson => {
        if (this.geoLayer) {
          this.map.removeLayer(this.geoLayer);
        }

        const xaOld = ['ĐồngTiến', 'DânTiến', 'ViệtHòa', 'HồngTiến'];
        this.filterCommunesAsync(geojson, 'HưngYên', xaOld)
          .then(communes => {

            console.log(communes);

            if (!communes.length) {
              console.warn('Không tìm thấy xã cần gộp');
              return;
            }

            // 1️⃣ Fill từng xã (KHÔNG border)
            this.geoLayer = L.geoJSON(communes, {
              style: {
                stroke: false,
                fillColor: '#d32f2f',
                fillOpacity: 0.45
              },
              onEachFeature: (_, layer) => {
                layer.on('click', () => {
                  layer.bindPopup(`<b>Việt Tiến</b>`).openPopup();
                });
              }
            }).addTo(this.map);
            this.map.fitBounds(this.geoLayer.getBounds());
          });
      });
  }

  private filterCommunesAsync(
    geojson: any,
    province: string,
    xaOld: string[]
  ): Promise<any[]> {

    return new Promise((resolve) => {
      const result = geojson.features.filter(
        (f: any) =>
          f.properties?.NAME_1 === province &&
          xaOld.includes(f.properties?.NAME_3)
      );

      resolve(result);
    });
  }
}
