class OfferData {
  price: number;
  size: number;

  constructor(price: number, size: number) {
    this.price = price;
    this.size = size;
  }
}

class TrianglePairData {
  pair: String;
  asks: Array<OfferData>;

  constructor(pair: String, asks: Array<OfferData>) {
    this.pair = pair;
    this.asks = asks;
  }
}

class TriangleData {
  triangle: String;
  start_pair: TrianglePairData;
  mid_pair: TrianglePairData;
  end_pair: TrianglePairData;
  profits: Array<number>;

  constructor(
    triangle: String,
    start_pair: TrianglePairData,
    mid_pair: TrianglePairData,
    end_pair: TrianglePairData,
    profits: Array<number>
  ) {
    this.triangle = triangle;
    this.start_pair = start_pair;
    this.mid_pair = mid_pair;
    this.end_pair = end_pair;
    this.profits = profits;
  }
}

class TriangleSetsData {
  data_type: String;
  exchange_name: String;
  triangle_sets: Array<TriangleData>;

  constructor(
    data_type: String,
    exchange_name: String,
    triangle_sets: Array<TriangleData>
  ) {
    this.data_type = data_type;
    this.exchange_name = exchange_name;
    this.triangle_sets = triangle_sets;
  }
}

export { OfferData, TriangleSetsData, TriangleData, TrianglePairData };
