class OfferData {
    price: number;
    size: number;

    constructor(price: number, size: number) {
        this.price = price;
        this.size = size;
    }
}

class OrderBook {
    lastUpdateId: number;
    bids:Array <OfferData>;
    asks: Array<OfferData>;

    constructor(lastUpdateId: number, bids: Array<OfferData>, asks: Array<OfferData>) {
        this.lastUpdateId = lastUpdateId;
        this.bids = bids;
        this.asks = asks;
    }
}

export { OfferData, OrderBook};