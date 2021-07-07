class OfferData {
    price: number;
    size: number;

    constructor(price: number, size: number) {
        this.price = price;
        this.size = size;
    }
}

class OrderBook {
    bids:Array <OfferData>;
    asks: Array<OfferData>;

    constructor(bids: Array<OfferData>, asks: Array<OfferData>) {
        this.bids = bids;
        this.asks = asks;
    }
}

export { OfferData, OrderBook};