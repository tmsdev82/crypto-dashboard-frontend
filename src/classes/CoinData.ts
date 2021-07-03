class CoinData {
    coin_pair: string;
    data_type: string;
    exchange_name: string;
    data_set: any;
    constructor(coin_pair: string, data_type: string, exchange_name: string, data_set: any) {
        this.coin_pair = coin_pair;
        this.data_type = data_type;
        this.exchange_name = exchange_name;
        this.data_set = data_set;

    }
}

export default CoinData