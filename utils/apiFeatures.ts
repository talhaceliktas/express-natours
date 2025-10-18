import type { Query, Document } from "mongoose";

export default class APIFeatures<T extends Document> {
  query: Query<T[], T>;
  queryString: Record<string, any>;

  constructor(query: Query<T[], T>, queryString: Record<string, any>) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((element) => delete queryObj[element]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy =
        typeof this.queryString.sort === "string"
          ? this.queryString.sort.split(",").join(" ")
          : "";
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields =
        typeof this.queryString.fields === "string"
          ? this.queryString.fields.split(",").join(" ")
          : "";
      this.query.select(fields);
    } else {
      this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    let page = 0;
    let limit = 0;

    if (this.queryString?.page) {
      page = +this.queryString.page;
    }
    if (this.queryString?.limit) {
      limit = +this.queryString.limit;
    }

    const skip = page && limit ? limit * (page - 1) : 0;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
