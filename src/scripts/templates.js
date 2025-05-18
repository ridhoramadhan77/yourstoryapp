import { showFormattedDate } from "./utils";

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

export function generateMainNavigationListTemplate() {
    return `
      <li><a id="bookmark-button" class="bookmark-button" href="#/bookmark">Laporan Tersimpan</a></li>
      <li><a id="report-story-button" class="report-story-button" href="#/">Daftar Cerita</a></li>
    `;
}

export function generateUnauthenticatedNavigationListTemplate() {
    return `
      <li id="push-notification-tools" class="push-notification-tools"></li>
      <li><a id="login-button" href="#/login">Login</a></li>
      <li><a id="register-button" href="#/register">Register</a></li>
    `;
}
export function generateAuthenticatedNavigationListTemplate() {
    return `
      <li id="push-notification-tools" class="push-notification-tools"></li>
      <li><a id="new-story-button" class="btn new-story-button" href="#/new">Buat Laporan <i class="fas fa-plus"></i></a></li>
      <li><a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
    `;
}

export function generateReportsListEmptyTemplate() {
  return `
    <div id="story-list-empty" class="story-list__empty">
      <h2>Tidak ada cerita apapun :(</h2>
      <p>Saat ini, tidak ada cerita yang bisa kami tampilkan.</p>
    </div>
  `;
}

export function generateReportsListErrorTemplate(message) {
  return `
    <div id="story-list-error" class="story-list__error">
      <h2>Terjadi kesalahan pengambilan cerita-cerita</h2>
      <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
    </div>
  `;
}

export function generateReportItemTemplate({
  id,
  name,
  description,
  photoUrl,
  createdAt,
  lat,
  lon,
}) {
  return `
    <div tabindex="0" class="story-item" data-storyid="${id}">
      <img class="story-item__image" src="${photoUrl}" alt="${id}">
      <div class="story-item__body">
        <div class="story-item__main">
          <h2 id="story-title" class="story-item__title">${name}</h2>
          <div class="story-item__more-info">
            <div class="story-item__createdat">
              <i class="fas fa-calendar-alt"></i> ${showFormattedDate(createdAt, 'id-ID')}
            </div>
            <div class="story-item__location">
              <i class="fas fa-map"></i> ${lat}
              <i class="fas fa-map"></i> ${lon}
            </div>
          </div>
        </div>
        <div id="story-description" class="story-item__description">
          ${description}
        </div>
        <div class="story-item__more-info">
          <div class="story-item__author">
            Dibuat oleh: ${name}
          </div>
        </div>
        <a class="btn story-item__read-more" href="#/stories/${id}">
          Selengkapnya <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
}

export function generateReportDetailImageTemplate(imageUrl = null, alt = '') {
  if (!imageUrl) {
    return `
      <img class="report-detail__image" src="images/placeholder-image.jpg" alt="Placeholder Image">
    `;
  }

  return `
    <img class="report-detail__image" src="${imageUrl}" alt="${alt}">
  `;
}

export function generateReportDetailErrorTemplate(message) {
  return `
    <div id="reports-detail-error" class="reports-detail__error">
      <h2>Terjadi kesalahan pengambilan detail laporan</h2>
      <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
    </div>
  `;
}

export function generateReportDetailTemplate({
  id,
  name,
  description,
  photoUrl,
  createdAt,
  lat,
  lon,
}) {
  const createdAtFormatted = showFormattedDate(createdAt, 'id-ID');
  const imagesHtml = generateReportDetailImageTemplate(photoUrl, id)

  return `
    <div class="container">
      <div class="report-detail__images__container">
        <div id="images" class="report-detail__images">${imagesHtml}</div>
      </div>
    </div>

    <div class="container">
      <div class="report-detail__body">
        <div class="report-detail__body__description__container">
          <h1 id="title" class="report-detail__title">${name}</h1>
          <div id="description" class="report-detail__description__body">
            ${description}
          </div>
          <div id="location-latitude" class="report-detail__location__latitude" data-value="${lat}">Latitude:</div>
          <div id="location-longitude" class="report-detail__location__longitude" data-value="${lon}">Longitude:</div>
          <div id="createdat" class="report-detail__createdat" data-value="${createdAtFormatted}"><i class="fas fa-calendar-alt"></i></div>
        </div>
        <div class="report-detail__body__map__container">
          <h2 class="report-detail__map__title">Peta Lokasi</h2>
          <div class="report-detail__map__container">
            <div id="map" class="report-detail__map"></div>
            <div id="map-loading-container"></div>
          </div>
        </div>

        <hr>

        <div class="report-detail__body__actions__container">
          <h2>Aksi</h2>
          <div class="report-detail__actions__buttons">
            <div id="save-actions-container"></div>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function generateSubscribeButtonTemplate() {
  return `
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `;
}

export function generateSaveReportButtonTemplate() {
  return `
    <button id="report-detail-save" class="btn btn-transparent">
      Simpan laporan <i class="far fa-bookmark"></i>
    </button>
  `;
}

export function generateRemoveReportButtonTemplate() {
  return `
    <button id="report-detail-remove" class="btn btn-transparent">
      Buang laporan <i class="fas fa-bookmark"></i>
    </button>
  `;
}