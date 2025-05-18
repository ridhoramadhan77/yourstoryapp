import { reportMapper } from '../../data/api-mapper';
 
export default class BookmarkPresenter {
  #view;
  #model;
 
  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }
 
  async initialGalleryAndMap() {
    this.#view.showReportsListLoading();
 
    try {
      const listOfReports = await this.#model.getAllReports();
      const reports = await Promise.all(listOfReports.map(reportMapper));
 
      const message = 'Berhasil mendapatkan daftar cerita tersimpan.';
      this.#view.populateBookmarkedReports(message, reports);
    } catch (error) {
      console.error('initialGalleryAndMap: error:', error);
      this.#view.populateBookmarkedReportsError(error.message);
    } finally {
      this.#view.hideReportsListLoading();
    }
  }
}