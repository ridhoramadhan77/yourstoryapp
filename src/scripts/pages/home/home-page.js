import {
  generateReportsListEmptyTemplate,
  generateReportsListErrorTemplate,
  generateLoaderAbsoluteTemplate,
  generateReportItemTemplate,
} from '../../templates';
import HomePresenter from "./home-presenter";
import Map from "../../utils/map";
import * as YourStoryAPI from '../../data/api'

export default class HomePage {
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
    // Do your job here
    this.#presenter = new HomePresenter({
      view: this,
      model: YourStoryAPI,
    });

    await this.#presenter.initialGalleryAndMap();
  }

  populateReportsList(message, reports) {
    if (reports.length <= 0) {
      this.populateReportsListEmpty();
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

  populateReportsListEmpty() {
    document.getElementById('story-list').innerHTML = generateReportsListEmptyTemplate();
  }

  populateReportsListError(message) {
    document.getElementById('story-list').innerHTML = generateReportsListErrorTemplate(message);
  }

  showLoading() {
    document.getElementById('story-list-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('story-list-loading-container').innerHTML = '';
  }

  async initialMap() {
    // TODO: map initialization
    this.#map = await Map.build('#map', {
      zoom: 10,
      locate: true,
    });
  }
}
