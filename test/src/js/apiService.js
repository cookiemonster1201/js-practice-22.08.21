import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class ImageServiceApi {
  constructor(key) {
    this.query = '';
    this.page = '1';
    this.key = key;
  }

  async fetchData() {
    const url = `&q=${this.query}&page=${this.page}&per_page=12&key=${this.key}`;
    const {
      data: { hits },
    } = await axios.get(url);
    return hits;
    // return fetch(url)
    //   .then(response => response.json())
    //   .then(data => data.hits);
  }

  get searchQuery() {
    return this.query;
  }

  set searchQuery(newQuery) {
    this.query = newQuery;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
