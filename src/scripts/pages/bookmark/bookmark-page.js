import {
  generateLoaderAbsoluteTemplate,
  generateReportItemTemplate,
  generateReportsListEmptyTemplate,
  generateReportsListErrorTemplate,
} from '../../templates';
import BookmarkPresenter from './bookmark-presenter';
import Database from '../../data/database';
import Map from '../../utils/map';
 
export default class BookmarkPage {
    #presenter = null;
    #map = null;

  async render() {
    return `
      <section class="container">
        <h1 class="section-title">Daftar Cerita</h1>

        <div class="story-list__container">
          <div id="story-list"></div>
          <div id="story-list-loading-container"></div>
        </div>
      </section>
    `;
  }
 
  async afterRender() {
    // TODO: initial presenter
    this.#presenter = new BookmarkPresenter({
      view: this,
      model: Database,
    });
    await this.#presenter.initialGalleryAndMap();
  }
 
  populateBookmarkedReports(message, reports) {
    if (reports.length <= 0) {
      this.populateBookmarkedReportsListEmpty();
      return;
    }
 
    const html = reports.reduce((accumulator, report) => {
        if (this.#map) {
        const coordinate = [report.lat, report.lon];
        const markerOptions = { alt: report.name };
        const popupOptions = { content: report.description };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }


      return accumulator.concat(
        generateReportItemTemplate({
          ...report,
          reporterName: report.name,
        }),
      );
    }, '');
    

    document.getElementById('story-list').innerHTML = `
      <div class="story-list">${html}</div>
    `;
  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 10,
      locate: true,
    });
  }
  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }
  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }
 
  populateBookmarkedReportsListEmpty() {
    document.getElementById('story-list').innerHTML = generateReportsListEmptyTemplate();
  }
 
  populateBookmarkedReportsError(message) {
    document.getElementById('story-list').innerHTML = generateReportsListErrorTemplate(message);
  }
 
  showReportsListLoading() {
    document.getElementById('story-list-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }
 
  hideReportsListLoading() {
    document.getElementById('story-list-loading-container').innerHTML = '';
  }
}