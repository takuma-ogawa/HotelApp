// Object.freezeを使用しないと外部で値を書き換えることが出来る
// Object.freezeはネストしたオブジェクトまで見ないので、Objectの中でObjectを宣言する場合、宣言するObjectにもObject.freezeをつける
export default Object.freeze({
    KEY_CODES: Object.freeze({
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
    }),
    PRODUCT_CODE_HOSHIGAKI: 0,
    PRODUCT_CODE_AMPO: 1,
    VARIETIES_CODE_SANJA: 1,
    VARIETIES_CODE_HIRATANENASHI: 2,
    SOCKET_SERVER_ADRESS_LOCAL: '192.168.111.23:8080',
    SOCKET_SERVER_ADRESS_DEVELOPMENT: '104.41.175.3:8080',
    SOCKET_SERVER_ADRESS_PRODUCTION: '',
});