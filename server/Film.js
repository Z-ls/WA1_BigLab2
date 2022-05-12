const dayjs = require('dayjs');

function Film(id, title, isFavorite = false, watchDate, rating, user) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite;
    this.watchDate = watchDate ? dayjs(watchDate).format('YYYY-MM-DD') : watchDate;
    this.rating = rating; 
    this.user = user; 
}

module.exports = { Film }