import '../main.css';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import imageCardTpl from '../templates/image-card.hbs';
import ImageServiceApi from './apiService';
import { searchForm, gallery, loadMoreBtn } from './refs';
import * as basicLightbox from 'basiclightbox';
const KEY = '22995461-dcfca2d4906f7ecb85a6d619d';

const imageSearchApi = new ImageServiceApi(KEY);

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const observer = new IntersectionObserver(onLoadMoreClick, options);

searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);
gallery.addEventListener('click', handleOpenModal);

async function onSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const value = e.target.elements.query.value.trim();
  if (value === '') {
    return;
  }

  imageSearchApi.resetPage();

  imageSearchApi.searchQuery = value;
  const data = await imageSearchApi.fetchData();
  renderImages(data);
}

function renderImages(data) {
  gallery.insertAdjacentHTML('beforeend', imageCardTpl(data));
}

async function onLoadMoreClick(e) {
  observer.observe(loadMoreBtn);
  imageSearchApi.incrementPage();
  const data = await imageSearchApi.fetchData();
  renderImages(data);
  gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function handleOpenModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
`);
  instance.show();
}
