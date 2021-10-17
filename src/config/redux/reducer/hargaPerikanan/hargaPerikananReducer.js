import products from "../../action";
const globalState = {
  data: [],
};

const hargaPerikananReducer = (state = globalState, { type, payload }) => {
  const { producType } = products;
  switch (type) {
    case producType.FETCH_HARGAPERIKANAN_REQUEST:
      return {
        ...state,
        type,
        loading: true,
      };
    case producType.FETCH_HARGAPERIKANAN_SUCCESS:
      return {
        ...state,
        type,
        data: payload,
        loading: false,
      };
    case producType.FETCH_HARGAPERIKANAN_FAIL:
      return {
        ...state,
        type,
        loading: true,
      };

    case producType.POST_HARGAPERIKANAN_REQUEST:
      return {
        ...state,
        type,
        loading: true,
      };
    case producType.POST_HARGAPERIKANAN_SUCCESS:
      return {
        ...state,
        type,
        data: payload,
        loading: false,
      };
    case producType.POST_HARGAPERIKANAN_FAIL:
      return {
        ...state,
        type,
        loading: true,
      };

    case producType.PUT_HARGAPERIKANAN_REQUEST:
      return {
        ...state,
        type,
        loading: true,
      };
    case producType.PUT_HARGAPERIKANAN_SUCCESS:
      return {
        ...state,
        type,
        data: payload,
        loading: false,
      };
    case producType.PUT_HARGAPERIKANAN_FAIL:
      return {
        ...state,
        type,
        loading: true,
      };

    case producType.DELETE_HARGAPERIKANAN_REQUEST:
      return {
        ...state,
        type,
        loading: true,
      };
    case producType.DELETE_HARGAPERIKANAN_SUCCESS:
      return {
        ...state,
        type,
        data: payload,
        loading: false,
      };
    case producType.DELETE_HARGAPERIKANAN_FAIL:
      return {
        ...state,
        type,
        loading: true,
      };
    default:
      return state;
  }
};

export default hargaPerikananReducer;
