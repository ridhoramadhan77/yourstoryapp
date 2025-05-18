import {
    generateLoaderAbsoluteTemplate,
    generateReportDetailErrorTemplate,
    generateReportDetailTemplate,
    generateSaveReportButtonTemplate,
    generateRemoveReportButtonTemplate
} from '../../templates';
import { parseActivePathname } from '../../routes/url-parser';
import ReportDetailPresenter from './story-detail-presenter';
import Map from "../../utils/map";
import * as YourStoryAPI from "../../data/api";
import Database from '../../data/database';

export default class StoryDetailPage {
    #presenter = null;
    #map = null;

    async render(){
        return `
            <section>
                <div class="report-detail__container">
                    <div id="report-detail" class="report-detail"></div>
                    <div id="report-detail-loading-container"></div>
                </div>
            </section>
        `;
    }

    async afterRender() {
        this.#presenter = new ReportDetailPresenter(parseActivePathname().id, {
          view: this,
          apiModel: YourStoryAPI,
          dbModel: Database,
        });
    
        this.#presenter.showReportDetail();
    }

    async populateReportDetailAndInitialMap(message, report) {
        document.getElementById('report-detail').innerHTML = generateReportDetailTemplate({
            id: report.id,
            description: report.description,
            photoUrl: report.photoUrl,
            lat: report.lat,
            lon: report.lon,
            name: report.name,
            createdAt: report.createdAt,
        });
        
        await this.initialMap();

    
        // Map
        await this.#presenter.showReportDetailMap();
        if (this.#map) {
          const reportCoordinate = [report.lat, report.lon];
          const markerOptions = { alt: report.name };
          const popupOptions = { content: report.description };
          this.#map.changeCamera(reportCoordinate);
          this.#map.addMarker(reportCoordinate, markerOptions, popupOptions);
        }
        this.#presenter.showSaveButton();
        // this.addNotifyMeEventListener();
    }

    populateReportDetailError(message) {
        document.getElementById('report-detail').innerHTML = generateReportDetailErrorTemplate(message);
    }

    async initialMap() {
        // TODO: map initialization
        if (this.#map) {
            return;
        }

        this.#map = await Map.build('#map', {
          zoom: 15,
        });
    }

    renderSaveButton() {
        document.getElementById('save-actions-container').innerHTML = generateSaveReportButtonTemplate();
        
        document.getElementById('report-detail-save').addEventListener('click', async () => {
            // alert('Fitur simpan laporan akan segera hadir!');
            await this.#presenter.saveReport();
            await this.#presenter.showSaveButton();
        });
    }

    saveToBookmarkSuccessfully(message) {
        console.log(message);
    }

    saveToBookmarkFailed(message) {
        alert(message);
    }
 
    renderRemoveButton() {
        document.getElementById('save-actions-container').innerHTML = generateRemoveReportButtonTemplate();
 
        document.getElementById('report-detail-remove').addEventListener('click', async () => {
        // alert('Fitur simpan laporan akan segera hadir!');
            await this.#presenter.removeReport();
            await this.#presenter.showSaveButton();
        });
    }

    removeFromBookmarkSuccessfully(message) {
        console.log(message);
    }
    removeFromBookmarkFailed(message) {
        alert(message);
    }

    showReportDetailLoading() {
        document.getElementById('report-detail-loading-container').innerHTML =
          generateLoaderAbsoluteTemplate();
    }
    
    hideReportDetailLoading() {
        document.getElementById('report-detail-loading-container').innerHTML = '';
    }
    
    showMapLoading() {
        document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
    }
    
    hideMapLoading() {
        document.getElementById('map-loading-container').innerHTML = '';
    }

    addNotifyMeEventListener() {
        document.getElementById('report-detail-notify-me').addEventListener('click', () => {
        this.#presenter.notifyMe();
        });
    }
}