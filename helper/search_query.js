const { Op } = require('sequelize');

exports.searchQuery = (searchData) => {
  return {
    [Op.iLike]: '%' + searchData + '%',
  };
};
