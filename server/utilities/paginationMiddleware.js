/**
 * A middleware function that will retun a paginated find all search.
 * @param {Object} model - The Mongoose model object to be queried.
 */
function paginatedResults(model) {
  return async (req, res, next) => {
    if (req.query.page <= 0 || req.query.limit <= 0) {
      return res
        .status(400)
        .json('Page and limit query parameters must be non-zero and positive.');
    }

    // Query parameters defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // Assumes page pattern will be 1..n
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results = {};

    await model
      .countDocuments({})
      .then(count => {
        if (endIndex < count) {
          results.next = page + 1;
        }

        results.limit = limit;

        results.total = {
          items: count,
          pages: Math.ceil(count / limit)
        };

        if (count > 0) {
          if (startIndex > 0 && page <= results.total.pages) {
            results.previous = page - 1;
          } else if (page > results.total.pages) {
            results.previous = results.total.pages;
          }
        }
      })
      .catch(err => {
        return res.status(500).json(err);
      });

    await model
      .find()
      .limit(limit)
      .skip(startIndex)
      .then(data => {
        results.data = data;
        res.paginatedResults = results;
        next();
      })
      .catch(err => res.status(500).json(err));
  };
}

module.exports = paginatedResults;
